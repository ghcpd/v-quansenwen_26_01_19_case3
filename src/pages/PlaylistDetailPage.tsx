import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PlaylistTrackRow from '../components/PlaylistTrackRow';
import ToastStack from '../components/ToastStack';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { trackMap } from '../data/tracks';
import { useToast } from '../hooks/useToast';
import { formatDuration } from '../utils/duration';
import styles from './PlaylistDetailPage.module.css';

const PlaylistDetailPage = () => {
  const { playlistId } = useParams();
  const { playlists, removeTrackFromPlaylist, moveTrack } = usePlaylists();
  const { playFromPlaylist } = usePlayer();
  const { toasts, showToast } = useToast();

  const playlist = useMemo(() => playlists.find((p) => p.id === playlistId), [playlists, playlistId]);

  const tracks = useMemo(() => {
    if (!playlist) return [];
    return playlist.trackIds.map((id) => trackMap[id]).filter(Boolean);
  }, [playlist]);

  const totalDuration = useMemo(
    () => tracks.reduce((sum, track) => sum + track.durationSec, 0),
    [tracks]
  );

  if (!playlist) {
    return (
      <div className={styles.wrapper}>
        <EmptyState
          title="Playlist not found"
          description="This playlist may have been deleted."
          action={<Link to="/playlists"><button>Back to playlists</button></Link>}
        />
      </div>
    );
  }

  const handleRemove = (trackId: string) => {
    removeTrackFromPlaylist(playlist.id, trackId);
    showToast('Removed from playlist', 'info');
  };

  const handlePlay = (trackId: string) => {
    playFromPlaylist(playlist.id, trackId);
  };

  return (
    <div className={styles.wrapper}>
      <ToastStack toasts={toasts} />
      <div className={styles.header}>
        <div>
          <p className={styles.badge}>Playlist</p>
          <h1>{playlist.name}</h1>
          <p className="muted">{tracks.length} track{tracks.length === 1 ? '' : 's'} · {formatDuration(totalDuration)}</p>
        </div>
        <Link to="/playlists" className={styles.back}>
          ← Back
        </Link>
      </div>

      {tracks.length === 0 ? (
        <EmptyState
          title="No tracks yet"
          description="Add songs from the Library page to fill this playlist."
          action={<Link to="/library"><button>Add from Library</button></Link>}
        />
      ) : (
        <div className={styles.list}>
          {tracks.map((track, idx) => (
            <PlaylistTrackRow
              key={track.id}
              track={track}
              onPlay={() => handlePlay(track.id)}
              onRemove={() => handleRemove(track.id)}
              onMoveUp={() => moveTrack(playlist.id, track.id, 'up')}
              onMoveDown={() => moveTrack(playlist.id, track.id, 'down')}
              isFirst={idx === 0}
              isLast={idx === tracks.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
