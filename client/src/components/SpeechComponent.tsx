import { useState } from "react";
const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>("");
  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const currentTranscript = event.results[0][0].transcript;
    setTranscript(currentTranscript);
  };

  const startRecognition = () => {
    recognition.start();
  };

  return { transcript, startRecognition };
};

export default useSpeechRecognition;
