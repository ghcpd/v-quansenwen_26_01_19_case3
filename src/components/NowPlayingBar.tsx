import { formatDuration } from '../utils/duration';
import { usePlayer } from '../context/PlayerContext';
import styles from './NowPlayingBar.module.css';

const NowPlayingBar = () => {
  const { state, currentTrack, currentPlaylist, togglePlay, previous, next, seek, stop } = usePlayer();

  if (!currentTrack) {
    return (
      <div className={styles.bar}>
        <div className={styles.empty}>Nothing playing. Start a track from a playlist.</div>
      </div>
    );
  }

  const progressRatio = Math.min(1, state.progressSec / currentTrack.durationSec);

  return (
    <div className={styles.bar}>
      <div className={styles.meta}>
        <img src={currentTrack.coverImageUrl} alt="Album cover" className={styles.cover} />
        <div>
          <div className={styles.title}>{currentTrack.title}</div>
          <div className={styles.subtitle}>
            {currentTrack.artist} · {currentPlaylist?.name ?? 'Playlist'}
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={previous} aria-label="Previous track">
          Prev
        </button>
        <button onClick={togglePlay} aria-label={state.isPlaying ? 'Pause' : 'Play'} className={styles.playBtn}>
          {state.isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={next} aria-label="Next track">
          Next
        </button>
        <button onClick={stop} aria-label="Stop playback">
          Stop
        </button>
      </div>
      <div className={styles.progress}>
        <span>{formatDuration(state.progressSec)}</span>
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(progressRatio * 1000)}
          onChange={(e) => seek(Number(e.target.value) / 1000)}
          aria-label="Seek"
        />
        <span>{formatDuration(currentTrack.durationSec)}</span>
      </div>
    </div>
  );
};

export default NowPlayingBar;
