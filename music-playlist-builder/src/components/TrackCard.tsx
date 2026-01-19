import { useState } from 'react';
import { Play, Pause, Plus, Check } from 'lucide-react';
import { Track } from '../types';
import { formatDuration } from '../utils';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';
import { useToast } from '../context/ToastContext';

interface TrackCardProps {
  track: Track;
  showAddToPlaylist?: boolean;
  playlistId?: string;
}

export function TrackCard({ track, showAddToPlaylist = true, playlistId }: TrackCardProps) {
  const { playerState, playTrack, togglePlayPause } = usePlayer();
  const { playlists, addTrackToPlaylist } = usePlaylists();
  const { showToast } = useToast();
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isCurrentTrack = playerState.currentTrackId === track.id;
  const isPlaying = isCurrentTrack && playerState.isPlaying;

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track.id, playlistId);
    }
  };

  const handleAddToPlaylist = (targetPlaylistId: string) => {
    const added = addTrackToPlaylist(targetPlaylistId, track.id);
    const playlist = playlists.find(p => p.id === targetPlaylistId);
    
    if (added) {
      showToast(`Added "${track.title}" to ${playlist?.name}`, 'success');
    } else {
      showToast(`"${track.title}" is already in ${playlist?.name}`, 'info');
    }
    setShowPlaylistMenu(false);
  };

  return (
    <div 
      className={`group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                  ${isCurrentTrack 
                    ? 'bg-primary-900/30 border border-primary-700' 
                    : 'bg-surface-800/50 hover:bg-surface-700/50 border border-transparent'}`}
    >
      {/* Cover Image with Play Button Overlay */}
      <div className="relative flex-shrink-0">
        <img
          src={track.coverImageUrl}
          alt={`${track.album} cover`}
          className="w-14 h-14 rounded-md object-cover"
          loading="lazy"
        />
        <button
          onClick={handlePlayClick}
          className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-md
                      transition-opacity duration-200
                      ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-primary-400' : 'text-white'}`}>
          {track.title}
        </h3>
        <p className="text-sm text-surface-400 truncate">
          {track.artist} • {track.album}
        </p>
      </div>

      {/* Genre Badge */}
      <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-surface-700 
                       text-surface-300 rounded-full">
        {track.genre}
      </span>

      {/* Duration */}
      <span className="text-sm text-surface-400 w-12 text-right">
        {formatDuration(track.durationSec)}
      </span>

      {/* Add to Playlist Button */}
      {showAddToPlaylist && playlists.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            className="p-2 text-surface-400 hover:text-primary-400 hover:bg-surface-700 
                       rounded-full transition-colors"
            aria-label="Add to playlist"
            aria-expanded={showPlaylistMenu}
          >
            <Plus className="w-5 h-5" />
          </button>

          {showPlaylistMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowPlaylistMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface-800 border border-surface-700 
                              rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="py-1">
                  <p className="px-3 py-2 text-xs font-medium text-surface-400 uppercase">
                    Add to playlist
                  </p>
                  {playlists.map((playlist) => {
                    const isInPlaylist = playlist.trackIds.includes(track.id);
                    return (
                      <button
                        key={playlist.id}
                        onClick={() => handleAddToPlaylist(playlist.id)}
                        className="w-full px-3 py-2 text-left text-sm flex items-center gap-2
                                   hover:bg-surface-700 transition-colors"
                        disabled={isInPlaylist}
                      >
                        {isInPlaylist && <Check className="w-4 h-4 text-primary-400" />}
                        <span className={isInPlaylist ? 'text-surface-400' : 'text-white'}>
                          {playlist.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
