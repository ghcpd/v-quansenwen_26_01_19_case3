import React, { useState } from 'react';
import { useMusicLibrary } from '../context/MusicLibraryContext';
import { usePlaylist } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { TrackCard } from '../components/TrackCard';
import { SearchBar } from '../components/SearchBar';
import { Modal } from '../components/Modal';
import { SortOption } from '../types';

export const LibraryPage: React.FC = () => {
  const {
    filteredTracks,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    genres,
  } = useMusicLibrary();

  const { playlists, addTrackToPlaylist } = usePlaylist();
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const handleAddToPlaylist = (trackId: string) => {
    setSelectedTrackId(trackId);
    setShowAddModal(true);
  };

  const handlePlaylistSelect = (playlistId: string) => {
    if (selectedTrackId) {
      const success = addTrackToPlaylist(playlistId, selectedTrackId);
      if (success) {
        showToast('Track added to playlist', 'success');
      } else {
        showToast('Track already in playlist', 'error');
      }
      setShowAddModal(false);
      setSelectedTrackId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Music Library
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by title or artist..."
            />
          </div>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Filter by genre"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Sort by"
          >
            <option value="newest">Newest</option>
            <option value="duration">Duration</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {filteredTracks.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No tracks found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {filteredTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onPlay={() => playTrack(track, null)}
              onAddToPlaylist={() => handleAddToPlaylist(track.id)}
              isPlaying={currentTrack?.id === track.id && isPlaying}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add to Playlist"
      >
        {playlists.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              No playlists yet. Create one first!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistSelect(playlist.id)}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {playlist.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {playlist.trackIds.length} tracks
                </div>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
