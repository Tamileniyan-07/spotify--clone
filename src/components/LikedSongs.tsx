import React, { useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { tracks } from '../data/musicData';
import { Play, Pause, Heart, Clock } from 'lucide-react';

const LikedSongs: React.FC = () => {
  const { playTrack, togglePlay, isPlaying, currentTrack, toggleLike, isLiked, likedSongs } = usePlayer();

  const likedTracks = useMemo(() => {
    return tracks.filter(t => likedSongs.has(t.id));
  }, [likedSongs]);

  const handlePlayAll = () => {
    if (likedTracks.length > 0) {
      if (currentTrack && likedTracks.some(t => t.id === currentTrack.id)) {
        togglePlay();
      } else {
        playTrack(likedTracks[0], likedTracks);
      }
    }
  };

  const totalDuration = likedTracks.reduce((acc, t) => acc + t.duration, 0);
  const totalMins = Math.floor(totalDuration / 60);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-b from-indigo-800 via-indigo-900/50 to-transparent p-6 pb-8">
        <div className="flex items-end gap-6">
          <div className="w-48 h-48 rounded-md bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center shadow-2xl">
            <Heart size={64} fill="white" className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold uppercase tracking-wider mb-2">Playlist</p>
            <h1 className="text-white text-4xl md:text-6xl font-black mb-4">Liked Songs</h1>
            <div className="flex items-center gap-1 text-sm text-white/70">
              <span className="font-bold text-white">You</span>
              <span>•</span>
              <span>{likedTracks.length} songs,</span>
              <span className="text-white/50">about {totalMins} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center gap-6 bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 hover:bg-spotify-green-light transition-all shadow-xl"
        >
          {isPlaying && currentTrack && likedTracks.some(t => t.id === currentTrack.id) ? (
            <Pause size={24} fill="black" className="text-black" />
          ) : (
            <Play size={24} fill="black" className="text-black ml-1" />
          )}
        </button>
      </div>

      {/* Track List Header */}
      <div className="px-6">
        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(80px,1fr)] gap-4 px-4 py-2 border-b border-white/10 text-spotify-light-gray text-xs uppercase tracking-wider">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span></span>
          <span className="flex justify-end">
            <Clock size={14} />
          </span>
        </div>

        {/* Track List */}
        <div className="mt-2 pb-8">
          {likedTracks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-spotify-light-gray text-lg">Songs you like will appear here</p>
              <p className="text-spotify-light-gray text-sm mt-2">Save songs by tapping the heart icon</p>
            </div>
          ) : (
            likedTracks.map((track, index) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, likedTracks)}
                  className={`grid grid-cols-[16px_4fr_3fr_2fr_minmax(80px,1fr)] gap-4 px-4 py-2 rounded-md hover:bg-white/10 cursor-pointer transition-all duration-200 group items-center ${
                    isActive ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className={`text-sm group-hover:hidden tabular-nums ${isActive ? 'text-spotify-green' : 'text-spotify-light-gray'}`}>
                      {isActive && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-0.5 h-full bg-spotify-green animate-pulse rounded-full" />
                          <span className="w-0.5 h-2/3 bg-spotify-green animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
                          <span className="w-0.5 h-1/3 bg-spotify-green animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
                        </span>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <Play size={14} fill="white" className="text-white hidden group-hover:block" />
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${isActive ? 'text-spotify-green' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-spotify-light-gray text-xs truncate hover:text-white hover:underline">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <span className="text-spotify-light-gray text-sm truncate hover:text-white hover:underline hidden md:block">
                    {track.album}
                  </span>

                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track.id);
                      }}
                      className="text-spotify-green hover:text-spotify-green-light transition-all"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                  </div>

                  <span className="text-spotify-light-gray text-sm text-right tabular-nums">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
