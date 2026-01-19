import React, { useState } from 'react';
import { usePlaylist } from '../context/PlaylistContext';
import { useMusicLibrary } from '../context/MusicLibraryContext';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { PlaylistCard } from '../components/PlaylistCard';
import { Modal } from '../components/Modal';

export const PlaylistsPage: React.FC = () => {
  const { playlists, createPlaylist, deletePlaylist, renamePlaylist, getPlaylistTracks } =
    usePlaylist();
  const { tracks } = useMusicLibrary();
  const { currentPlaylistId, stopPlayback } = usePlayer();
  const { showToast } = useToast();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState('');

  const handleCreate = () => {
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim());
      showToast('Playlist created', 'success');
      setPlaylistName('');
      setShowCreateModal(false);
    }
  };

  const handleRename = () => {
    if (selectedPlaylistId && playlistName.trim()) {
      renamePlaylist(selectedPlaylistId, playlistName.trim());
      showToast('Playlist renamed', 'success');
      setPlaylistName('');
      setShowRenameModal(false);
      setSelectedPlaylistId(null);
    }
  };

  const handleDelete = () => {
    if (selectedPlaylistId) {
      if (currentPlaylistId === selectedPlaylistId) {
        stopPlayback();
      }
      deletePlaylist(selectedPlaylistId);
      showToast('Playlist deleted', 'success');
      setShowDeleteModal(false);
      setSelectedPlaylistId(null);
    }
  };

  const openRenameModal = (playlistId: string, currentName: string) => {
    setSelectedPlaylistId(playlistId);
    setPlaylistName(currentName);
    setShowRenameModal(true);
  };

  const openDeleteModal = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setShowDeleteModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Playlists
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
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
            No playlists yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new playlist
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((playlist) => {
            const playlistTracks = getPlaylistTracks(playlist.id, tracks);
            return (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                tracks={playlistTracks}
                onDelete={() => openDeleteModal(playlist.id)}
                onRename={() => openRenameModal(playlist.id, playlist.name)}
              />
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setPlaylistName('');
        }}
        title="Create New Playlist"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Playlist name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowCreateModal(false);
                setPlaylistName('');
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!playlistName.trim()}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showRenameModal}
        onClose={() => {
          setShowRenameModal(false);
          setPlaylistName('');
          setSelectedPlaylistId(null);
        }}
        title="Rename Playlist"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleRename()}
            placeholder="Playlist name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowRenameModal(false);
                setPlaylistName('');
                setSelectedPlaylistId(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRename}
              disabled={!playlistName.trim()}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Rename
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPlaylistId(null);
        }}
        title="Delete Playlist"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this playlist? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedPlaylistId(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
