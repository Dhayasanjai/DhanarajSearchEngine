import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useStateContext } from "../contexts/StateContextProvider";
import { Links } from "./Links";

export const Search = () => {
  const { setSearchTerm } = useStateContext();
  const [text, setText] = useState("");
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

 let { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
      setText(transcript)
  }, [transcript]);

  const handleStartListening = () => {
    setText("");
    SpeechRecognition.startListening();
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        value={text || transcript}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="Search something or type URL"
        onChange={(e) =>{
          resetTranscript()
         setText(e.target.value)}
        }
      />
      {text !== "" && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500 "
          onClick={() =>{
            resetTranscript()
           setText("")}}
        >
          x
        </button>
      )}
      <div>
        <button onClick={handleStartListening} style={{padding:'10px'}}> {listening ? "Listening...": "🎙️Start Voice Search"}</button>
      </div>
      <Links />
    </div>
  );
};
