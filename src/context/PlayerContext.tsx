import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Track } from '../data/musicData';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
  queue: Track[];
  queueIndex: number;
  likedSongs: Set<string>;
}

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  seekTo: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within PlayerProvider');
  return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(75);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'all' | 'one'>('off');
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(
    new Set(['1', '3', '5', '7', '9', '11', '13', '15', '17', '19'])
  );

  const intervalRef = useRef<number | null>(null);
  const queueRef = useRef(queue);
  const queueIndexRef = useRef(queueIndex);
  const shuffleRef = useRef(shuffle);
  const repeatRef = useRef(repeat);

  // Keep refs in sync with state
  useEffect(() => { queueRef.current = queue; }, [queue]);
  useEffect(() => { queueIndexRef.current = queueIndex; }, [queueIndex]);
  useEffect(() => { shuffleRef.current = shuffle; }, [shuffle]);
  useEffect(() => { repeatRef.current = repeat; }, [repeat]);

  const advanceTrack = useCallback(() => {
    const q = queueRef.current;
    if (q.length === 0) return;

    let nextIndex: number;
    if (shuffleRef.current) {
      // Avoid playing the same track in shuffle mode
      if (q.length === 1) {
        nextIndex = 0;
      } else {
        do {
          nextIndex = Math.floor(Math.random() * q.length);
        } while (nextIndex === queueIndexRef.current);
      }
    } else {
      nextIndex = queueIndexRef.current + 1;
      if (nextIndex >= q.length) {
        if (repeatRef.current === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setQueueIndex(nextIndex);
    setCurrentTrack(q[nextIndex]);
    setProgress(0);
  }, []);

  // Timer effect - ticks every second when playing
  useEffect(() => {
    if (isPlaying && currentTrack) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= currentTrack.duration) {
            advanceTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentTrack, advanceTrack]);

  const playTrack = useCallback((track: Track, newQueue?: Track[]) => {
    const trackQueue = newQueue || (queueRef.current.length > 0 ? queueRef.current : [track]);
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
    setQueue(trackQueue);
    setQueueIndex(trackQueue.findIndex(t => t.id === track.id));
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack && queue.length > 0) {
      setCurrentTrack(queue[0]);
      setIsPlaying(true);
    } else if (currentTrack) {
      setIsPlaying(prev => !prev);
    }
  }, [currentTrack, queue]);

  const nextTrack = useCallback(() => {
    advanceTrack();
  }, [advanceTrack]);

  const prevTrack = useCallback(() => {
    // If more than 3 seconds in, restart current track
    if (progress > 3) {
      setProgress(0);
      return;
    }

    if (queue.length === 0) return;

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeat === 'all' ? queue.length - 1 : 0;
    }

    setQueueIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setProgress(0);
  }, [queue, queueIndex, progress, repeat]);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(100, vol)));
  }, []);

  const seekTo = useCallback((time: number) => {
    setProgress(time);
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  const toggleLike = useCallback((trackId: string) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  }, []);

  const isLiked = useCallback((trackId: string) => {
    return likedSongs.has(trackId);
  }, [likedSongs]);

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration: currentTrack?.duration || 0,
    shuffle,
    repeat,
    queue,
    queueIndex,
    likedSongs,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
