import { Track } from '../types';

// Generate placeholder cover image URLs using picsum.photos with consistent seeds
const getCoverUrl = (id: number): string => 
  `https://picsum.photos/seed/track${id}/300/300`;

export const mockTracks: Track[] = [
  {
    id: 'track-001',
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    album: 'Nocturnal',
    durationSec: 234,
    coverImageUrl: getCoverUrl(1),
    genre: 'Pop',
    year: 2024
  },
  {
    id: 'track-002',
    title: 'Electric Soul',
    artist: 'Neon Pulse',
    album: 'Synthetic Hearts',
    durationSec: 198,
    coverImageUrl: getCoverUrl(2),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-003',
    title: 'Summer Breeze',
    artist: 'The Coastlines',
    album: 'Beach Days',
    durationSec: 267,
    coverImageUrl: getCoverUrl(3),
    genre: 'Indie',
    year: 2023
  },
  {
    id: 'track-004',
    title: 'City Lights',
    artist: 'Metro Sound',
    album: 'Urban Stories',
    durationSec: 312,
    coverImageUrl: getCoverUrl(4),
    genre: 'Hip-Hop',
    year: 2024
  },
  {
    id: 'track-005',
    title: 'Velvet Sky',
    artist: 'Aurora Dreams',
    album: 'Celestial',
    durationSec: 289,
    coverImageUrl: getCoverUrl(5),
    genre: 'R&B',
    year: 2023
  },
  {
    id: 'track-006',
    title: 'Thunder Road',
    artist: 'Steel Horses',
    album: 'Highway Anthem',
    durationSec: 245,
    coverImageUrl: getCoverUrl(6),
    genre: 'Rock',
    year: 2022
  },
  {
    id: 'track-007',
    title: 'Smooth Jazz Cafe',
    artist: 'Miles Beyond',
    album: 'Late Night Sessions',
    durationSec: 356,
    coverImageUrl: getCoverUrl(7),
    genre: 'Jazz',
    year: 2024
  },
  {
    id: 'track-008',
    title: 'Neon Nights',
    artist: 'Synthwave Collective',
    album: 'Retro Future',
    durationSec: 223,
    coverImageUrl: getCoverUrl(8),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-009',
    title: 'Golden Hour',
    artist: 'Sunset Riders',
    album: 'Western Skies',
    durationSec: 278,
    coverImageUrl: getCoverUrl(9),
    genre: 'Country',
    year: 2023
  },
  {
    id: 'track-010',
    title: 'Moonlight Sonata Remix',
    artist: 'Classical Beats',
    album: 'Modern Classics',
    durationSec: 412,
    coverImageUrl: getCoverUrl(10),
    genre: 'Classical',
    year: 2024
  },
  {
    id: 'track-011',
    title: 'Breaking Chains',
    artist: 'Iron Forge',
    album: 'Metal Storm',
    durationSec: 298,
    coverImageUrl: getCoverUrl(11),
    genre: 'Metal',
    year: 2023
  },
  {
    id: 'track-012',
    title: 'Dance Floor Magic',
    artist: 'DJ Sparkle',
    album: 'Club Anthems Vol. 3',
    durationSec: 187,
    coverImageUrl: getCoverUrl(12),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-013',
    title: 'Heartbeat',
    artist: 'Pulse',
    album: 'Alive',
    durationSec: 215,
    coverImageUrl: getCoverUrl(13),
    genre: 'Pop',
    year: 2024
  },
  {
    id: 'track-014',
    title: 'Lost in Tokyo',
    artist: 'Neon District',
    album: 'Eastern Lights',
    durationSec: 334,
    coverImageUrl: getCoverUrl(14),
    genre: 'Electronic',
    year: 2023
  },
  {
    id: 'track-015',
    title: 'River Flow',
    artist: 'Nature Sounds',
    album: 'Ambient Earth',
    durationSec: 456,
    coverImageUrl: getCoverUrl(15),
    genre: 'Classical',
    year: 2022
  },
  {
    id: 'track-016',
    title: 'Street Wisdom',
    artist: 'Urban Poet',
    album: 'Concrete Jungle',
    durationSec: 267,
    coverImageUrl: getCoverUrl(16),
    genre: 'Hip-Hop',
    year: 2024
  },
  {
    id: 'track-017',
    title: 'Starlight',
    artist: 'Cosmic Voyage',
    album: 'Galaxy Dreams',
    durationSec: 301,
    coverImageUrl: getCoverUrl(17),
    genre: 'Pop',
    year: 2024
  },
  {
    id: 'track-018',
    title: 'Blue Monday',
    artist: 'The Melancholics',
    album: 'Shades of Blue',
    durationSec: 289,
    coverImageUrl: getCoverUrl(18),
    genre: 'Indie',
    year: 2023
  },
  {
    id: 'track-019',
    title: 'Fire Dance',
    artist: 'Tribal Echo',
    album: 'World Rhythms',
    durationSec: 198,
    coverImageUrl: getCoverUrl(19),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-020',
    title: 'Mountain High',
    artist: 'Alpine Sound',
    album: 'Peak Experience',
    durationSec: 245,
    coverImageUrl: getCoverUrl(20),
    genre: 'Rock',
    year: 2022
  },
  {
    id: 'track-021',
    title: 'Soulful Morning',
    artist: 'Rhythm & Grace',
    album: 'New Day',
    durationSec: 312,
    coverImageUrl: getCoverUrl(21),
    genre: 'R&B',
    year: 2024
  },
  {
    id: 'track-022',
    title: 'Desert Wind',
    artist: 'Sandstorm',
    album: 'Sahara Nights',
    durationSec: 378,
    coverImageUrl: getCoverUrl(22),
    genre: 'Electronic',
    year: 2023
  },
  {
    id: 'track-023',
    title: 'Piano Dreams',
    artist: 'Ivory Keys',
    album: 'Solo Sessions',
    durationSec: 423,
    coverImageUrl: getCoverUrl(23),
    genre: 'Classical',
    year: 2024
  },
  {
    id: 'track-024',
    title: 'Revolution',
    artist: 'Rage Against',
    album: 'Rise Up',
    durationSec: 256,
    coverImageUrl: getCoverUrl(24),
    genre: 'Metal',
    year: 2023
  },
  {
    id: 'track-025',
    title: 'Country Roads',
    artist: 'Dusty Boots',
    album: 'Homeward Bound',
    durationSec: 287,
    coverImageUrl: getCoverUrl(25),
    genre: 'Country',
    year: 2022
  },
  {
    id: 'track-026',
    title: 'Saxophone Blues',
    artist: 'Jazz Quartet',
    album: 'Smoky Room',
    durationSec: 398,
    coverImageUrl: getCoverUrl(26),
    genre: 'Jazz',
    year: 2024
  },
  {
    id: 'track-027',
    title: 'Euphoria',
    artist: 'Festival Sound',
    album: 'Main Stage',
    durationSec: 212,
    coverImageUrl: getCoverUrl(27),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-028',
    title: 'Whisper',
    artist: 'Silent Echo',
    album: 'Quiet Moments',
    durationSec: 267,
    coverImageUrl: getCoverUrl(28),
    genre: 'Indie',
    year: 2023
  },
  {
    id: 'track-029',
    title: 'Bass Drop',
    artist: 'Low Frequency',
    album: 'Sub Culture',
    durationSec: 189,
    coverImageUrl: getCoverUrl(29),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-030',
    title: 'Sunrise Melody',
    artist: 'Morning Star',
    album: 'Dawn Chorus',
    durationSec: 298,
    coverImageUrl: getCoverUrl(30),
    genre: 'Pop',
    year: 2024
  },
  {
    id: 'track-031',
    title: 'Heavy Metal Thunder',
    artist: 'Dark Legion',
    album: 'Storm Riders',
    durationSec: 334,
    coverImageUrl: getCoverUrl(31),
    genre: 'Metal',
    year: 2023
  },
  {
    id: 'track-032',
    title: 'Love Song',
    artist: 'Heart Strings',
    album: 'Romance',
    durationSec: 245,
    coverImageUrl: getCoverUrl(32),
    genre: 'R&B',
    year: 2024
  },
  {
    id: 'track-033',
    title: 'Freestyle Flow',
    artist: 'MC Thunder',
    album: 'Street Poetry',
    durationSec: 223,
    coverImageUrl: getCoverUrl(33),
    genre: 'Hip-Hop',
    year: 2024
  },
  {
    id: 'track-034',
    title: 'Acoustic Sunset',
    artist: 'Guitar Hero',
    album: 'Unplugged',
    durationSec: 312,
    coverImageUrl: getCoverUrl(34),
    genre: 'Rock',
    year: 2022
  },
  {
    id: 'track-035',
    title: 'Latin Heat',
    artist: 'Fuego',
    album: 'Salsa Nights',
    durationSec: 198,
    coverImageUrl: getCoverUrl(35),
    genre: 'Pop',
    year: 2024
  },
  {
    id: 'track-036',
    title: 'Chill Vibes',
    artist: 'Lounge Act',
    album: 'Relaxation',
    durationSec: 378,
    coverImageUrl: getCoverUrl(36),
    genre: 'Jazz',
    year: 2023
  },
  {
    id: 'track-037',
    title: 'Power Ballad',
    artist: 'Rock Legends',
    album: 'Greatest Hits',
    durationSec: 356,
    coverImageUrl: getCoverUrl(37),
    genre: 'Rock',
    year: 2021
  },
  {
    id: 'track-038',
    title: 'Digital Love',
    artist: 'Cyber Hearts',
    album: 'Virtual Reality',
    durationSec: 234,
    coverImageUrl: getCoverUrl(38),
    genre: 'Electronic',
    year: 2024
  },
  {
    id: 'track-039',
    title: 'Nashville Nights',
    artist: 'Country Stars',
    album: 'Honky Tonk',
    durationSec: 267,
    coverImageUrl: getCoverUrl(39),
    genre: 'Country',
    year: 2023
  },
  {
    id: 'track-040',
    title: 'Symphony No. 5 Redux',
    artist: 'Orchestra Modern',
    album: 'Classical Reimagined',
    durationSec: 489,
    coverImageUrl: getCoverUrl(40),
    genre: 'Classical',
    year: 2024
  },
  {
    id: 'track-041',
    title: 'Indie Summer',
    artist: 'The Wanderers',
    album: 'Road Trip',
    durationSec: 245,
    coverImageUrl: getCoverUrl(41),
    genre: 'Indie',
    year: 2024
  },
  {
    id: 'track-042',
    title: 'Trap Kingdom',
    artist: 'Beat Master',
    album: 'Crown',
    durationSec: 198,
    coverImageUrl: getCoverUrl(42),
    genre: 'Hip-Hop',
    year: 2024
  },
  {
    id: 'track-043',
    title: 'Ocean Waves',
    artist: 'Ambient Dreams',
    album: 'Serenity',
    durationSec: 412,
    coverImageUrl: getCoverUrl(43),
    genre: 'Classical',
    year: 2023
  },
  {
    id: 'track-044',
    title: 'Rock Anthem',
    artist: 'Stadium Sound',
    album: 'Live Forever',
    durationSec: 289,
    coverImageUrl: getCoverUrl(44),
    genre: 'Rock',
    year: 2022
  },
  {
    id: 'track-045',
    title: 'Smooth Operator',
    artist: 'Velvet Voice',
    album: 'Silky Smooth',
    durationSec: 278,
    coverImageUrl: getCoverUrl(45),
    genre: 'R&B',
    year: 2024
  }
];

// Helper to get track by ID
export const getTrackById = (id: string): Track | undefined => 
  mockTracks.find(track => track.id === id);

// Helper to get multiple tracks by IDs
export const getTracksByIds = (ids: string[]): Track[] => 
  ids.map(id => getTrackById(id)).filter((track): track is Track => track !== undefined);

// Get all unique genres from tracks
export const getAllGenres = (): string[] => 
  [...new Set(mockTracks.map(track => track.genre))].sort();
