import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { playlists } from '../data/musicData';
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, id?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { likedSongs } = usePlayer();

  return (
    <div className="flex flex-col h-full w-[300px] min-w-[280px] gap-2 p-2">
      {/* Main Navigation */}
      <div className="bg-spotify-dark rounded-lg p-4 space-y-4">
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-4 w-full px-2 py-2 rounded-md transition-all duration-200 group ${
            currentView === 'home' ? 'text-white' : 'text-spotify-light-gray hover:text-white'
          }`}
        >
          <Home size={24} className={currentView === 'home' ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
          <span className="font-bold text-base">Home</span>
        </button>
        <button
          onClick={() => onNavigate('search')}
          className={`flex items-center gap-4 w-full px-2 py-2 rounded-md transition-all duration-200 group ${
            currentView === 'search' ? 'text-white' : 'text-spotify-light-gray hover:text-white'
          }`}
        >
          <Search size={24} className={currentView === 'search' ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
          <span className="font-bold text-base">Search</span>
        </button>
      </div>

      {/* Library Section */}
      <div className="bg-spotify-dark rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('library')}
            className={`flex items-center gap-3 transition-all duration-200 ${
              currentView === 'library' ? 'text-white' : 'text-spotify-light-gray hover:text-white'
            }`}
          >
            <Library size={24} />
            <span className="font-bold text-base">Your Library</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="text-spotify-light-gray hover:text-white p-1 rounded-full hover:bg-spotify-gray transition-all duration-200">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Library Items */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
          {/* Liked Songs */}
          <button
            onClick={() => onNavigate('liked')}
            className={`flex items-center gap-3 w-full p-2 rounded-md transition-all duration-200 hover:bg-spotify-hover group ${
              currentView === 'liked' ? 'bg-spotify-hover' : ''
            }`}
          >
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-700 to-blue-300 flex items-center justify-center flex-shrink-0">
              <Heart size={16} fill="white" className="text-white" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-white text-sm font-medium truncate">Liked Songs</p>
              <p className="text-spotify-light-gray text-xs truncate">Playlist • {likedSongs.size} songs</p>
            </div>
          </button>

          {/* Playlists */}
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onNavigate('playlist', playlist.id)}
              className={`flex items-center gap-3 w-full p-2 rounded-md transition-all duration-200 hover:bg-spotify-hover group ${
                currentView === `playlist-${playlist.id}` ? 'bg-spotify-hover' : ''
              }`}
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
      </div>
    </div>
  );
};

export default Sidebar;
