export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationSec: number;
  coverImageUrl: string;
  genre: string;
  year: number;
}

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
}

export interface PlayerState {
  currentTrack: Track | null;
  currentPlaylistId: string | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
}

export type SortOption = 'newest' | 'duration' | 'title';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
