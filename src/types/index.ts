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
  createdAt: string;
}

export interface PlayerState {
  playlistId: string | null;
  trackId: string | null;
  isPlaying: boolean;
  progressSec: number;
}
