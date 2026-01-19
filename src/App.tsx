import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicLibraryProvider } from './context/MusicLibraryContext';
import { PlaylistProvider } from './context/PlaylistContext';
import { PlayerProvider } from './context/PlayerContext';
import { ToastProvider } from './context/ToastContext';
import { Navigation } from './components/Navigation';
import { NowPlayingBar } from './components/NowPlayingBar';
import { ToastContainer } from './components/ToastContainer';
import { LibraryPage } from './pages/LibraryPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { PlaylistDetailPage } from './pages/PlaylistDetailPage';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <MusicLibraryProvider>
          <PlaylistProvider>
            <PlayerProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
                <Navigation />
                <Routes>
                  <Route path="/" element={<LibraryPage />} />
                  <Route path="/playlists" element={<PlaylistsPage />} />
                  <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
                </Routes>
                <NowPlayingBar />
                <ToastContainer />
              </div>
            </PlayerProvider>
          </PlaylistProvider>
        </MusicLibraryProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
