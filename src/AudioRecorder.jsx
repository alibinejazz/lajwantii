import React, { useState, useRef } from "react";

const AudioRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordings((prevRecordings) => [...prevRecordings, { url: audioUrl }]);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const handleStopRecording = () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Audio Recorder</h1>
      <div>
        <button onClick={handleStartRecording} disabled={isRecording} style={{ marginRight: "10px" }}>
          Start Recording
        </button>
        <button onClick={handleStopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Messages</h2>
        {recordings.length === 0 ? (
          <p>No recordings yet.</p>
        ) : (
          recordings.map((recording, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p>Message {index + 1}</p>
              <audio controls>
                <source src={recording.url} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
