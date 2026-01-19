import { Link } from 'react-router-dom';
import { Music, Clock, Play, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Playlist } from '../types';
import { getTracksByIds, getTrackById } from '../data/mockTracks';
import { formatTotalDuration, pluralize } from '../utils';
import { usePlayer } from '../context/PlayerContext';

interface PlaylistCardProps {
  playlist: Playlist;
  onRename: () => void;
  onDelete: () => void;
}

export function PlaylistCard({ playlist, onRename, onDelete }: PlaylistCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { playTrack, playerState } = usePlayer();

  const tracks = getTracksByIds(playlist.trackIds);
  const totalDuration = tracks.reduce((sum, track) => sum + track.durationSec, 0);
  const coverImages = tracks.slice(0, 4).map(t => t.coverImageUrl);
  
  const isPlayingFromThisPlaylist = playerState.currentPlaylistId === playlist.id && playerState.isPlaying;

  const handlePlayPlaylist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (playlist.trackIds.length > 0) {
      playTrack(playlist.trackIds[0], playlist.id);
    }
  };

  return (
    <div className="group relative bg-surface-800/50 hover:bg-surface-700/50 rounded-xl p-4 
                    transition-all duration-200 border border-surface-700 hover:border-surface-600">
      <Link to={`/playlists/${playlist.id}`} className="block">
        {/* Cover Art Grid */}
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-surface-700">
          {coverImages.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-16 h-16 text-surface-500" />
            </div>
          ) : coverImages.length < 4 ? (
            <img
              src={coverImages[0]}
              alt={playlist.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
              {coverImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {/* Play Button Overlay */}
          {playlist.trackIds.length > 0 && (
            <button
              onClick={handlePlayPlaylist}
              className={`absolute bottom-2 right-2 w-12 h-12 bg-primary-500 hover:bg-primary-400 
                         rounded-full flex items-center justify-center shadow-lg
                         transition-all duration-300 transform
                         ${isPlayingFromThisPlaylist 
                           ? 'opacity-100 translate-y-0' 
                           : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
              aria-label={`Play ${playlist.name}`}
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </button>
          )}
        </div>

        {/* Playlist Info */}
        <h3 className="font-semibold text-white truncate mb-1 group-hover:text-primary-400 transition-colors">
          {playlist.name}
        </h3>
        <div className="flex items-center gap-3 text-sm text-surface-400">
          <span className="flex items-center gap-1">
            <Music className="w-4 h-4" />
            {playlist.trackIds.length} {pluralize(playlist.trackIds.length, 'track')}
          </span>
          {totalDuration > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTotalDuration(totalDuration)}
            </span>
          )}
        </div>
      </Link>

      {/* Menu Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
          className="p-2 text-surface-400 hover:text-white hover:bg-surface-600 
                     rounded-full transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Playlist options"
          aria-expanded={showMenu}
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            <div className="absolute right-0 top-full mt-1 w-40 bg-surface-800 border border-surface-700 
                            rounded-lg shadow-xl z-20 overflow-hidden">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(false);
                  onRename();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-surface-700 
                           flex items-center gap-2 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMenu(false);
                  onDelete();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-900/20 
                           flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
