import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Track, PlayerState } from '../types';

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track, playlistId: string | null) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seek: (time: number) => void;
  stopPlayback: () => void;
  currentPlaylistTracks: Track[];
  setCurrentPlaylistTracks: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = 'music-player-state';

export const PlayerProvider: React.FC<Props> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...parsed, isPlaying: false, currentTime: 0 };
    }
    return {
      currentTrack: null,
      currentPlaylistId: null,
      isPlaying: false,
      currentTime: 0,
      volume: 80,
    };
  });

  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState<Track[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playerState));
  }, [playerState]);

  useEffect(() => {
    if (playerState.isPlaying && playerState.currentTrack) {
      intervalRef.current = window.setInterval(() => {
        setPlayerState(prev => {
          if (!prev.currentTrack) return prev;
          const newTime = prev.currentTime + 1;
          if (newTime >= prev.currentTrack.durationSec) {
            nextTrack();
            return prev;
          }
          return { ...prev, currentTime: newTime };
        });
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playerState.isPlaying, playerState.currentTrack]);

  const playTrack = (track: Track, playlistId: string | null) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: track,
      currentPlaylistId: playlistId,
      isPlaying: true,
      currentTime: 0,
    }));
  };

  const togglePlayPause = () => {
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const nextTrack = () => {
    if (!playerState.currentTrack || currentPlaylistTracks.length === 0) return;
    const currentIndex = currentPlaylistTracks.findIndex(
      t => t.id === playerState.currentTrack?.id
    );
    if (currentIndex < currentPlaylistTracks.length - 1) {
      playTrack(currentPlaylistTracks[currentIndex + 1], playerState.currentPlaylistId);
    } else {
      setPlayerState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    }
  };

  const previousTrack = () => {
    if (!playerState.currentTrack || currentPlaylistTracks.length === 0) return;
    const currentIndex = currentPlaylistTracks.findIndex(
      t => t.id === playerState.currentTrack?.id
    );
    if (currentIndex > 0) {
      playTrack(currentPlaylistTracks[currentIndex - 1], playerState.currentPlaylistId);
    }
  };

  const seek = (time: number) => {
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  };

  const stopPlayback = () => {
    setPlayerState(prev => ({
      ...prev,
      currentTrack: null,
      currentPlaylistId: null,
      isPlaying: false,
      currentTime: 0,
    }));
  };

  return (
    <PlayerContext.Provider
      value={{
        ...playerState,
        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seek,
        stopPlayback,
        currentPlaylistTracks,
        setCurrentPlaylistTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
