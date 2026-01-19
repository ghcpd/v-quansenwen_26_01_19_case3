import { NavLink } from 'react-router-dom';
import { Library, ListMusic, Disc3 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface-900/95 backdrop-blur-sm border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Disc3 className="w-8 h-8 text-primary-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-xl font-bold text-white hidden sm:inline">MusicBox</span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                 ${isActive 
                   ? 'bg-primary-600 text-white' 
                   : 'text-surface-300 hover:text-white hover:bg-surface-800'}`
              }
            >
              <Library className="w-5 h-5" />
              <span className="hidden sm:inline">Library</span>
            </NavLink>
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                 ${isActive 
                   ? 'bg-primary-600 text-white' 
                   : 'text-surface-300 hover:text-white hover:bg-surface-800'}`
              }
            >
              <ListMusic className="w-5 h-5" />
              <span className="hidden sm:inline">Playlists</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
