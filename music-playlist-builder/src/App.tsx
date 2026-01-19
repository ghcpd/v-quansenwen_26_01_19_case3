import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlaylistProvider, PlayerProvider, ToastProvider } from './context';
import { Header, NowPlayingBar, ToastContainer } from './components';
import { LibraryPage, PlaylistsPage, PlaylistDetailPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <PlaylistProvider>
          <PlayerProvider>
            <div className="min-h-screen bg-surface-950 text-white pb-24">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<LibraryPage />} />
                  <Route path="/playlists" element={<PlaylistsPage />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
                </Routes>
              </main>
              <NowPlayingBar />
              <ToastContainer />
            </div>
          </PlayerProvider>
        </PlaylistProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
