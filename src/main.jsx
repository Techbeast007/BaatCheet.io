import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";
import { useState } from "react";

function Mains() {
  const [loading,setLoading] = useState(false)
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  // console.log(import.meta.env.VITE_Open_AI_Key);
  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    setLoading(true)
    console.log("its working")
    let object = { ...option, prompt: input,model: "text-davinci-003" };

    const response = await openai.createCompletion(object);
    console.log(response)

    setResult(response.data.choices[0].text);
    setLoading(false)
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
