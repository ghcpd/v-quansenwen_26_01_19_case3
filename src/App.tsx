import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LibraryPage from './pages/LibraryPage';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistDetailPage from './pages/PlaylistDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { PlaylistProvider } from './context/PlaylistContext';
import { PlayerProvider } from './context/PlayerContext';

const App = () => {
  return (
    <BrowserRouter>
      <PlaylistProvider>
        <PlayerProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/library" replace />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/playlists" element={<PlaylistsPage />} />
              <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </PlayerProvider>
      </PlaylistProvider>
    </BrowserRouter>
  );
};

export default App;
