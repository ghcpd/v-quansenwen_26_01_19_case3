import { useMemo, useState } from 'react';
import TrackCard from '../components/TrackCard';
import ToastStack from '../components/ToastStack';
import { useToast } from '../hooks/useToast';
import { tracks, genres } from '../data/tracks';
import { usePlaylists } from '../context/PlaylistContext';
import styles from './LibraryPage.module.css';

const LibraryPage = () => {
  const { playlists, addTrackToPlaylist } = usePlaylists();
  const { toasts, showToast } = useToast();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'duration' | 'title'>('newest');

  const filteredTracks = useMemo(() => {
    const term = search.toLowerCase();
    let result = tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(term) ||
        track.artist.toLowerCase().includes(term)
    );
    if (genre) {
      result = result.filter((track) => track.genre === genre);
    }
    const sorted = [...result];
    switch (sortBy) {
      case 'duration':
        sorted.sort((a, b) => a.durationSec - b.durationSec);
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        sorted.sort((a, b) => b.year - a.year);
    }
    return sorted;
  }, [search, genre, sortBy]);

  const handleAdd = (playlistId: string, trackId: string) => {
    const result = addTrackToPlaylist(playlistId, trackId);
    if (result.ok) {
      showToast('Added to playlist', 'success');
    } else {
      showToast(result.reason === 'Already in playlist' ? 'Already in playlist' : 'Unable to add', 'warning');
    }
  };

  return (
    <div className={styles.wrapper}>
      <ToastStack toasts={toasts} />
      <div className={styles.header}>
        <div>
          <h1>Music Library</h1>
          <p className="muted">Browse and add tracks to your playlists.</p>
        </div>
        <div className={styles.filters}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or artist"
            aria-label="Search"
          />
          <select value={genre} onChange={(e) => setGenre(e.target.value)} aria-label="Filter by genre">
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} aria-label="Sort">
            <option value="newest">Newest</option>
            <option value="duration">Duration</option>
            <option value="title">Title (A–Z)</option>
          </select>
        </div>
      </div>

      {filteredTracks.length === 0 ? (
        <div className={styles.empty}>No tracks match your search.</div>
      ) : (
        <div className={styles.grid}>
          {filteredTracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              playlists={playlists}
              onAdd={(playlistId) => handleAdd(playlistId, track.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
