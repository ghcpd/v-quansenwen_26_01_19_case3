import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatDuration } from '../utils/helpers';

export const NowPlayingBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    togglePlayPause,
    nextTrack,
    previousTrack,
    seek,
    currentPlaylistTracks,
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const progress = (currentTime / currentTrack.durationSec) * 100;
  const canGoPrevious = currentPlaylistTracks.length > 0 && 
    currentPlaylistTracks.findIndex(t => t.id === currentTrack.id) > 0;
  const canGoNext = currentPlaylistTracks.length > 0 &&
    currentPlaylistTracks.findIndex(t => t.id === currentTrack.id) < currentPlaylistTracks.length - 1;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = Math.floor(percentage * currentTrack.durationSec);
    seek(newTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40">
      <div
        className="h-1 bg-gray-200 dark:bg-gray-700 cursor-pointer hover:h-1.5 transition-all"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img
              src={currentTrack.coverImageUrl}
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">
                {currentTrack.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center gap-4">
              <button
                onClick={previousTrack}
                disabled={!canGoPrevious}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous track"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
              </button>

              <button
                onClick={togglePlayPause}
                className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <button
                onClick={nextTrack}
                disabled={!canGoNext}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next track"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDuration(currentTime)}</span>
              <span>/</span>
              <span>{formatDuration(currentTrack.durationSec)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <div className="hidden md:flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-400">80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
