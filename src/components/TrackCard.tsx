import React from 'react';
import { Track } from '../types';
import { formatDuration } from '../utils/helpers';

interface TrackCardProps {
  track: Track;
  onPlay: () => void;
  onAddToPlaylist: () => void;
  isPlaying?: boolean;
  showRemove?: boolean;
  onRemove?: () => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  onPlay,
  onAddToPlaylist,
  isPlaying = false,
  showRemove = false,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
      <div className="relative flex-shrink-0">
        <img
          src={track.coverImageUrl}
          alt={track.title}
          className="w-14 h-14 rounded object-cover"
        />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
            <div className="w-3 h-3 bg-primary-500 animate-pulse rounded-full"></div>
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {track.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {track.artist} • {track.album}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {track.genre} • {track.year}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDuration(track.durationSec)}
        </span>
        
        <button
          onClick={onPlay}
          className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? 'Playing' : 'Play track'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {showRemove ? (
          <button
            onClick={onRemove}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove from playlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onAddToPlaylist}
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to playlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
