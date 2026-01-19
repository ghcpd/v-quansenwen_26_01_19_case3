import { FormEvent, useMemo, useState } from 'react';
import PlaylistCard from '../components/PlaylistCard';
import ToastStack from '../components/ToastStack';
import EmptyState from '../components/EmptyState';
import { usePlaylists } from '../context/PlaylistContext';
import { trackMap } from '../data/tracks';
import { useToast } from '../hooks/useToast';
import styles from './PlaylistsPage.module.css';

const PlaylistsPage = () => {
  const { playlists, createPlaylist, renamePlaylist, deletePlaylist } = usePlaylists();
  const { toasts, showToast } = useToast();
  const [name, setName] = useState('');

  const totals = useMemo(() => {
    const map = new Map<string, number>();
    playlists.forEach((pl) => {
      const duration = pl.trackIds.reduce((sum, id) => sum + (trackMap[id]?.durationSec ?? 0), 0);
      map.set(pl.id, duration);
    });
    return map;
  }, [playlists]);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const result = createPlaylist(name);
    if (result.ok) {
      showToast('Playlist created', 'success');
      setName('');
    } else {
      showToast(result.error ?? 'Unable to create', 'warning');
    }
  };

  const handleRename = (id: string) => {
    const current = playlists.find((p) => p.id === id);
    const nextName = window.prompt('Rename playlist', current?.name ?? '');
    if (nextName === null) return;
    const result = renamePlaylist(id, nextName);
    if (result.ok) {
      showToast('Playlist renamed', 'success');
    } else {
      showToast(result.error ?? 'Invalid name', 'warning');
    }
  };

  const handleDelete = (id: string) => {
    const playlist = playlists.find((p) => p.id === id);
    if (!playlist) return;
    const confirmed = window.confirm(`Delete playlist "${playlist.name}"?`);
    if (!confirmed) return;
    deletePlaylist(id);
    showToast('Playlist deleted', 'info');
  };

  return (
    <div className={styles.wrapper}>
      <ToastStack toasts={toasts} />
      <div className={styles.header}>
        <div>
          <h1>Your Playlists</h1>
          <p className="muted">Create, rename, and manage your collections.</p>
        </div>
        <form className={styles.form} onSubmit={handleCreate}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Playlist name"
            aria-label="Playlist name"
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>

      {playlists.length === 0 ? (
        <EmptyState title="No playlists yet" description="Create your first playlist to start collecting tracks." />
      ) : (
        <div className={styles.list}>
          {playlists.map((pl) => (
            <PlaylistCard
              key={pl.id}
              playlist={pl}
              totalDuration={totals.get(pl.id) ?? 0}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
