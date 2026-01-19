import { createContext, useContext, useCallback, ReactNode } from 'react';
import { Playlist } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId, moveArrayItem } from '../utils';

interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (name: string) => Playlist;
  renamePlaylist: (playlistId: string, newName: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => boolean;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  reorderTracks: (playlistId: string, fromIndex: number, toIndex: number) => void;
  getPlaylistById: (playlistId: string) => Playlist | undefined;
  isTrackInPlaylist: (playlistId: string, trackId: string) => boolean;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

interface PlaylistProviderProps {
  children: ReactNode;
}

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('playlists', []);

  const createPlaylist = useCallback((name: string): Playlist => {
    const newPlaylist: Playlist = {
      id: generateId(),
      name: name.trim(),
      trackIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, [setPlaylists]);

  const renamePlaylist = useCallback((playlistId: string, newName: string) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, name: newName.trim(), updatedAt: Date.now() }
          : playlist
      )
    );
  }, [setPlaylists]);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
  }, [setPlaylists]);

  const addTrackToPlaylist = useCallback((playlistId: string, trackId: string): boolean => {
    let added = false;
    
    setPlaylists(prev => 
      prev.map(playlist => {
        if (playlist.id === playlistId) {
          if (playlist.trackIds.includes(trackId)) {
            return playlist; // Track already exists
          }
          added = true;
          return {
            ...playlist,
            trackIds: [...playlist.trackIds, trackId],
            updatedAt: Date.now(),
          };
        }
        return playlist;
      })
    );
    
    return added;
  }, [setPlaylists]);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId
          ? {
              ...playlist,
              trackIds: playlist.trackIds.filter(id => id !== trackId),
              updatedAt: Date.now(),
            }
          : playlist
      )
    );
  }, [setPlaylists]);

  const reorderTracks = useCallback((playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId
          ? {
              ...playlist,
              trackIds: moveArrayItem(playlist.trackIds, fromIndex, toIndex),
              updatedAt: Date.now(),
            }
          : playlist
      )
    );
  }, [setPlaylists]);

  const getPlaylistById = useCallback((playlistId: string): Playlist | undefined => {
    return playlists.find(playlist => playlist.id === playlistId);
  }, [playlists]);

  const isTrackInPlaylist = useCallback((playlistId: string, trackId: string): boolean => {
    const playlist = playlists.find(p => p.id === playlistId);
    return playlist ? playlist.trackIds.includes(trackId) : false;
  }, [playlists]);

  const value: PlaylistContextType = {
    playlists,
    createPlaylist,
    renamePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    reorderTracks,
    getPlaylistById,
    isTrackInPlaylist,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylists(): PlaylistContextType {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
}
