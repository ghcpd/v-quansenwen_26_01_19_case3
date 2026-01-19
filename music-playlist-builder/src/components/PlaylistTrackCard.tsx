import { Play, Pause, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { Track } from '../types';
import { formatDuration } from '../utils';
import { usePlayer } from '../context/PlayerContext';

interface PlaylistTrackCardProps {
  track: Track;
  index: number;
  totalTracks: number;
  playlistId: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export function PlaylistTrackCard({
  track,
  index,
  totalTracks,
  playlistId,
  onMoveUp,
  onMoveDown,
  onRemove,
}: PlaylistTrackCardProps) {
  const { playerState, playTrack, togglePlayPause } = usePlayer();

  const isCurrentTrack = playerState.currentTrackId === track.id;
  const isPlaying = isCurrentTrack && playerState.isPlaying;

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track.id, playlistId);
    }
  };

  return (
    <div 
      className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${isCurrentTrack 
                    ? 'bg-primary-900/30 border border-primary-700' 
                    : 'bg-surface-800/50 hover:bg-surface-700/50 border border-transparent'}`}
    >
      {/* Track Number */}
      <span className="w-8 text-center text-sm text-surface-400 font-medium">
        {index + 1}
      </span>

      {/* Cover Image with Play Button Overlay */}
      <div className="relative flex-shrink-0">
        <img
          src={track.coverImageUrl}
          alt={`${track.album} cover`}
          className="w-12 h-12 rounded-md object-cover"
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
            <Pause className="w-5 h-5 text-white fill-white" />
          ) : (
            <Play className="w-5 h-5 text-white fill-white" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-primary-400' : 'text-white'}`}>
          {track.title}
        </h3>
        <p className="text-sm text-surface-400 truncate">
          {track.artist}
        </p>
      </div>

      {/* Duration */}
      <span className="text-sm text-surface-400 w-12 text-right">
        {formatDuration(track.durationSec)}
      </span>

      {/* Reorder Buttons */}
      <div className="flex flex-col gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-1 text-surface-400 hover:text-white hover:bg-surface-700 
                     rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Move ${track.title} up`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === totalTracks - 1}
          className="p-1 text-surface-400 hover:text-white hover:bg-surface-700 
                     rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label={`Move ${track.title} down`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="p-2 text-surface-400 hover:text-red-400 hover:bg-red-900/20 
                   rounded-full transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Remove ${track.title} from playlist`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
