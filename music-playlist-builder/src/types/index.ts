// Core entity types for the Music Playlist Builder

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationSec: number;
  coverImageUrl: string;
  genre: Genre;
  year: number;
}

export type Genre = 
  | 'Pop'
  | 'Rock'
  | 'Hip-Hop'
  | 'Electronic'
  | 'R&B'
  | 'Jazz'
  | 'Classical'
  | 'Country'
  | 'Indie'
  | 'Metal';

export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface PlayerState {
  currentTrackId: string | null;
  currentPlaylistId: string | null;
  isPlaying: boolean;
  progress: number; // 0-100 percentage
  volume: number; // 0-100
}

export type SortOption = 'newest' | 'duration' | 'title';

export interface LibraryFilters {
  searchQuery: string;
  genre: Genre | 'all';
  sortBy: SortOption;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
