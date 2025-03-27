import React, { useRef, useState } from "react";
import beast from '../audio/Beast Mode.mp3'
const AudioPlayer = () => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const updateProgress = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100);
  };
  const changeProgress = (e) => {
    const newTime = (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };
  const changeVolume = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };
  return (
    <div className="flex flex-col items-center bg-rose-600 text-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">React Audio Player</h2>

 
      <audio ref={audioRef} onTimeUpdate={updateProgress}>
        <source src={beast} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlayPause}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full"
        >
          {isPlaying ? "pause" : "play"}
        </button>

        <input
          type="range"
          value={volume}
          step="0.1"
          min="0"
          max="1"
          onChange={changeVolume}
          className="w-20"
        />
      </div>
      <div
        ref={progressRef}
        className="w-full bg-gray-600 h-2 rounded cursor-pointer"
        onClick={changeProgress}
      >
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function App() {
  return <AudioPlayer />;
}