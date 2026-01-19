# Project Documentation

## 1. Product Requirements

### Core Concept
Music Playlist Builder is a web application that allows users to manage music playlists with a simulated playback experience.

### Target Users
- Music enthusiasts who want to organize their music
- Users who need a demo/prototype of a music player
- Developers learning React + TypeScript patterns

### Key User Flows

**Flow 1: Browse and Play Music**
1. User lands on Library page
2. User searches for a song or filters by genre
3. User clicks play on a track
4. Player bar appears at bottom with track playing
5. User can pause, seek, or skip tracks

**Flow 2: Create and Manage Playlist**
1. User navigates to Playlists page
2. User clicks "Create Playlist"
3. User enters playlist name and confirms
4. User goes back to Library
5. User adds tracks to the new playlist
6. User navigates to playlist detail to see added tracks

**Flow 3: Organize Playlist**
1. User opens a playlist detail page
2. User reorders tracks using up/down buttons
3. User removes unwanted tracks
4. User plays the entire playlist
5. Changes persist automatically

---

## 2. Feature List

### Implemented Features

#### Music Library
- ✅ 45 diverse mock tracks with complete metadata
- ✅ Search by track title or artist name
- ✅ Filter by genre (20+ genres)
- ✅ Sort by newest, duration, or title
- ✅ Add tracks to playlists
- ✅ Play individual tracks
- ✅ Empty state for no results

#### Playlist Management
- ✅ Create unlimited playlists
- ✅ Rename playlists
- ✅ Delete playlists with confirmation
- ✅ View track count and total duration
- ✅ Visual grid layout
- ✅ Empty states

#### Playlist Detail
- ✅ View all tracks in playlist
- ✅ Reorder tracks (up/down arrows)
- ✅ Remove tracks
- ✅ Play entire playlist
- ✅ Navigate between tracks
- ✅ Display statistics

#### Player (Simulated)
- ✅ Play/pause toggle
- ✅ Progress bar with seek
- ✅ Next/previous track
- ✅ Time display (current/total)
- ✅ Auto-advance to next track
- ✅ Visual playback indicator
- ✅ Persistent state

#### Data & State
- ✅ localStorage persistence
- ✅ Context-based state management
- ✅ No backend required
- ✅ Mock data included

#### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Hover effects
- ✅ Loading/empty states
- ✅ Keyboard accessibility
- ✅ Focus indicators

### Future Features

#### Short Term
- 🔲 Drag-and-drop reordering
- 🔲 Keyboard shortcuts
- 🔲 Shuffle mode
- 🔲 Repeat mode
- 🔲 Volume control
- 🔲 Dark/light theme toggle

#### Medium Term
- 🔲 Favorites system
- 🔲 Recently played
- 🔲 Playlist duplication
- 🔲 Search in playlist
- 🔲 Export/import playlists
- 🔲 Bulk operations

#### Long Term
- 🔲 Real audio playback (Web Audio API)
- 🔲 User accounts & sync
- 🔲 Social features (share playlists)
- 🔲 Music recommendations
- 🔲 Lyrics integration
- 🔲 Advanced filters

---

## 3. Page-by-Page Breakdown

### Library Page (`/`)

**Purpose**: Browse and search the complete music library

**Layout**:
- Top: Search bar, genre filter, sort dropdown
- Main: Scrollable list of all tracks (or filtered results)
- Bottom: Player bar (when playing)

**Interactions**:
- Type in search → filters tracks in real-time
- Select genre → shows only that genre
- Select sort option → reorders tracks
- Click play on track → starts playback
- Click add (+) on track → opens "Add to Playlist" modal
- Select playlist in modal → adds track and shows toast

**State**:
- Search query
- Selected genre
- Sort option
- Filtered tracks list

**Empty States**:
- "No tracks found" when search/filter yields no results

---

### Playlists Page (`/playlists`)

**Purpose**: View all playlists and manage them

**Layout**:
- Top: Title and "Create Playlist" button
- Main: Grid of playlist cards (responsive)
- Bottom: Player bar (when playing)

**Interactions**:
- Click "Create Playlist" → opens modal
- Enter name and submit → creates playlist and shows toast
- Click playlist card → navigates to detail page
- Click "Rename" on hover → opens rename modal
- Click "Delete" on hover → opens confirmation modal
- Confirm delete → removes playlist and shows toast

**State**:
- List of all playlists
- Modal states (create, rename, delete)
- Selected playlist ID

**Empty States**:
- "No playlists yet" with CTA to create first playlist

---

### Playlist Detail Page (`/playlist/:id`)

**Purpose**: View and manage tracks within a specific playlist

**Layout**:
- Top: Large playlist header with cover art, name, stats, "Play All" button
- Main: List of tracks with reorder controls
- Bottom: Player bar (when playing)

**Interactions**:
- Click "Play All" → plays first track in playlist
- Click play on individual track → plays that track
- Click up arrow → moves track up one position
- Click down arrow → moves track down one position
- Click remove icon → removes track from playlist
- Changes save automatically to localStorage

**State**:
- Current playlist data
- Playlist tracks (ordered)
- Track positions

**Empty States**:
- "No tracks in this playlist" with link to Library

**Edge Cases**:
- If playlist deleted while on this page → redirect to /playlists
- First track: up button disabled
- Last track: down button disabled

---

## 4. Component Breakdown

### Core UI Components

**TrackCard**
- **Purpose**: Display a single track with actions
- **Props**: track, onPlay, onAddToPlaylist, isPlaying, showRemove, onRemove
- **Features**: Cover art, metadata, hover actions, playing indicator
- **Used In**: LibraryPage, PlaylistDetailPage

**PlaylistCard**
- **Purpose**: Display playlist in grid view
- **Props**: playlist, tracks, onDelete, onRename
- **Features**: Composite cover, stats, hover actions
- **Used In**: PlaylistsPage

**SearchBar**
- **Purpose**: Text search input
- **Props**: value, onChange, placeholder
- **Features**: Icon, clear button, real-time filtering
- **Used In**: LibraryPage

**Modal**
- **Purpose**: Reusable dialog wrapper
- **Props**: isOpen, onClose, title, children
- **Features**: Overlay, close button, escape key support
- **Used In**: All pages (create/rename/delete/add dialogs)

**Navigation**
- **Purpose**: Top app navigation
- **Props**: None (uses router for active state)
- **Features**: Logo, links, active highlighting
- **Used In**: App.tsx (global)

**NowPlayingBar**
- **Purpose**: Global music player
- **Props**: None (uses PlayerContext)
- **Features**: Controls, progress bar, track info
- **Used In**: App.tsx (global)

**ToastContainer**
- **Purpose**: Notification system
- **Props**: None (uses ToastContext)
- **Features**: Stacked toasts, auto-dismiss, animations
- **Used In**: App.tsx (global)

### Context Providers

**MusicLibraryContext**
- **State**: tracks, searchQuery, selectedGenre, sortBy
- **Methods**: setSearchQuery, setSelectedGenre, setSortBy
- **Computed**: filteredTracks, genres
- **Persistence**: None (static mock data)

**PlaylistContext**
- **State**: playlists
- **Methods**: createPlaylist, deletePlaylist, renamePlaylist, addTrackToPlaylist, removeTrackFromPlaylist, reorderTrack, getPlaylistById, getPlaylistTracks
- **Persistence**: localStorage

**PlayerContext**
- **State**: currentTrack, currentPlaylistId, isPlaying, currentTime, volume, currentPlaylistTracks
- **Methods**: playTrack, togglePlayPause, nextTrack, previousTrack, seek, stopPlayback
- **Side Effects**: setInterval for progress tracking
- **Persistence**: localStorage (partial - currentTrack persists but isPlaying resets to false)

**ToastContext**
- **State**: toasts array
- **Methods**: showToast, removeToast
- **Side Effects**: Auto-dismiss after 3s
- **Persistence**: None

---

## 5. Data Models

### Track
```typescript
interface Track {
  id: string;           // Unique identifier
  title: string;        // Track name
  artist: string;       // Artist name
  album: string;        // Album name
  durationSec: number;  // Length in seconds
  coverImageUrl: string;// Album art URL
  genre: string;        // Music genre
  year: number;         // Release year
}
```

### Playlist
```typescript
interface Playlist {
  id: string;          // Unique identifier
  name: string;        // Playlist name
  trackIds: string[];  // Ordered array of track IDs
  createdAt: number;   // Unix timestamp
}
```

### PlayerState
```typescript
interface PlayerState {
  currentTrack: Track | null;      // Currently playing track
  currentPlaylistId: string | null;// Active playlist context
  isPlaying: boolean;              // Playback state
  currentTime: number;             // Progress in seconds
  volume: number;                  // Volume level (0-100)
}
```

---

## 6. Technical Architecture

### State Management Strategy

**Global State (Context)**:
- Music library data and filters
- All playlists
- Player state
- Toast notifications

**Local State (useState)**:
- Modal open/close states
- Form inputs (playlist names)
- Selected items for operations

**Persistence Strategy**:
- Playlists → localStorage (`music-playlists`)
- Player state → localStorage (`music-player-state`)
- Library filters → session only (not persisted)

### Component Communication

```
App
├── Contexts (wrap everything)
│   ├── ToastContext
│   ├── MusicLibraryContext
│   ├── PlaylistContext
│   └── PlayerContext
├── Navigation (reads router state)
├── Pages (read/write contexts)
│   ├── LibraryPage
│   ├── PlaylistsPage
│   └── PlaylistDetailPage
├── NowPlayingBar (reads PlayerContext)
└── ToastContainer (reads ToastContext)
```

### Routing Structure

```
/ → LibraryPage
/playlists → PlaylistsPage
/playlist/:id → PlaylistDetailPage
* → Redirect to /
```

---

## 7. Styling Approach

### Tailwind CSS Utility Classes
- Consistent spacing scale
- Responsive breakpoints (sm, md, lg, xl)
- Dark mode support (automatic based on system preference)
- Custom color palette (primary: blue)

### Custom CSS
- Smooth animations (slide-in for toasts)
- Custom scrollbar styling
- Focus styles for accessibility
- Hover transitions

### Responsive Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md/lg)
- Desktop: > 1024px (xl)

---

## 8. Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels on all buttons
- ✅ Keyboard navigation support
- ✅ Focus indicators (ring on tab)
- ✅ Color contrast compliance
- ✅ Screen reader friendly
- ✅ Skip links (implicit via nav)

---

## 9. Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (latest)

---

## 10. Performance Considerations

- Vite for fast dev server and builds
- React.memo for expensive components (not needed yet, small dataset)
- useMemo for filtered/sorted lists
- No virtualization needed (< 50 tracks)
- localStorage limited to ~5MB (plenty for this use case)
- Images loaded lazily by browser (native lazy loading)

---

## 11. Known Limitations

- No real audio playback (simulated only)
- localStorage can be cleared by user
- No multi-device sync
- Limited to ~5MB total data in localStorage
- Progress bar is mock (doesn't track real audio time)
- No offline support (needs initial load)
- Cover images require internet connection

---

## 12. Development Notes

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Functional components with hooks
- Named exports for components
- Interfaces for all data types

### Naming Conventions
- PascalCase for components and types
- camelCase for functions and variables
- SCREAMING_SNAKE_CASE for constants
- Descriptive names (no abbreviations)

### File Organization
- One component per file
- Colocate related files
- Index files for re-exports
- Absolute imports from src/

---

**Last Updated**: January 19, 2026
