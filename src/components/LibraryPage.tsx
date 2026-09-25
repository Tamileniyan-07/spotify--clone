import React, { useState, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { playlists, tracks } from '../data/musicData';
import { Heart, Music2, Grid3X3, List, Search, SortDesc } from 'lucide-react';

interface LibraryPageProps {
  onNavigate: (view: string, id?: string) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate }) => {
  const { likedSongs } = usePlayer();
  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'alpha'>('recent');

  const filteredPlaylists = useMemo(() => {
    let result = [...playlists];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sortBy === 'alpha') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [searchQuery, sortBy]);

  return (
    <div className="p-6 pb-8 animate-fade-in h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Your Library</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            className="text-spotify-light-gray hover:text-white p-2 rounded-full hover:bg-spotify-gray transition-all"
          >
            {viewMode === 'list' ? <Grid3X3 size={18} /> : <List size={18} />}
          </button>
          <button
            onClick={() => setSortBy(sortBy === 'recent' ? 'alpha' : 'recent')}
            className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-all ${
              sortBy !== 'recent' ? 'text-white bg-spotify-gray' : 'text-spotify-light-gray hover:text-white'
            }`}
          >
            <SortDesc size={16} />
            {sortBy === 'recent' ? 'Recent' : 'Alphabetical'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {(['all', 'playlists', 'artists'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? 'bg-white text-black'
                : 'bg-spotify-gray text-white hover:bg-spotify-hover'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-light-gray" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in Your Library"
          className="w-full pl-9 pr-4 py-2 bg-spotify-gray rounded-md text-sm text-white placeholder-spotify-light-gray focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'list' ? (
          <div className="space-y-1">
            {/* Liked Songs */}
            <button
              onClick={() => onNavigate('liked')}
              className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-spotify-hover transition-all group"
            >
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center flex-shrink-0">
                <Heart size={16} fill="white" className="text-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-white text-sm font-medium truncate">Liked Songs</p>
                <p className="text-spotify-light-gray text-xs">Playlist • {likedSongs.size} songs</p>
              </div>
            </button>

            {/* Playlists */}
            {filteredPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onNavigate('playlist', playlist.id)}
                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-spotify-hover transition-all group"
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="text-left min-w-0">
                  <p className="text-white text-sm font-medium truncate">{playlist.name}</p>
                  <p className="text-spotify-light-gray text-xs truncate">Playlist • {playlist.owner}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Liked Songs */}
            <div
              onClick={() => onNavigate('liked')}
              className="bg-spotify-dark hover:bg-spotify-hover p-4 rounded-lg cursor-pointer transition-all duration-300 group"
            >
              <div className="w-full aspect-square rounded-md bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center mb-3 shadow-lg">
                <Heart size={32} fill="white" className="text-white" />
              </div>
              <p className="text-white font-bold text-sm truncate">Liked Songs</p>
              <p className="text-spotify-light-gray text-xs">{likedSongs.size} songs</p>
            </div>

            {/* Playlists */}
            {filteredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => onNavigate('playlist', playlist.id)}
                className="bg-spotify-dark hover:bg-spotify-hover p-4 rounded-lg cursor-pointer transition-all duration-300 group"
              >
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md object-cover mb-3 shadow-lg"
                  loading="lazy"
                />
                <p className="text-white font-bold text-sm truncate">{playlist.name}</p>
                <p className="text-spotify-light-gray text-xs truncate">{playlist.owner}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
