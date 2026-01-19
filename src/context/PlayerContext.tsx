import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { PlayerState, Playlist, Track } from '../types';
import { useInterval } from '../hooks/useInterval';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { trackMap } from '../data/tracks';
import { usePlaylists } from './PlaylistContext';

interface PlayerContextValue {
  state: PlayerState;
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  playFromPlaylist: (playlistId: string, trackId: string) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  seek: (progressRatio: number) => void;
}

const STORAGE_KEY = 'mpb_player_v1';
const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { playlists } = usePlaylists();
  const [state, setState] = useState<PlayerState>(() =>
    loadFromStorage<PlayerState>(STORAGE_KEY, {
      playlistId: null,
      trackId: null,
      isPlaying: false,
      progressSec: 0,
    })
  );

  const currentPlaylist = useMemo(
    () => playlists.find((p) => p.id === state.playlistId) ?? null,
    [playlists, state.playlistId]
  );

  const currentTrack = state.trackId ? trackMap[state.trackId] ?? null : null;

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    if (!state.playlistId) return;
    const stillExists = playlists.some((p) => p.id === state.playlistId);
    const stillContains = playlists
      .find((p) => p.id === state.playlistId)
      ?.trackIds.includes(state.trackId ?? '') ?? false;
    if (!stillExists || !stillContains) {
      setState({ playlistId: null, trackId: null, isPlaying: false, progressSec: 0 });
    }
  }, [playlists, state.playlistId, state.trackId]);

  useInterval(() => {
    if (!state.isPlaying || !currentTrack) return;
    setState((prev) => {
      const trackDuration = currentTrack.durationSec;
      const nextProgress = prev.progressSec + 1;
      if (nextProgress >= trackDuration) {
        const advanced = moveToNextTrack(playlists, prev.playlistId, prev.trackId);
        if (!advanced) {
          return { playlistId: prev.playlistId, trackId: prev.trackId, isPlaying: false, progressSec: 0 };
        }
        return { ...advanced, isPlaying: true };
      }
      return { ...prev, progressSec: nextProgress };
    });
  }, state.isPlaying ? 1000 : null);

  const playFromPlaylist = (playlistId: string, trackId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist || !playlist.trackIds.includes(trackId)) return;
    setState({ playlistId, trackId, isPlaying: true, progressSec: 0 });
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const pause = () => setState((prev) => ({ ...prev, isPlaying: false }));
  const resume = () => currentTrack && setState((prev) => ({ ...prev, isPlaying: true }));

  const stop = () => setState({ playlistId: null, trackId: null, isPlaying: false, progressSec: 0 });

  const next = () => {
    setState((prev) => {
      const advanced = moveToNextTrack(playlists, prev.playlistId, prev.trackId);
      if (!advanced) return { ...prev, isPlaying: false, progressSec: 0 };
      return { ...advanced, isPlaying: true };
    });
  };

  const previous = () => {
    setState((prev) => {
      const moved = moveToPreviousTrack(playlists, prev.playlistId, prev.trackId);
      if (!moved) return prev;
      return { ...moved, isPlaying: true };
    });
  };

  const seek = (ratio: number) => {
    if (!currentTrack) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    const nextProgress = Math.floor(currentTrack.durationSec * clamped);
    setState((prev) => ({ ...prev, progressSec: nextProgress }));
  };

  const value = useMemo(
    () => ({ state, currentTrack, currentPlaylist, playFromPlaylist, togglePlay, pause, resume, stop, next, previous, seek }),
    [state, currentTrack, currentPlaylist]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

const moveToNextTrack = (
  playlists: Playlist[],
  playlistId: string | null,
  currentTrackId: string | null
): PlayerState | null => {
  if (!playlistId || !currentTrackId) return null;
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return null;
  const idx = playlist.trackIds.indexOf(currentTrackId);
  if (idx === -1 || idx === playlist.trackIds.length - 1) return null;
  const nextTrackId = playlist.trackIds[idx + 1];
  return { playlistId, trackId: nextTrackId, isPlaying: true, progressSec: 0 };
};

const moveToPreviousTrack = (
  playlists: Playlist[],
  playlistId: string | null,
  currentTrackId: string | null
): PlayerState | null => {
  if (!playlistId || !currentTrackId) return null;
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return null;
  const idx = playlist.trackIds.indexOf(currentTrackId);
  if (idx <= 0) return null;
  const nextTrackId = playlist.trackIds[idx - 1];
  return { playlistId, trackId: nextTrackId, isPlaying: true, progressSec: 0 };
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
