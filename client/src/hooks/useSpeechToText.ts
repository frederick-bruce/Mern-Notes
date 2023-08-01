import { useState, useEffect } from "react";

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState<string>("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return transcript;
};

export default useSpeechRecognition;
