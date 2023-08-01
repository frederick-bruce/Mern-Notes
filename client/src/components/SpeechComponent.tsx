import React from "react";
import { Button } from "react-bootstrap";
import useSpeechRecognition from "../hooks/useSpeechToText";

export const SpeechComponent: React.FC<{
  onTranscription: (transcription: string) => void;
}> = ({ onTranscription }) => {
  const transcript = useSpeechRecognition();

  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const currentTranscript = event.results[0][0].transcript;
    onTranscription(currentTranscript);
  };

  const handleButtonClick = () => {
    recognition.start();
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>Transcribe Speech</Button>
      <p>Transcribed text: {transcript}</p> {/* Display the transcribed text */}
    </div>
  );
};
