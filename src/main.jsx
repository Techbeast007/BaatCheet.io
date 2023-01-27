import "./App.css";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";
import axios from"axios"
import { useEffect } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey:process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Mains() {
  const [loading,setLoading] = useState(false)
  const [option, setOption] = useState({});
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [back,setBack] = useState(false)

  useEffect(()=>{
     axios.get('https://backendbaatcheet.onrender.com/api/getConvo')
    .then(function (response) {
      setSave(response.data.conversation);
    })
    .catch(function (error) {
      console.log(error);
    });

  },[result])
  const selectOption = (option) => {
    setOption(option);
  };
  const [save,setSave] = useState([])
 

  const doStuff = async () => {
    
 
    setLoading(true)
    console.log(option)
    const completion = await openai.createCompletion({
      model: option.model,
      prompt: input,
      ...option
    });
    const response = completion.data.choices[0].text
   await axios.post('https://backendbaatcheet.onrender.com/api/generate-text', {
      prompt:input,
      response :response
      
    })
    .then(function (response) {
      console.log(response.data.conversation)
      setResult(response.data.conversation);
    })
    .catch(function (error) {
      console.log(error);
    });



  
    setLoading(false)
    // setSave((prev)=>[
    //   ...prev,
    //   result
    // ])
  };


  return (
    <div>
      {Object.values(option).length === 0 || back ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} setBack={setBack}/>
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} loading={loading} save={save} setBack={setBack}/>
      )}
    </div>
  );
}

export default Mains;
