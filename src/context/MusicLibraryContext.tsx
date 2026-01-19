import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Track, SortOption } from '../types';
import { mockTracks } from '../data/mockTracks';

interface MusicLibraryContextType {
  tracks: Track[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  filteredTracks: Track[];
  genres: string[];
}

const MusicLibraryContext = createContext<MusicLibraryContextType | undefined>(undefined);

export const useMusicLibrary = () => {
  const context = useContext(MusicLibraryContext);
  if (!context) {
    throw new Error('useMusicLibrary must be used within MusicLibraryProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const MusicLibraryProvider: React.FC<Props> = ({ children }) => {
  const [tracks] = useState<Track[]>(mockTracks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const genres = ['All', ...Array.from(new Set(tracks.map(t => t.genre)))];

  const filteredTracks = React.useMemo(() => {
    let result = [...tracks];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        track =>
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query)
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(track => track.genre === selectedGenre);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.year - a.year;
        case 'duration':
          return b.durationSec - a.durationSec;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [tracks, searchQuery, selectedGenre, sortBy]);

  return (
    <MusicLibraryContext.Provider
      value={{
        tracks,
        searchQuery,
        setSearchQuery,
        selectedGenre,
        setSelectedGenre,
        sortBy,
        setSortBy,
        filteredTracks,
        genres,
      }}
    >
      {children}
    </MusicLibraryContext.Provider>
  );
};
