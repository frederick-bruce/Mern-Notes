import { useState, useEffect } from "react";

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const startRecognition = () => {
    recognition?.start();
  };

  const stopRecognition = () => {
    recognition?.stop();
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.interimResults = true;

    newRecognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    setRecognition(newRecognition);

    return () => {
      newRecognition.stop();
    };
  }, []);

  return { transcript, startRecognition, stopRecognition };
};

export default useSpeechRecognition;
