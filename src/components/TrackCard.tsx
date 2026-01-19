import { useEffect, useState } from 'react';
import { Playlist, Track } from '../types';
import { formatDuration } from '../utils/duration';
import styles from './TrackCard.module.css';

interface Props {
  track: Track;
  playlists: Playlist[];
  onAdd: (playlistId: string) => void;
}

const TrackCard = ({ track, playlists, onAdd }: Props) => {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (playlists.length && !selected) {
      setSelected(playlists[0].id);
    }
  }, [playlists, selected]);

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <img src={track.coverImageUrl} alt={`Cover art for ${track.album}`} className={styles.cover} />
          <div>
            <div className={styles.title}>{track.title}</div>
            <div className={styles.subtitle}>{track.artist}</div>
            <div className={styles.tags}>
              <span className="tag">{track.genre}</span>
              <span className="tag">{track.year}</span>
              <span className="tag">{formatDuration(track.durationSec)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {playlists.length === 0 ? (
          <span className="muted">Create a playlist to start adding tracks.</span>
        ) : (
          <div className={styles.addRow}>
            <select value={selected} onChange={(e) => setSelected(e.target.value)} aria-label="Choose playlist">
              {playlists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>
            <button onClick={() => selected && onAdd(selected)} aria-label={`Add ${track.title} to playlist`}>
              Add to playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
