import React, { useMemo, useState, useCallback } from 'react';
import { usePlayer } from '../context/PlayerContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Maximize2,
  ListMusic,
  Mic2,
} from 'lucide-react';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Player: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    shuffle,
    repeat,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
  } = usePlayer();

  const [localProgress, setLocalProgress] = useState<number | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const displayProgress = isSeeking && localProgress !== null ? localProgress : progress;

  const progressPercent = useMemo(() => {
    if (duration === 0) return 0;
    return (displayProgress / duration) * 100;
  }, [displayProgress, duration]);

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLocalProgress(val);
    setIsSeeking(true);
  }, []);

  const handleProgressCommit = useCallback(() => {
    if (localProgress !== null) {
      seekTo(localProgress);
    }
    setIsSeeking(false);
    setLocalProgress(null);
  }, [localProgress, seekTo]);

  if (!currentTrack) {
    return (
      <div className="h-[72px] md:h-[90px] bg-gradient-to-b from-[#181818] to-[#000000] border-t border-white/5 flex items-center justify-center px-4">
        <p className="text-spotify-light-gray text-sm">Select a song to start playing</p>
      </div>
    );
  }

  return (
    <div className="h-[72px] md:h-[90px] bg-gradient-to-b from-[#181818]/95 to-[#000000]/95 border-t border-white/5 px-2 md:px-4 flex items-center justify-between gap-2 md:gap-4">
      {/* Left: Track Info */}
      <div className="flex items-center gap-2 md:gap-3 w-[30%] min-w-0">
        <img
          src={currentTrack.cover}
          alt={currentTrack.title}
          className="w-10 h-10 md:w-14 md:h-14 rounded object-cover shadow-lg flex-shrink-0"
        />
        <div className="min-w-0 hidden sm:block">
          <p className="text-white text-xs md:text-sm font-medium truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </p>
          <p className="text-spotify-light-gray text-[10px] md:text-xs truncate hover:underline cursor-pointer hover:text-white transition-colors">
            {currentTrack.artist}
          </p>
        </div>
        <button
          onClick={() => toggleLike(currentTrack.id)}
          className={`ml-1 flex-shrink-0 transition-all duration-200 hidden sm:block ${
            isLiked(currentTrack.id) ? 'text-spotify-green' : 'text-spotify-light-gray hover:text-white'
          }`}
        >
          <Heart size={14} fill={isLiked(currentTrack.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center max-w-[50%] md:max-w-[45%] flex-1">
        <div className="flex items-center gap-2 md:gap-4 mb-0.5 md:mb-1">
          <button
            onClick={toggleShuffle}
            className={`hidden md:block transition-all duration-200 hover:scale-110 ${
              shuffle ? 'text-spotify-green' : 'text-spotify-light-gray hover:text-white'
            }`}
          >
            <Shuffle size={16} />
          </button>
          <button
            onClick={prevTrack}
            className="text-spotify-light-gray hover:text-white transition-all duration-200 hover:scale-110"
          >
            <SkipBack size={16} className="md:hidden" fill="currentColor" />
            <SkipBack size={20} className="hidden md:block" fill="currentColor" />
          </button>
          <button
            onClick={togglePlay}
            className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 hover:bg-white/90"
          >
            {isPlaying ? (
              <Pause size={14} fill="black" className="text-black" />
            ) : (
              <Play size={14} fill="black" className="text-black ml-0.5" />
            )}
          </button>
          <button
            onClick={nextTrack}
            className="text-spotify-light-gray hover:text-white transition-all duration-200 hover:scale-110"
          >
            <SkipForward size={16} className="md:hidden" fill="currentColor" />
            <SkipForward size={20} className="hidden md:block" fill="currentColor" />
          </button>
          <button
            onClick={toggleRepeat}
            className={`hidden md:block transition-all duration-200 hover:scale-110 relative ${
              repeat !== 'off' ? 'text-spotify-green' : 'text-spotify-light-gray hover:text-white'
            }`}
          >
            {repeat === 'one' ? <Repeat1 size={16} /> : <Repeat size={16} />}
            {repeat !== 'off' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-spotify-green rounded-full" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 w-full">
          <span className="text-[10px] md:text-[11px] text-spotify-light-gray w-8 md:w-10 text-right tabular-nums">
            {formatTime(displayProgress)}
          </span>
          <div className="flex-1 group relative">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={displayProgress}
              onChange={handleProgressChange}
              onMouseUp={handleProgressCommit}
              onTouchEnd={handleProgressCommit}
              className="w-full h-3 cursor-pointer"
              style={{
                background: `linear-gradient(to right, #fff ${progressPercent}%, #4d4d4d ${progressPercent}%)`,
                borderRadius: '2px',
              }}
            />
          </div>
          <span className="text-[10px] md:text-[11px] text-spotify-light-gray w-8 md:w-10 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="hidden md:flex items-center gap-2 lg:gap-3 w-[30%] justify-end">
        <button className="text-spotify-light-gray hover:text-white transition-all duration-200">
          <Mic2 size={14} />
        </button>
        <button className="text-spotify-light-gray hover:text-white transition-all duration-200">
          <ListMusic size={16} />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVolume(volume === 0 ? 75 : 0)}
            className="text-spotify-light-gray hover:text-white transition-all duration-200"
          >
            <VolumeIcon size={16} />
          </button>
          <div className="w-20 lg:w-24 group">
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-3 cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${volume > 0 ? '#fff' : '#4d4d4d'} ${volume}%, #4d4d4d ${volume}%)`,
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
        <button className="text-spotify-light-gray hover:text-white transition-all duration-200">
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Mobile: Like button */}
      <button
        onClick={() => toggleLike(currentTrack.id)}
        className={`md:hidden flex-shrink-0 transition-all duration-200 ${
          isLiked(currentTrack.id) ? 'text-spotify-green' : 'text-spotify-light-gray hover:text-white'
        }`}
      >
        <Heart size={16} fill={isLiked(currentTrack.id) ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};

export default Player;
