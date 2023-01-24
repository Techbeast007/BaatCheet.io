import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";
import axios from"axios"

function Mains() {
  const [loading,setLoading] = useState(false)
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState([]);
  const [input, setInput] = useState("");
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const selectOption = (option) => {
    setOption(option);
  };
  const [save,setSave] = useState([])
 

  const doStuff = async () => {
    setSave((prev)=>[
      ...prev,
      input
    ])
 
    setLoading(true)
    console.log("its working")
    let object = { ...option, prompt: input };
   await axios.post('http://localhost:5000/api/generate-text', {
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
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result} loading={loading}/>
      )}
    </div>
  );
}

export default Mains;
