export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getTotalDuration = (tracks: { durationSec: number }[]): number => {
  return tracks.reduce((sum, track) => sum + track.durationSec, 0);
};
