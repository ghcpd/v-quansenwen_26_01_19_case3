import { useState } from 'react';
import { Plus, ListMusic } from 'lucide-react';
import { PlaylistCard, CreatePlaylistModal, ConfirmModal, EmptyState } from '../components';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { Playlist } from '../types';

export function PlaylistsPage() {
  const { playlists, createPlaylist, renamePlaylist, deletePlaylist } = usePlaylists();
  const { playerState, pause } = usePlayer();
  const { showToast } = useToast();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(null);

  const handleCreatePlaylist = (name: string) => {
    createPlaylist(name);
    showToast(`Playlist "${name}" created`, 'success');
  };

  const handleRenamePlaylist = (name: string) => {
    if (editingPlaylist) {
      renamePlaylist(editingPlaylist.id, name);
      showToast(`Playlist renamed to "${name}"`, 'success');
      setEditingPlaylist(null);
    }
  };

  const handleDeletePlaylist = () => {
    if (deletingPlaylist) {
      // Stop playback if we're deleting the currently playing playlist
      if (playerState.currentPlaylistId === deletingPlaylist.id) {
        pause();
      }
      
      deletePlaylist(deletingPlaylist.id);
      showToast(`Playlist "${deletingPlaylist.name}" deleted`, 'success');
      setDeletingPlaylist(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ListMusic className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-white">Playlists</h1>
          </div>
          <p className="text-surface-400">
            {playlists.length === 0
              ? 'Create your first playlist'
              : `${playlists.length} playlist${playlists.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 
                     text-white font-medium rounded-lg transition-colors"
          aria-label="Create new playlist"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Playlist</span>
        </button>
      </div>

      {/* Playlist Grid */}
      {playlists.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map(playlist => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onRename={() => setEditingPlaylist(playlist)}
              onDelete={() => setDeletingPlaylist(playlist)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<ListMusic className="w-full h-full" />}
          title="No playlists yet"
          description="Create a playlist to start organizing your favorite tracks."
          action={
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                         bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Playlist
            </button>
          }
        />
      )}

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePlaylist}
        mode="create"
      />

      {/* Rename Playlist Modal */}
      <CreatePlaylistModal
        isOpen={!!editingPlaylist}
        onClose={() => setEditingPlaylist(null)}
        onSubmit={handleRenamePlaylist}
        initialName={editingPlaylist?.name || ''}
        mode="rename"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingPlaylist}
        onClose={() => setDeletingPlaylist(null)}
        onConfirm={handleDeletePlaylist}
        title="Delete Playlist"
        message={`Are you sure you want to delete "${deletingPlaylist?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}
