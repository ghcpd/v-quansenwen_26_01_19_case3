import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Playlist, Track } from '../types';
import { generateId } from '../utils/helpers';

interface PlaylistContextType {
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  deletePlaylist: (id: string) => void;
  renamePlaylist: (id: string, newName: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => boolean;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  reorderTrack: (playlistId: string, fromIndex: number, toIndex: number) => void;
  getPlaylistById: (id: string) => Playlist | undefined;
  getPlaylistTracks: (playlistId: string, allTracks: Track[]) => Track[];
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within PlaylistProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'music-playlists';

export const PlaylistProvider: React.FC<Props> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: generateId(),
      name,
      trackIds: [],
      createdAt: Date.now(),
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== id));
  };

  const renamePlaylist = (id: string, newName: string) => {
    setPlaylists(prev =>
      prev.map(p => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const addTrackToPlaylist = (playlistId: string, trackId: string): boolean => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return false;
    if (playlist.trackIds.includes(trackId)) return false;

    setPlaylists(prev =>
      prev.map(p =>
        p.id === playlistId
          ? { ...p, trackIds: [...p.trackIds, trackId] }
          : p
      )
    );
    return true;
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(prev =>
      prev.map(p =>
        p.id === playlistId
          ? { ...p, trackIds: p.trackIds.filter(id => id !== trackId) }
          : p
      )
    );
  };

  const reorderTrack = (playlistId: string, fromIndex: number, toIndex: number) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        const newTrackIds = [...p.trackIds];
        const [removed] = newTrackIds.splice(fromIndex, 1);
        newTrackIds.splice(toIndex, 0, removed);
        return { ...p, trackIds: newTrackIds };
      })
    );
  };

  const getPlaylistById = (id: string) => {
    return playlists.find(p => p.id === id);
  };

  const getPlaylistTracks = (playlistId: string, allTracks: Track[]): Track[] => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.trackIds
      .map(id => allTracks.find(t => t.id === id))
      .filter((t): t is Track => t !== undefined);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        deletePlaylist,
        renamePlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        reorderTrack,
        getPlaylistById,
        getPlaylistTracks,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
