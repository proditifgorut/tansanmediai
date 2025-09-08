import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, VolumeX } from 'lucide-react';
import { handleDownload } from '../../lib/utils';

interface CustomAudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  autoplay?: boolean;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src, title, artist, autoplay = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset state for new audio source
    setIsPlaying(false);
    setProgress(0);

    const setAudioData = () => {
        setDuration(audio.duration);
        if (autoplay) {
            audio.play();
            setIsPlaying(true);
        }
    };
    const setAudioTime = () => setProgress(audio.currentTime);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [src, autoplay]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setProgress(audioRef.current.currentTime);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
      <audio ref={audioRef} src={src} preload="metadata" muted={isMuted}></audio>
      <button onClick={togglePlayPause} className="p-3 bg-gradient-purple rounded-full text-white">
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
      <div className="flex-grow">
        <p className="text-white font-semibold truncate">{title}</p>
        <p className="text-gray-400 text-sm truncate">{artist}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <input
            type="range"
            value={progress}
            step="1"
            min="0"
            max={duration || 0}
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="text-gray-400 hover:text-white">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <button onClick={() => handleDownload(src, `${title}.mp3`)} className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20">
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CustomAudioPlayer;
