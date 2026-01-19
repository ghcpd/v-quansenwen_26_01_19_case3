import { Link } from 'react-router-dom';
import { Playlist } from '../types';
import { formatDuration } from '../utils/duration';
import styles from './PlaylistCard.module.css';

interface Props {
  playlist: Playlist;
  totalDuration: number;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
}

const PlaylistCard = ({ playlist, totalDuration, onRename, onDelete }: Props) => {
  const trackCount = playlist.trackIds.length;

  return (
    <div className={`card ${styles.card}`}>
      <div>
        <Link to={`/playlists/${playlist.id}`} className={styles.title}>
          {playlist.name}
        </Link>
        <p className={styles.meta}>
          {trackCount} track{trackCount === 1 ? '' : 's'} · {formatDuration(totalDuration)}
        </p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onRename(playlist.id)} aria-label="Rename playlist">
          Rename
        </button>
        <button className={styles.delete} onClick={() => onDelete(playlist.id)} aria-label="Delete playlist">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
