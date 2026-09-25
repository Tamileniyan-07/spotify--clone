import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { playlists, recentlyPlayed, artists, Track } from '../data/musicData';
import { Play } from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string, id?: string) => void;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { playTrack } = usePlayer();

  const handlePlayPlaylist = (playlistTracks: Track[]) => {
    if (playlistTracks.length > 0) {
      playTrack(playlistTracks[0], playlistTracks);
    }
  };

  return (
    <div className="p-4 md:p-6 pb-8 animate-fade-in">
      {/* Greeting */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-5">{getGreeting()}</h1>

      {/* Recently Played Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-8">
        {recentlyPlayed.map((playlist, index) => (
          <button
            key={playlist.id}
            onClick={() => handlePlayPlaylist(playlist.tracks)}
            className="flex items-center bg-white/10 hover:bg-white/20 rounded-md overflow-hidden transition-all duration-300 group relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={playlist.cover}
              alt={playlist.name}
              className="w-12 h-12 md:w-14 md:h-14 object-cover shadow-md flex-shrink-0"
              loading="lazy"
            />
            <span className="text-white text-xs md:text-sm font-bold px-3 md:px-4 truncate flex-1 text-left">
              {playlist.name}
            </span>
            <div className="absolute right-2 md:right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                <Play size={14} fill="black" className="text-black ml-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Made For You Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">Made For You</h2>
          <button className="text-xs md:text-sm font-bold text-spotify-light-gray hover:text-white transition-colors uppercase tracking-wider">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {playlists.slice(0, 6).map((playlist, index) => (
            <div
              key={playlist.id}
              onClick={() => onNavigate('playlist', playlist.id)}
              className="bg-spotify-card hover:bg-spotify-hover p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 group relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative mb-3 md:mb-4">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md object-cover shadow-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(playlist.tracks);
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-spotify-green-light transition-all"
                  >
                    <Play size={18} fill="black" className="text-black ml-0.5" />
                  </button>
                </div>
              </div>
              <p className="text-white font-bold text-sm truncate mb-1">{playlist.name}</p>
              <p className="text-spotify-light-gray text-xs line-clamp-2 leading-relaxed">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">Popular Artists</h2>
          <button className="text-xs md:text-sm font-bold text-spotify-light-gray hover:text-white transition-colors uppercase tracking-wider">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className="bg-spotify-card hover:bg-spotify-hover p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative mb-3 md:mb-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-square rounded-full object-cover shadow-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                    <Play size={18} fill="black" className="text-black ml-0.5" />
                  </div>
                </div>
              </div>
              <p className="text-white font-bold text-sm truncate mb-1">{artist.name}</p>
              <p className="text-spotify-light-gray text-xs">Artist</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">Trending Now</h2>
          <button className="text-xs md:text-sm font-bold text-spotify-light-gray hover:text-white transition-colors uppercase tracking-wider">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {playlists.slice(2, 8).map((playlist, index) => (
            <div
              key={playlist.id}
              onClick={() => onNavigate('playlist', playlist.id)}
              className="bg-spotify-card hover:bg-spotify-hover p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 group relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative mb-3 md:mb-4">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md object-cover shadow-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(playlist.tracks);
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-spotify-green-light transition-all"
                  >
                    <Play size={18} fill="black" className="text-black ml-0.5" />
                  </button>
                </div>
              </div>
              <p className="text-white font-bold text-sm truncate mb-1">{playlist.name}</p>
              <p className="text-spotify-light-gray text-xs line-clamp-2 leading-relaxed">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jump Back In */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">Jump Back In</h2>
          <button className="text-xs md:text-sm font-bold text-spotify-light-gray hover:text-white transition-colors uppercase tracking-wider">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {playlists.slice(4, 8).concat(playlists.slice(0, 2)).map((playlist, index) => (
            <div
              key={`${playlist.id}-${index}`}
              onClick={() => onNavigate('playlist', playlist.id)}
              className="bg-spotify-card hover:bg-spotify-hover p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 group relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative mb-3 md:mb-4">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-md object-cover shadow-lg"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(playlist.tracks);
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-spotify-green-light transition-all"
                  >
                    <Play size={18} fill="black" className="text-black ml-0.5" />
                  </button>
                </div>
              </div>
              <p className="text-white font-bold text-sm truncate mb-1">{playlist.name}</p>
              <p className="text-spotify-light-gray text-xs line-clamp-2 leading-relaxed">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
