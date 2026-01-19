import { createContext, useContext, useCallback, useEffect, useRef, ReactNode } from 'react';
import { PlayerState } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePlaylists } from './PlaylistContext';
import { getTrackById } from '../data/mockTracks';
import { clamp } from '../utils';

interface PlayerContextType {
  playerState: PlayerState;
  currentTrack: ReturnType<typeof getTrackById>;
  playTrack: (trackId: string, playlistId?: string) => void;
  togglePlayPause: () => void;
  pause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (progress: number) => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const initialPlayerState: PlayerState = {
  currentTrackId: null,
  currentPlaylistId: null,
  isPlaying: false,
  progress: 0,
  volume: 75,
};

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [playerState, setPlayerState] = useLocalStorage<PlayerState>('playerState', initialPlayerState);
  const { getPlaylistById, playlists } = usePlaylists();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrack = playerState.currentTrackId 
    ? getTrackById(playerState.currentTrackId) 
    : undefined;

  // Handle playlist deletion - stop playback if current playlist is deleted
  useEffect(() => {
    if (playerState.currentPlaylistId) {
      const playlist = getPlaylistById(playerState.currentPlaylistId);
      if (!playlist) {
        // Playlist was deleted, stop playback
        setPlayerState(prev => ({
          ...prev,
          currentPlaylistId: null,
          isPlaying: false,
          progress: 0,
        }));
      } else if (playerState.currentTrackId && !playlist.trackIds.includes(playerState.currentTrackId)) {
        // Current track was removed from playlist
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
          progress: 0,
        }));
      }
    }
  }, [playlists, playerState.currentPlaylistId, playerState.currentTrackId, getPlaylistById, setPlayerState]);

  // Progress timer simulation
  useEffect(() => {
    if (playerState.isPlaying && currentTrack) {
      const progressIncrement = (100 / currentTrack.durationSec) * 0.1; // Update every 100ms
      
      intervalRef.current = setInterval(() => {
        setPlayerState(prev => {
          const newProgress = prev.progress + progressIncrement;
          if (newProgress >= 100) {
            // Track finished, try to play next
            return prev;
          }
          return { ...prev, progress: newProgress };
        });
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playerState.isPlaying, currentTrack, setPlayerState]);

  // Auto-next when track finishes
  useEffect(() => {
    if (playerState.progress >= 100 && playerState.isPlaying) {
      const playlist = playerState.currentPlaylistId 
        ? getPlaylistById(playerState.currentPlaylistId) 
        : null;
      
      if (playlist && playerState.currentTrackId) {
        const currentIndex = playlist.trackIds.indexOf(playerState.currentTrackId);
        if (currentIndex < playlist.trackIds.length - 1) {
          // Play next track
          setPlayerState(prev => ({
            ...prev,
            currentTrackId: playlist.trackIds[currentIndex + 1],
            progress: 0,
          }));
        } else {
          // End of playlist
          setPlayerState(prev => ({
            ...prev,
            isPlaying: false,
            progress: 0,
          }));
        }
      } else {
        // No playlist, just stop
        setPlayerState(prev => ({
          ...prev,
          isPlaying: false,
          progress: 0,
        }));
      }
    }
  }, [playerState.progress, playerState.isPlaying, playerState.currentPlaylistId, playerState.currentTrackId, getPlaylistById, setPlayerState]);

  const playTrack = useCallback((trackId: string, playlistId?: string) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrackId: trackId,
      currentPlaylistId: playlistId || prev.currentPlaylistId,
      isPlaying: true,
      progress: 0,
    }));
  }, [setPlayerState]);

  const togglePlayPause = useCallback(() => {
    if (!playerState.currentTrackId) return;
    
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, [playerState.currentTrackId, setPlayerState]);

  const pause = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: false,
    }));
  }, [setPlayerState]);

  const nextTrack = useCallback(() => {
    if (!playerState.currentPlaylistId || !playerState.currentTrackId) return;
    
    const playlist = getPlaylistById(playerState.currentPlaylistId);
    if (!playlist) return;
    
    const currentIndex = playlist.trackIds.indexOf(playerState.currentTrackId);
    if (currentIndex < playlist.trackIds.length - 1) {
      setPlayerState(prev => ({
        ...prev,
        currentTrackId: playlist.trackIds[currentIndex + 1],
        progress: 0,
        isPlaying: true,
      }));
    }
  }, [playerState.currentPlaylistId, playerState.currentTrackId, getPlaylistById, setPlayerState]);

  const previousTrack = useCallback(() => {
    if (!playerState.currentPlaylistId || !playerState.currentTrackId) return;
    
    const playlist = getPlaylistById(playerState.currentPlaylistId);
    if (!playlist) return;
    
    const currentIndex = playlist.trackIds.indexOf(playerState.currentTrackId);
    if (currentIndex > 0) {
      setPlayerState(prev => ({
        ...prev,
        currentTrackId: playlist.trackIds[currentIndex - 1],
        progress: 0,
        isPlaying: true,
      }));
    }
  }, [playerState.currentPlaylistId, playerState.currentTrackId, getPlaylistById, setPlayerState]);

  const seekTo = useCallback((progress: number) => {
    setPlayerState(prev => ({
      ...prev,
      progress: clamp(progress, 0, 100),
    }));
  }, [setPlayerState]);

  const setVolume = useCallback((volume: number) => {
    setPlayerState(prev => ({
      ...prev,
      volume: clamp(volume, 0, 100),
    }));
  }, [setPlayerState]);

  const value: PlayerContextType = {
    playerState,
    currentTrack,
    playTrack,
    togglePlayPause,
    pause,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextType {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
