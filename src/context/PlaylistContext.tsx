import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Playlist } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { createId } from '../utils/ids';

interface PlaylistContextValue {
  playlists: Playlist[];
  createPlaylist: (name: string) => { ok: boolean; error?: string; playlist?: Playlist };
  renamePlaylist: (id: string, name: string) => { ok: boolean; error?: string };
  deletePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => { ok: boolean; reason?: string };
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  moveTrack: (playlistId: string, trackId: string, direction: 'up' | 'down') => void;
}

const PlaylistContext = createContext<PlaylistContextValue | undefined>(undefined);
const STORAGE_KEY = 'mpb_playlists_v1';

const sanitizeName = (name: string) => name.trim();

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>(() =>
    loadFromStorage<Playlist[]>(STORAGE_KEY, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, playlists);
  }, [playlists]);

  const createPlaylist = (rawName: string) => {
    const name = sanitizeName(rawName);
    if (!name) return { ok: false as const, error: 'Name is required' };
    const exists = playlists.some((p) => p.name.toLowerCase() === name.toLowerCase());
    if (exists) return { ok: false as const, error: 'Playlist name already exists' };

    const playlist: Playlist = {
      id: createId('pl'),
      name,
      trackIds: [],
      createdAt: new Date().toISOString(),
    };
    setPlaylists((prev) => [...prev, playlist]);
    return { ok: true as const, playlist };
  };

  const renamePlaylist = (id: string, rawName: string) => {
    const name = sanitizeName(rawName);
    if (!name) return { ok: false as const, error: 'Name is required' };
    setPlaylists((prev) =>
      prev.map((playlist) => (playlist.id === id ? { ...playlist, name } : playlist))
    );
    return { ok: true as const };
  };

  const deletePlaylist = (id: string) => {
    setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
  };

  const addTrackToPlaylist = (playlistId: string, trackId: string) => {
    let added = false;
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;
        if (playlist.trackIds.includes(trackId)) return playlist;
        added = true;
        return { ...playlist, trackIds: [...playlist.trackIds, trackId] };
      })
    );
    if (!added) return { ok: false as const, reason: 'Already in playlist' };
    return { ok: true as const };
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, trackIds: playlist.trackIds.filter((id) => id !== trackId) }
          : playlist
      )
    );
  };

  const moveTrack = (playlistId: string, trackId: string, direction: 'up' | 'down') => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;
        const index = playlist.trackIds.indexOf(trackId);
        if (index === -1) return playlist;
        const target = direction === 'up' ? index - 1 : index + 1;
        if (target < 0 || target >= playlist.trackIds.length) return playlist;
        const nextTrackIds = [...playlist.trackIds];
        [nextTrackIds[index], nextTrackIds[target]] = [nextTrackIds[target], nextTrackIds[index]];
        return { ...playlist, trackIds: nextTrackIds };
      })
    );
  };

  const value = useMemo(
    () => ({ playlists, createPlaylist, renamePlaylist, deletePlaylist, addTrackToPlaylist, removeTrackFromPlaylist, moveTrack }),
    [playlists]
  );

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
};

export const usePlaylists = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error('usePlaylists must be used within PlaylistProvider');
  return ctx;
};
