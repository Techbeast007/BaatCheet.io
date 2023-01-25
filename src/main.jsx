import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";
import axios from"axios"
import { useEffect } from "react";

function Mains() {
  const [loading,setLoading] = useState(false)
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  const [back,setBack] = useState(false)
  // console.log(import.meta.env.VITE_Open_AI_Key);

  useEffect(()=>{
     axios.get('https://backendbaatcheet.onrender.com/api/getConvo')
    .then(function (response) {
      console.log(response.data.conversation)
      setSave(response.data.conversation);
    },[result])
    .catch(function (error) {
      console.log(error);
    });

  },[])
  const selectOption = (option) => {
    setOption(option);
  };
  const [save,setSave] = useState([])
 

  const doStuff = async () => {
 
    setLoading(true)
    console.log("its working")
    let object = { ...option, prompt: input };
   await axios.post('https://backendbaatcheet.onrender.com/api/generate-text', {
      prompt:input,
      model:option.model
      
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
