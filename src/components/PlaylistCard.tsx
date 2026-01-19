import React from 'react';
import { Link } from 'react-router-dom';
import { Playlist, Track } from '../types';
import { formatDuration, getTotalDuration } from '../utils/helpers';

interface PlaylistCardProps {
  playlist: Playlist;
  tracks: Track[];
  onDelete: () => void;
  onRename: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  tracks,
  onDelete,
  onRename,
}) => {
  const totalDuration = getTotalDuration(tracks);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <Link to={`/playlist/${playlist.id}`} className="block">
        <div className="aspect-square bg-gradient-to-br from-primary-400 to-primary-600 relative">
          {tracks.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 h-full p-2">
              {tracks.slice(0, 4).map((track, i) => (
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
              <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/playlist/${playlist.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate hover:text-primary-600 dark:hover:text-primary-400">
            {playlist.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          {totalDuration > 0 && ` • ${formatDuration(totalDuration)}`}
        </p>

        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onRename}
            className="flex-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Rename playlist"
          >
            Rename
          </button>
          <button
            onClick={onDelete}
            className="flex-1 px-3 py-1.5 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            aria-label="Delete playlist"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
