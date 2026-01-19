import { Track } from '../types';
import { formatDuration } from '../utils/duration';
import styles from './PlaylistTrackRow.module.css';

interface Props {
  track: Track;
  onPlay: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PlaylistTrackRow = ({ track, onPlay, onRemove, onMoveDown, onMoveUp, isFirst, isLast }: Props) => {
  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <img src={track.coverImageUrl} alt="Album cover" className={styles.cover} />
        <div>
          <div className={styles.title}>{track.title}</div>
          <div className={styles.subtitle}>{track.artist} · {track.album}</div>
        </div>
      </div>
      <div className={styles.meta}>{formatDuration(track.durationSec)}</div>
      <div className={styles.actions}>
        <button onClick={onPlay} aria-label="Play track">Play</button>
        <button onClick={onMoveUp} disabled={isFirst} aria-label="Move track up">↑</button>
        <button onClick={onMoveDown} disabled={isLast} aria-label="Move track down">↓</button>
        <button className={styles.remove} onClick={onRemove} aria-label="Remove track">Remove</button>
      </div>
    </div>
  );
};

export default PlaylistTrackRow;
