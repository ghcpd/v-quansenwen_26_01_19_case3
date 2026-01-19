import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';
import { useMusicLibrary } from '../context/MusicLibraryContext';
import { usePlayer } from '../context/PlayerContext';
import { useToast } from '../context/ToastContext';
import { TrackCard } from '../components/TrackCard';
import { formatDuration, getTotalDuration } from '../utils/helpers';

export const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlaylistById, getPlaylistTracks, removeTrackFromPlaylist, reorderTrack } =
    usePlaylist();
  const { tracks } = useMusicLibrary();
  const { playTrack, setCurrentPlaylistTracks, currentTrack, isPlaying, currentPlaylistId } =
    usePlayer();
  const { showToast } = useToast();

  const playlist = id ? getPlaylistById(id) : null;
  const playlistTracks = playlist ? getPlaylistTracks(playlist.id, tracks) : [];

  useEffect(() => {
    if (!playlist) {
      navigate('/playlists');
    }
  }, [playlist, navigate]);

  useEffect(() => {
    if (playlist && playlistTracks.length > 0) {
      setCurrentPlaylistTracks(playlistTracks);
    }
  }, [playlist, playlistTracks.length]);

  if (!playlist) {
    return null;
  }

  const handlePlay = (trackIndex: number) => {
    const track = playlistTracks[trackIndex];
    if (track) {
      setCurrentPlaylistTracks(playlistTracks);
      playTrack(track, playlist.id);
    }
  };

  const handleRemove = (trackId: string) => {
    removeTrackFromPlaylist(playlist.id, trackId);
    showToast('Track removed from playlist', 'success');
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderTrack(playlist.id, index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < playlistTracks.length - 1) {
      reorderTrack(playlist.id, index, index + 1);
    }
  };

  const totalDuration = getTotalDuration(playlistTracks);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-start gap-6 mb-8">
        <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-lg">
          {playlistTracks.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 h-full p-2">
              {playlistTracks.slice(0, 4).map((track, i) => (
                <img
                  key={i}
                  src={track.coverImageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Playlist
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            {playlist.name}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{playlistTracks.length} tracks</span>
            {totalDuration > 0 && (
              <>
                <span>•</span>
                <span>{formatDuration(totalDuration)} total</span>
              </>
            )}
          </div>

          {playlistTracks.length > 0 && (
            <button
              onClick={() => handlePlay(0)}
              className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play All
            </button>
          )}
        </div>
      </div>

      {playlistTracks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
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
            No tracks in this playlist
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Go to the library to add some tracks
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Library
          </button>
        </div>
      ) : (
        <div className="space-y-1">
          {playlistTracks.map((track, index) => (
            <div key={track.id} className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move up"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === playlistTracks.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move down"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex-grow">
                <TrackCard
                  track={track}
                  onPlay={() => handlePlay(index)}
                  onAddToPlaylist={() => {}}
                  isPlaying={
                    currentTrack?.id === track.id &&
                    isPlaying &&
                    currentPlaylistId === playlist.id
                  }
                  showRemove
                  onRemove={() => handleRemove(track.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
