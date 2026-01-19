import { useState, useMemo } from 'react';
import { Library, SearchX } from 'lucide-react';
import { SearchBar, FilterBar, TrackCard, EmptyState } from '../components';
import { mockTracks } from '../data/mockTracks';
import { useDebounce } from '../hooks';
import { Genre, SortOption } from '../types';

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('title');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredTracks = useMemo(() => {
    let tracks = [...mockTracks];

    // Filter by search query
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      tracks = tracks.filter(
        track =>
          track.title.toLowerCase().includes(query) ||
          track.artist.toLowerCase().includes(query)
      );
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      tracks = tracks.filter(track => track.genre === selectedGenre);
    }

    // Sort
    switch (sortBy) {
      case 'title':
        tracks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        tracks.sort((a, b) => b.year - a.year);
        break;
      case 'duration':
        tracks.sort((a, b) => a.durationSec - b.durationSec);
        break;
    }

    return tracks;
  }, [debouncedSearch, selectedGenre, sortBy]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Library className="w-8 h-8 text-primary-500" />
          <h1 className="text-3xl font-bold text-white">Music Library</h1>
        </div>
        <p className="text-surface-400">
          Browse {mockTracks.length} tracks and add them to your playlists
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title or artist..."
        />
        <FilterBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-surface-400">
          {filteredTracks.length === mockTracks.length
            ? `${mockTracks.length} tracks`
            : `${filteredTracks.length} of ${mockTracks.length} tracks`}
        </p>
      </div>

      {/* Track List */}
      {filteredTracks.length > 0 ? (
        <div className="space-y-2">
          {filteredTracks.map(track => (
            <TrackCard key={track.id} track={track} showAddToPlaylist />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="w-full h-full" />}
          title="No tracks found"
          description={
            debouncedSearch
              ? `No tracks match "${debouncedSearch}". Try a different search term.`
              : 'No tracks match the selected filters.'
          }
          action={
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 
                         hover:bg-primary-500 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          }
        />
      )}
    </div>
  );
}
