import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" 
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-surface-800 border border-surface-700 rounded-lg 
                   text-white placeholder-surface-400 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-all duration-200"
        aria-label={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 
                     hover:text-white transition-colors p-1"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
