import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';
import { formatDuration } from '../utils';

export function NowPlayingBar() {
  const { 
    playerState, 
    currentTrack, 
    togglePlayPause, 
    nextTrack, 
    previousTrack, 
    seekTo,
    setVolume 
  } = usePlayer();
  const { getPlaylistById } = usePlaylists();

  const currentPlaylist = playerState.currentPlaylistId 
    ? getPlaylistById(playerState.currentPlaylistId) 
    : null;

  const canGoPrevious = currentPlaylist && playerState.currentTrackId 
    ? currentPlaylist.trackIds.indexOf(playerState.currentTrackId) > 0 
    : false;
  
  const canGoNext = currentPlaylist && playerState.currentTrackId 
    ? currentPlaylist.trackIds.indexOf(playerState.currentTrackId) < currentPlaylist.trackIds.length - 1 
    : false;

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface-900 border-t border-surface-700 
                      flex items-center justify-center z-50">
        <div className="flex items-center gap-3 text-surface-500">
          <Music className="w-5 h-5" />
          <span className="text-sm">No track selected</span>
        </div>
      </div>
    );
  }

  const currentTime = Math.floor((playerState.progress / 100) * currentTrack.durationSec);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(percent);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const toggleMute = () => {
    setVolume(playerState.volume > 0 ? 0 : 75);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-900 border-t border-surface-700 z-50">
      {/* Progress Bar */}
      <div 
        className="h-1 bg-surface-700 cursor-pointer group"
        onClick={handleProgressClick}
        role="slider"
        aria-label="Seek"
        aria-valuenow={playerState.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div 
          className="h-full bg-primary-500 group-hover:bg-primary-400 transition-colors relative"
          style={{ width: `${playerState.progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full 
                          opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="h-[76px] px-4 flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentTrack.coverImageUrl}
            alt={`${currentTrack.album} cover`}
            className="w-14 h-14 rounded-md object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-medium text-white truncate">{currentTrack.title}</h4>
            <p className="text-sm text-surface-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={previousTrack}
            disabled={!canGoPrevious}
            className="p-2 text-surface-400 hover:text-white transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-3 bg-white hover:bg-surface-200 rounded-full transition-colors"
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? (
              <Pause className="w-5 h-5 text-surface-900 fill-surface-900" />
            ) : (
              <Play className="w-5 h-5 text-surface-900 fill-surface-900 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={nextTrack}
            disabled={!canGoNext}
            className="p-2 text-surface-400 hover:text-white transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Time Display */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-surface-400 min-w-[100px] justify-center">
          <span>{formatDuration(currentTime)}</span>
          <span>/</span>
          <span>{formatDuration(currentTrack.durationSec)}</span>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2 w-32">
          <button
            onClick={toggleMute}
            className="p-2 text-surface-400 hover:text-white transition-colors"
            aria-label={playerState.volume > 0 ? 'Mute' : 'Unmute'}
          >
            {playerState.volume > 0 ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-surface-700 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
