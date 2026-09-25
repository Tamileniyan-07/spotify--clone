import React, { useState, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { tracks, categories, Track } from '../data/musicData';
import { Search, Play, X } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { playTrack, currentTrack } = usePlayer();

  const filteredTracks = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q) ||
        track.album.toLowerCase().includes(q)
    );
  }, [query]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track, tracks);
  };

  return (
    <div className="p-6 pb-8 animate-fade-in">
      {/* Search Input */}
      <div className="relative max-w-md mb-8">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-black" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full pl-10 pr-10 py-3 bg-white rounded-full text-sm text-spotify-black placeholder-spotify-black/60 focus:outline-none focus:ring-2 focus:ring-white transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-spotify-black/60 hover:text-spotify-black"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Results */}
      {query.trim() ? (
        <div className="animate-slide-up">
          <h2 className="text-xl font-bold text-white mb-4">
            {filteredTracks.length > 0 ? `Results for "${query}"` : `No results for "${query}"`}
          </h2>
          {filteredTracks.length > 0 ? (
            <div className="space-y-1">
              {filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  className={`flex items-center gap-4 p-2 rounded-md hover:bg-white/10 cursor-pointer transition-all duration-200 group ${
                    currentTrack?.id === track.id ? 'bg-white/5' : ''
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="w-8 text-center">
                    <span className="text-spotify-light-gray text-sm group-hover:hidden tabular-nums">
                      {index + 1}
                    </span>
                    <Play
                      size={14}
                      fill="white"
                      className="text-white hidden group-hover:block mx-auto"
                    />
                  </div>
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${currentTrack?.id === track.id ? 'text-spotify-green' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-spotify-light-gray text-xs truncate">{track.artist}</p>
                  </div>
                  <p className="text-spotify-light-gray text-sm hidden sm:block">{track.album}</p>
                  <span className="text-spotify-light-gray text-sm tabular-nums">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-spotify-light-gray">Try searching for something else, or check your spelling.</p>
          )}
        </div>
      ) : (
        /* Browse Categories */
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="relative rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 aspect-[16/10]"
                style={{ backgroundColor: category.color, animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-white font-bold text-lg p-4 relative z-10">{category.name}</h3>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute bottom-0 right-0 w-[40%] h-[60%] object-cover rounded-sm transform rotate-25 translate-x-4 translate-y-2 shadow-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
