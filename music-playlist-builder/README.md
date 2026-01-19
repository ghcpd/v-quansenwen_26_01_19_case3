# 🎵 Music Playlist Builder

A modern, responsive music playlist management web application built with React, TypeScript, and Tailwind CSS.

![Music Playlist Builder](https://picsum.photos/seed/musicbox/800/400)

---

## 📋 Project Overview

**Music Playlist Builder** is a front-end MVP that allows users to:
- Browse a music library with 45 mock tracks
- Create and manage multiple playlists
- Add/remove tracks from playlists
- Reorder tracks within a playlist
- Simulate music playback with a global Now Playing bar

### MVP Scope
✅ Music library browsing with search, filter, and sort  
✅ Playlist CRUD operations (Create, Rename, Delete)  
✅ Track management within playlists  
✅ Simulated playback with progress bar  
✅ Persistent state via localStorage  
✅ Responsive design for mobile and desktop  
✅ Toast notifications for user feedback  

### Non-Goals (Out of Scope)
❌ Real audio playback  
❌ User authentication  
❌ Backend API integration  
❌ Social features (sharing, following)  
❌ Music streaming services integration  

---

## ✨ Feature List

### Core Features
1. **Music Library**
   - 45 mock tracks with cover art, metadata
   - Search by title or artist
   - Filter by genre (10 genres)
   - Sort by: Title (A-Z), Newest, Duration

2. **Playlist Management**
   - Create playlists with custom names
   - Rename existing playlists
   - Delete playlists with confirmation
   - View track count and total duration

3. **Track Management**
   - Add tracks to any playlist
   - Prevent duplicate tracks in a playlist
   - Remove tracks from playlist
   - Reorder tracks with up/down buttons

4. **Simulated Player**
   - Play/Pause toggle
   - Progress bar with seek functionality
   - Next/Previous track navigation
   - Volume control with mute toggle
   - Time display (current / total)

5. **UX Enhancements**
   - Toast notifications for all actions
   - Empty states with helpful actions
   - Keyboard accessible
   - Responsive layout

### Future Nice-to-Have Features
- Drag-and-drop reordering
- Playlist cover customization
- Recently played history
- Favorites/Liked tracks
- Queue management
- Keyboard shortcuts
- Dark/Light theme toggle

---

## 📄 Page-by-Page Breakdown

### 1. Library Page (`/`)
- **Header**: Page title with track count
- **Search Bar**: Real-time search with debouncing
- **Filter Bar**: Genre dropdown + Sort dropdown
- **Track List**: Scrollable list of track cards
- **Track Card**: Cover, title, artist, genre badge, duration, add-to-playlist button

### 2. Playlists Page (`/playlists`)
- **Header**: Title + "New Playlist" button
- **Playlist Grid**: Responsive grid of playlist cards
- **Playlist Card**: Cover mosaic, name, track count, duration, play button, menu
- **Empty State**: Shown when no playlists exist

### 3. Playlist Detail Page (`/playlists/:playlistId`)
- **Back Button**: Navigate to playlists list
- **Header**: Cover art, playlist name, track count, duration, Play/Shuffle buttons
- **Track List**: Ordered list with reorder controls and remove button
- **Empty State**: Shown when playlist has no tracks

### 4. Now Playing Bar (Global)
- **Progress Bar**: Clickable seek bar at top
- **Track Info**: Cover thumbnail, title, artist
- **Controls**: Previous, Play/Pause, Next buttons
- **Time Display**: Current time / Total duration
- **Volume**: Mute button + slider

---

## 🧩 Component Breakdown

| Component | Responsibility |
|-----------|----------------|
| `Header` | Navigation bar with logo and nav links |
| `SearchBar` | Text input with search icon and clear button |
| `FilterBar` | Genre and sort dropdowns |
| `TrackCard` | Display track info with play and add-to-playlist actions |
| `PlaylistTrackCard` | Track card variant with reorder and remove controls |
| `PlaylistCard` | Playlist preview card with cover grid and menu |
| `NowPlayingBar` | Fixed bottom bar with playback controls |
| `Modal` | Reusable modal wrapper |
| `CreatePlaylistModal` | Form modal for creating/renaming playlists |
| `ConfirmModal` | Confirmation dialog for destructive actions |
| `EmptyState` | Placeholder for empty lists with CTA |
| `ToastContainer` | Container for toast notifications |

---

## 📁 Folder Structure

```
music-playlist-builder/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── EmptyState.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   ├── NowPlayingBar.tsx
│   │   ├── PlaylistCard.tsx
│   │   ├── PlaylistTrackCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── TrackCard.tsx
│   │   └── index.ts
│   ├── context/
│   │   ├── PlayerContext.tsx
│   │   ├── PlaylistContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── index.ts
│   ├── data/
│   │   └── mockTracks.ts
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── pages/
│   │   ├── LibraryPage.tsx
│   │   ├── PlaylistDetailPage.tsx
│   │   ├── PlaylistsPage.tsx
│   │   └── index.ts
│   ├── styles/
│   │   └── index.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Run Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd music-playlist-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## ✅ Quick Manual Test Checklist

### Library Page
- [ ] Page loads with 45 tracks displayed
- [ ] Search filters tracks by title/artist in real-time
- [ ] Genre filter shows only matching tracks
- [ ] Sort by title/newest/duration works correctly
- [ ] "No tracks found" empty state appears for invalid search
- [ ] Clear filters button resets all filters

### Playlist Management
- [ ] "New Playlist" button opens create modal
- [ ] Empty name shows validation error
- [ ] Playlist appears in grid after creation
- [ ] Toast notification confirms creation
- [ ] Rename playlist via menu updates name
- [ ] Delete playlist shows confirmation dialog
- [ ] Deleted playlist is removed from grid

### Track Management
- [ ] "+" button on track shows playlist menu
- [ ] Adding track shows success toast
- [ ] Adding duplicate shows "already in playlist" toast
- [ ] Playlist shows correct track count
- [ ] Playlist detail page shows all added tracks
- [ ] Up/Down buttons reorder tracks
- [ ] Remove button removes track with toast

### Playback Simulation
- [ ] Clicking play on track starts playback
- [ ] Now Playing bar shows current track info
- [ ] Play/Pause button toggles state
- [ ] Progress bar advances while playing
- [ ] Clicking progress bar seeks to position
- [ ] Next/Previous navigate within playlist
- [ ] Volume slider adjusts level
- [ ] Mute button toggles volume
- [ ] Deleting playing playlist stops playback

### Responsive Design
- [ ] Desktop layout (3-5 column grid)
- [ ] Tablet layout (2-3 column grid)
- [ ] Mobile layout (1-2 column grid)
- [ ] Navigation collapses to icons on mobile
- [ ] Now Playing bar adapts to mobile width

### Accessibility
- [ ] All buttons have visible focus states
- [ ] Form inputs are labeled
- [ ] Modals trap focus
- [ ] Escape key closes modals
- [ ] Screen reader announcements work

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| State | React Context + Hooks |
| Persistence | localStorage |

---

## 📝 License

This project is for educational and demonstration purposes only.

---

Built with ❤️ using React + TypeScript + Tailwind CSS
