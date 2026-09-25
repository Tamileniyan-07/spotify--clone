import React, { useState, useCallback } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';
import PlaylistView from './components/PlaylistView';
import LikedSongs from './components/LikedSongs';
import { ChevronLeft, ChevronRight, User, Menu, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  const [history, setHistory] = useState<string[]>(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useCallback((view: string, id?: string) => {
    const newView = id ? `${view}-${id}` : view;
    if (id) {
      setSelectedPlaylistId(id);
    }
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newView);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentView(view);
    setSidebarOpen(false);
  }, [history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const prevView = history[newIndex];
      if (prevView.includes('-')) {
        const [view, id] = prevView.split('-');
        setCurrentView(view);
        setSelectedPlaylistId(id);
      } else {
        setCurrentView(prevView);
      }
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextView = history[newIndex];
      if (nextView.includes('-')) {
        const [view, id] = nextView.split('-');
        setCurrentView(view);
        setSelectedPlaylistId(id);
      } else {
        setCurrentView(nextView);
      }
    }
  }, [history, historyIndex]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'search':
        return <SearchPage />;
      case 'library':
        return <LibraryPage onNavigate={navigate} />;
      case 'playlist':
        return <PlaylistView playlistId={selectedPlaylistId} />;
      case 'liked':
        return <LikedSongs />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-spotify-black overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <Sidebar 
            currentView={currentView === 'playlist' ? `playlist-${selectedPlaylistId}` : currentView} 
            onNavigate={navigate} 
          />
        </div>

        {/* Sidebar - Mobile */}
        <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar 
            currentView={currentView === 'playlist' ? `playlist-${selectedPlaylistId}` : currentView} 
            onNavigate={navigate} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-spotify-black rounded-lg m-2 lg:ml-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-transparent sticky top-0 z-10">
            <div className="flex items-center gap-2">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center lg:hidden hover:bg-black/80 transition-all"
              >
                <Menu size={18} className="text-white" />
              </button>
              <button
                onClick={goBack}
                disabled={historyIndex <= 0}
                className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/80 transition-all"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/80 transition-all"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden sm:block bg-black/60 hover:bg-black/80 text-white text-sm font-bold px-4 py-2 rounded-full transition-all hover:scale-105">
                Explore Premium
              </button>
              <button className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all hover:scale-105">
                <User size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <Player />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
};

export default App;
