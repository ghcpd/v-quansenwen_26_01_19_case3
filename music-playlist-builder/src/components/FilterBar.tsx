import { Genre, SortOption } from '../types';
import { getAllGenres } from '../data/mockTracks';

interface FilterBarProps {
  selectedGenre: Genre | 'all';
  onGenreChange: (genre: Genre | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function FilterBar({ selectedGenre, onGenreChange, sortBy, onSortChange }: FilterBarProps) {
  const genres = getAllGenres();

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[150px]">
        <label htmlFor="genre-filter" className="block text-sm font-medium text-surface-300 mb-1">
          Genre
        </label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value as Genre | 'all')}
          className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                     focus:border-transparent cursor-pointer"
        >
          <option value="all">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[150px]">
        <label htmlFor="sort-by" className="block text-sm font-medium text-surface-300 mb-1">
          Sort By
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-primary-500 
                     focus:border-transparent cursor-pointer"
        >
          <option value="title">Title (A-Z)</option>
          <option value="newest">Newest First</option>
          <option value="duration">Duration</option>
        </select>
      </div>
    </div>
  );
}
