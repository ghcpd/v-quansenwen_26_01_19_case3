# 🎵 Music Playlist Builder

A modern, feature-rich music playlist management web application built with React, TypeScript, and Vite. This MVP allows users to browse a music library, create and manage playlists, reorder tracks, and enjoy a simulated playback experience.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Component Breakdown](#component-breakdown)
- [Testing Checklist](#testing-checklist)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

### What It Does

Music Playlist Builder is a single-page application (SPA) that provides a complete music management experience:

- Browse a library of 45 curated tracks with rich metadata
- Search and filter tracks by title, artist, or genre
- Sort tracks by newest, duration, or alphabetically
- Create unlimited playlists with custom names
- Add/remove tracks from playlists
- Reorder tracks within playlists using up/down controls
- Play tracks with a simulated player featuring play/pause, progress tracking, and next/previous controls
- Persistent state using browser localStorage

### MVP Scope

**Included:**
- Complete front-end implementation with no backend
- Mock data with 45 diverse tracks across multiple genres
- Full playlist CRUD operations
- Track reordering functionality
- Simulated audio player with progress tracking
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- localStorage persistence

**Not Included (Non-Goals):**
- Real audio playback (simulated only)
- User authentication or multi-user support
- Backend API or database
- Cloud storage or sync
- Social sharing features
- Advanced audio features (equalizer, effects, etc.)

---

## ✨ Features

### Core Features

1. **Music Library**
   - 45 pre-loaded tracks with complete metadata
   - Real cover images from Unsplash
   - Search by track title or artist name
   - Filter by 20+ music genres
   - Sort by: newest (year), duration, or title (A-Z)
   - Empty state handling for no results

2. **Playlist Management**
   - Create playlists with custom names (validation included)
   - Rename existing playlists
   - Delete playlists with confirmation dialog
   - View track count and total duration per playlist
   - Visual grid layout with album art preview
   - Empty state for new playlists

3. **Playlist Details**
   - View all tracks in a playlist
   - Reorder tracks using up/down arrow buttons
   - Remove tracks from playlist
   - Play entire playlist from first track
   - Display total track count and duration
   - Navigate back to playlists or library

4. **Simulated Player**
   - Global player bar at bottom of screen
   - Play/pause toggle with visual feedback
   - Progress bar with click-to-seek functionality
   - Current time and total duration display
   - Next/Previous track navigation (when in playlist context)
   - Auto-advance to next track when current finishes
   - Persistent player state across page navigation
   - Active track indication in library and playlist views

5. **User Experience**
   - Toast notifications for all key actions
   - Modal dialogs for create/rename/delete operations
   - Hover effects and smooth transitions
   - Loading states and empty states
   - Keyboard navigation support
   - Focus indicators for accessibility

### Nice-to-Have Future Features

- Drag-and-drop track reordering
- Bulk operations (add multiple tracks, delete multiple playlists)
- Playlist duplication
- Track favorites/likes system
- Recently played history
- Shuffle and repeat modes
- Volume control
- Keyboard shortcuts (spacebar to play/pause, arrow keys for navigation)
- Export/import playlists as JSON
- Dark/light theme toggle (currently auto-detects system preference)
- Search within playlists
- Advanced filters (year range, duration range)

---

## 🛠️ Tech Stack

### Core Technologies

- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety and better DX
- **Vite 5.0** - Fast build tool and dev server
- **React Router 6.21** - Client-side routing

### Styling & UI

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### State Management

- **React Context API** - Global state management
- **React Hooks** - Local state and side effects
- **localStorage** - Data persistence

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting

---

## 📁 Project Structure

```
music-playlist-builder/
├── node_modules/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Modal.tsx        # Modal dialog wrapper
│   │   ├── Navigation.tsx   # Top navigation bar
│   │   ├── NowPlayingBar.tsx # Global player UI
│   │   ├── PlaylistCard.tsx # Playlist grid item
│   │   ├── SearchBar.tsx    # Search input component
│   │   ├── ToastContainer.tsx # Toast notifications
│   │   └── TrackCard.tsx    # Track list item
│   ├── context/             # React Context providers
│   │   ├── MusicLibraryContext.tsx # Library, search, filter state
│   │   ├── PlaylistContext.tsx     # Playlist CRUD operations
│   │   ├── PlayerContext.tsx       # Player state and controls
│   │   └── ToastContext.tsx        # Toast notifications
│   ├── data/                # Static data
│   │   └── mockTracks.ts    # 45 mock music tracks
│   ├── pages/               # Page components
│   │   ├── LibraryPage.tsx        # Music library view
│   │   ├── PlaylistsPage.tsx      # All playlists grid
│   │   └── PlaylistDetailPage.tsx # Single playlist view
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind imports & custom CSS
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Track, Playlist, PlayerState types
│   ├── utils/               # Helper functions
│   │   └── helpers.ts       # Formatting & utility functions
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # App entry point
│   └── vite-env.d.ts        # Vite type declarations
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Step-by-Step Instructions

1. **Navigate to the project directory**
   ```bash
   cd "c:\Users\v-quansenwen\work\UI\new-0119\Claude-sonnet-4.5"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in the terminal

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

6. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

## 📖 Usage Guide

### Browsing the Library

1. Navigate to the **Library** page (home page)
2. Use the search bar to find tracks by title or artist
3. Filter by genre using the dropdown
4. Sort tracks using the sort dropdown (newest, duration, title)
5. Click the play button on any track to start playback
6. Click the + button to add a track to a playlist

### Managing Playlists

1. Navigate to the **Playlists** page
2. Click **"Create Playlist"** button
3. Enter a playlist name and confirm
4. Click on a playlist card to view details
5. Use **Rename** or **Delete** buttons on hover
6. Delete confirmation prevents accidental deletions

### Working with Playlist Details

1. Click on any playlist to open detail view
2. Click **"Play All"** to start from the first track
3. Use ↑/↓ arrow buttons to reorder tracks
4. Click the trash icon to remove a track
5. Click individual play buttons to start from that track
6. Navigate back using the browser or navigation bar

### Using the Player

1. Player appears at bottom when a track is playing
2. Click the progress bar to seek to any position
3. Use ⏮️ Previous / ⏭️ Next buttons to navigate (when in playlist)
4. ⏯️ Play/Pause button toggles playback
5. Current track displays with time remaining
6. Player persists across page navigation

---

## 🧩 Component Breakdown

### Context Providers

**MusicLibraryContext**
- Manages all tracks (mock data)
- Handles search query state
- Manages genre filter selection
- Controls sort option
- Provides filtered/sorted track list
- Extracts unique genres from tracks

**PlaylistContext**
- Stores all playlists in state
- CRUD operations for playlists
- Add/remove tracks from playlists
- Track reordering within playlists
- Prevents duplicate tracks in playlists
- Persists to localStorage

**PlayerContext**
- Current track and playlist ID
- Play/pause state
- Progress tracking with setInterval
- Next/Previous track logic
- Seek functionality
- Auto-advance when track ends
- Persists state to localStorage

**ToastContext**
- Queue of toast notifications
- Auto-dismiss after 3 seconds
- Success/error/info types
- Add/remove toast functions

### UI Components

**TrackCard** - Displays track info with play and add buttons
- Props: track, onPlay, onAddToPlaylist, isPlaying, showRemove, onRemove
- Shows: cover art, title, artist, album, genre, year, duration
- Hover actions: play/pause, add to playlist, or remove
- Visual indicator when currently playing

**PlaylistCard** - Grid item for playlists page
- Props: playlist, tracks, onDelete, onRename
- Shows: composite cover (4 track covers), name, track count, duration
- Hover actions: rename and delete buttons
- Links to playlist detail page

**SearchBar** - Text input with search icon and clear button
- Props: value, onChange, placeholder
- Features: icon, real-time search, clear button
- Fully accessible with ARIA labels

**Modal** - Reusable dialog component
- Props: isOpen, onClose, title, children
- Features: overlay click to close, close button, focus trap
- Used for: create/rename playlist, add to playlist, delete confirmation

**Navigation** - Top app bar with logo and links
- Shows: app logo/name, Library link, Playlists link
- Active state highlighting
- Responsive design

**NowPlayingBar** - Global player bar at bottom
- Shows: current track info, playback controls, progress
- Features: seekable progress bar, next/previous, time display
- Only visible when track is playing
- Responsive layout

**ToastContainer** - Fixed notification area
- Displays stacked toast messages
- Auto-dismisses after 3s
- Color-coded by type (success/error/info)
- Slide-in animation

### Page Components

**LibraryPage**
- Full music library with search, filter, sort
- Add to playlist modal
- Empty state for no results
- Track list with play and add actions

**PlaylistsPage**
- Grid of all playlists
- Create playlist modal
- Rename/delete functionality
- Empty state with CTA

**PlaylistDetailPage**
- Single playlist view
- Track list with reorder controls
- Play all button
- Remove track functionality
- Empty state with link to library

---

## ✅ Testing Checklist

### Manual Test Steps

**Library Page**
- [ ] Search finds tracks by title
- [ ] Search finds tracks by artist
- [ ] Genre filter shows only selected genre tracks
- [ ] "All" genre shows all tracks
- [ ] Sort by newest orders by year (descending)
- [ ] Sort by duration orders by length (descending)
- [ ] Sort by title orders alphabetically (A-Z)
- [ ] Empty state shows when no search results
- [ ] Play button starts playback
- [ ] Add button opens playlist selection modal
- [ ] Can add track to playlist from modal

**Playlists Page**
- [ ] Create playlist button opens modal
- [ ] Can create playlist with valid name
- [ ] Empty playlist name is rejected
- [ ] New playlist appears in grid
- [ ] Playlist shows track count (0 initially)
- [ ] Clicking playlist navigates to detail
- [ ] Rename button opens modal with current name
- [ ] Can rename playlist successfully
- [ ] Delete button shows confirmation
- [ ] Can delete playlist
- [ ] Empty state shows when no playlists

**Playlist Detail Page**
- [ ] Shows correct playlist name and stats
- [ ] Shows all tracks in playlist
- [ ] Play All button starts first track
- [ ] Up arrow moves track up
- [ ] Down arrow moves track down
- [ ] First track up button is disabled
- [ ] Last track down button is disabled
- [ ] Remove button deletes track from playlist
- [ ] Empty state shows when no tracks
- [ ] Empty state link goes to library

**Player**
- [ ] Player appears when track plays
- [ ] Play/pause button toggles correctly
- [ ] Progress bar advances during playback
- [ ] Clicking progress bar seeks correctly
- [ ] Current time updates every second
- [ ] Track auto-advances to next in playlist
- [ ] Previous button goes to previous track
- [ ] Next button goes to next track
- [ ] Previous disabled on first track
- [ ] Next disabled on last track
- [ ] Player persists across page navigation
- [ ] Deleting current playlist stops playback

**Data Persistence**
- [ ] Created playlists persist after refresh
- [ ] Playlist tracks persist after refresh
- [ ] Track order persists after refresh
- [ ] Last played track shows after refresh (but not playing)

**UI/UX**
- [ ] All buttons have hover effects
- [ ] Toast appears for create/rename/delete
- [ ] Toast appears for add track success
- [ ] Toast appears for duplicate track error
- [ ] Modals close on overlay click
- [ ] Modals close on close button
- [ ] Enter key submits forms in modals
- [ ] Focus styles visible when tabbing
- [ ] Responsive on mobile (320px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)

---

## 🔮 Future Enhancements

### Priority 1 (High Value)
- Drag-and-drop track reordering (more intuitive than arrows)
- Shuffle and repeat modes in player
- Keyboard shortcuts (space for play/pause, arrows for next/prev)
- Dark/light theme toggle (manual override)

### Priority 2 (Medium Value)
- Track favorites system
- Recently played history
- Playlist duplication feature
- Search within playlist
- Export/import playlists (JSON)

### Priority 3 (Nice to Have)
- Volume control slider
- Visualizer or waveform animation
- Playlist cover image customization
- Multi-select for bulk operations
- Advanced filters (year range, BPM, mood)
- Lyrics display (mock)
- Queue management

### Technical Improvements
- Unit tests with Vitest
- E2E tests with Playwright
- Component storybook
- Performance optimization (virtualization for large lists)
- PWA support (offline mode)
- Accessibility audit and improvements

---

## 📄 License

This is a demo project created for educational purposes.

---

## 🙏 Credits

- **Cover Images**: [Unsplash](https://unsplash.com)
- **Icons**: Heroicons (via Tailwind CSS)
- **Fonts**: System fonts for optimal performance

---

## 📧 Contact

For questions or feedback about this project, please create an issue in the repository.

---

**Built with ❤️ using React + TypeScript + Vite**
