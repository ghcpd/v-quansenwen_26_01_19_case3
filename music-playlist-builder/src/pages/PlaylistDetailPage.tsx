import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Music, Shuffle } from 'lucide-react';
import { PlaylistTrackCard, EmptyState } from '../components';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { getTracksByIds } from '../data/mockTracks';
import { formatTotalDuration, pluralize } from '../utils';

export function PlaylistDetailPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const { getPlaylistById, removeTrackFromPlaylist, reorderTracks } = usePlaylists();
  const { playTrack, playerState } = usePlayer();
  const { showToast } = useToast();

  const playlist = playlistId ? getPlaylistById(playlistId) : undefined;

  if (!playlist) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<Music className="w-full h-full" />}
          title="Playlist not found"
          description="This playlist may have been deleted or doesn't exist."
          action={
            <Link
              to="/playlists"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                         bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Playlists
            </Link>
          }
        />
      </div>
    );
  }

  const tracks = getTracksByIds(playlist.trackIds);
  const totalDuration = tracks.reduce((sum, track) => sum + track.durationSec, 0);
  const isPlayingFromThisPlaylist = playerState.currentPlaylistId === playlist.id && playerState.isPlaying;

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0].id, playlist.id);
    }
  };

  const handleShuffle = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      playTrack(tracks[randomIndex].id, playlist.id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderTracks(playlist.id, index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < tracks.length - 1) {
      reorderTracks(playlist.id, index, index + 1);
    }
  };

  const handleRemoveTrack = (trackId: string, trackTitle: string) => {
    removeTrackFromPlaylist(playlist.id, trackId);
    showToast(`"${trackTitle}" removed from playlist`, 'success');
  };

  // Get cover image for header (first track's cover or placeholder)
  const headerCover = tracks[0]?.coverImageUrl;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/playlists')}
        className="flex items-center gap-2 text-surface-400 hover:text-white 
                   transition-colors mb-6"
        aria-label="Back to playlists"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Playlists</span>
      </button>

      {/* Playlist Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {/* Cover Art */}
        <div className="flex-shrink-0 w-48 h-48 mx-auto sm:mx-0">
          {headerCover ? (
            <img
              src={headerCover}
              alt={playlist.name}
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
          ) : (
            <div className="w-full h-full bg-surface-700 rounded-xl flex items-center justify-center">
              <Music className="w-16 h-16 text-surface-500" />
            </div>
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex-1 flex flex-col justify-end text-center sm:text-left">
          <p className="text-sm font-medium text-primary-400 mb-2">PLAYLIST</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{playlist.name}</h1>
          <div className="flex items-center gap-4 text-surface-400 justify-center sm:justify-start">
            <span className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              {tracks.length} {pluralize(tracks.length, 'track')}
            </span>
            {totalDuration > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTotalDuration(totalDuration)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {tracks.length > 0 && (
            <div className="flex items-center gap-3 mt-6 justify-center sm:justify-start">
              <button
                onClick={handlePlayAll}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 
                           text-white font-medium rounded-full transition-colors"
                aria-label="Play all tracks"
              >
                <Play className="w-5 h-5 fill-white" />
                {isPlayingFromThisPlaylist ? 'Playing' : 'Play'}
              </button>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-2 px-4 py-3 bg-surface-700 hover:bg-surface-600 
                           text-white font-medium rounded-full transition-colors"
                aria-label="Shuffle play"
              >
                <Shuffle className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Track List */}
      {tracks.length > 0 ? (
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <PlaylistTrackCard
              key={track.id}
              track={track}
              index={index}
              totalTracks={tracks.length}
              playlistId={playlist.id}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              onRemove={() => handleRemoveTrack(track.id, track.title)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Music className="w-full h-full" />}
          title="No tracks in this playlist"
          description="Head over to the library to add some tracks."
          action={
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white 
                         bg-primary-600 hover:bg-primary-500 rounded-lg transition-colors"
            >
              Browse Library
            </Link>
          }
        />
      )}
    </div>
  );
}
