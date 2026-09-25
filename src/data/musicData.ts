export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  cover: string;
  liked: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  owner: string;
  tracks: Track[];
  gradient: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  cover: string;
  year: number;
  tracks: Track[];
}

const generateCover = (seed: string, hue: number) => {
  return `https://picsum.photos/seed/${seed}/300/300`;
};

export const tracks: Track[] = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: 200, cover: generateCover('blinding', 280), liked: true },
  { id: '2', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: 203, cover: generateCover('levitating', 320), liked: false },
  { id: '3', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: 216, cover: generateCover('save', 200), liked: true },
  { id: '4', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', duration: 198, cover: generateCover('peaches', 30), liked: false },
  { id: '5', title: 'Kiss Me More', artist: 'Doja Cat', album: 'Planet Her', duration: 209, cover: generateCover('kiss', 340), liked: true },
  { id: '6', title: 'Stay', artist: 'The Kid LAROI', album: 'F*CK LOVE 3', duration: 141, cover: generateCover('stay', 180), liked: false },
  { id: '7', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', duration: 178, cover: generateCover('good4u', 270), liked: true },
  { id: '8', title: 'Montero', artist: 'Lil Nas X', album: 'MONTERO', duration: 137, cover: generateCover('montero', 50), liked: false },
  { id: '9', title: 'drivers license', artist: 'Olivia Rodrigo', album: 'SOUR', duration: 242, cover: generateCover('drivers', 220), liked: true },
  { id: '10', title: 'Deja Vu', artist: 'Olivia Rodrigo', album: 'SOUR', duration: 215, cover: generateCover('dejavu', 160), liked: false },
  { id: '11', title: 'Industry Baby', artist: 'Lil Nas X', album: 'MONTERO', duration: 212, cover: generateCover('industry', 10), liked: true },
  { id: '12', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', duration: 239, cover: generateCover('heatwaves', 40), liked: false },
  { id: '13', title: 'Shivers', artist: 'Ed Sheeran', album: '=', duration: 208, cover: generateCover('shivers', 190), liked: true },
  { id: '14', title: 'Happier Than Ever', artist: 'Billie Eilish', album: 'Happier Than Ever', duration: 294, cover: generateCover('happier', 60), liked: false },
  { id: '15', title: 'Bad Habits', artist: 'Ed Sheeran', album: '=', duration: 231, cover: generateCover('badhabits', 120), liked: true },
  { id: '16', title: 'Butter', artist: 'BTS', album: 'Butter', duration: 164, cover: generateCover('butter', 45), liked: false },
  { id: '17', title: 'Positions', artist: 'Ariana Grande', album: 'Positions', duration: 172, cover: generateCover('positions', 300), liked: true },
  { id: '18', title: 'Easy On Me', artist: 'Adele', album: '30', duration: 222, cover: generateCover('easyonme', 240), liked: false },
  { id: '19', title: 'Ghost', artist: 'Justin Bieber', album: 'Justice', duration: 154, cover: generateCover('ghost', 260), liked: true },
  { id: '20', title: 'Woman', artist: 'Doja Cat', album: 'Planet Her', duration: 173, cover: generateCover('woman', 350), liked: false },
];

export const playlists: Playlist[] = [
  {
    id: 'p1',
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now',
    cover: generateCover('todaytop', 140),
    owner: 'Spotify',
    tracks: tracks.slice(0, 8),
    gradient: 'from-indigo-900 via-purple-900 to-spotify-black'
  },
  {
    id: 'p2',
    name: 'RapCaviar',
    description: 'New music from the biggest names in hip-hop',
    cover: generateCover('rapcaviar', 30),
    owner: 'Spotify',
    tracks: tracks.slice(4, 12),
    gradient: 'from-amber-900 via-orange-900 to-spotify-black'
  },
  {
    id: 'p3',
    name: 'All Out 2020s',
    description: 'The biggest songs of the 2020s',
    cover: generateCover('allout2020', 200),
    owner: 'Spotify',
    tracks: tracks.slice(2, 10),
    gradient: 'from-blue-900 via-cyan-900 to-spotify-black'
  },
  {
    id: 'p4',
    name: 'Chill Vibes',
    description: 'Kick back with these chill tracks',
    cover: generateCover('chillvibes', 180),
    owner: 'Spotify',
    tracks: tracks.slice(6, 14),
    gradient: 'from-teal-900 via-green-900 to-spotify-black'
  },
  {
    id: 'p5',
    name: 'Pop Rising',
    description: 'The best new pop music',
    cover: generateCover('poprising', 320),
    owner: 'Spotify',
    tracks: tracks.slice(0, 6),
    gradient: 'from-pink-900 via-rose-900 to-spotify-black'
  },
  {
    id: 'p6',
    name: 'Rock Classics',
    description: 'Rock legends & iconic songs',
    cover: generateCover('rockclassics', 0),
    owner: 'Spotify',
    tracks: tracks.slice(8, 16),
    gradient: 'from-red-900 via-red-800 to-spotify-black'
  },
  {
    id: 'p7',
    name: 'Mood Booster',
    description: 'Get happy with these feel-good songs',
    cover: generateCover('moodboost', 50),
    owner: 'Spotify',
    tracks: tracks.slice(3, 11),
    gradient: 'from-yellow-900 via-amber-900 to-spotify-black'
  },
  {
    id: 'p8',
    name: 'Peaceful Piano',
    description: 'Relax and indulge with beautiful piano',
    cover: generateCover('piano', 220),
    owner: 'Spotify',
    tracks: tracks.slice(10, 18),
    gradient: 'from-slate-800 via-gray-900 to-spotify-black'
  },
];

export const artists: Artist[] = [
  { id: 'a1', name: 'The Weeknd', image: generateCover('weeknd', 280), followers: '85.2M' },
  { id: 'a2', name: 'Dua Lipa', image: generateCover('dualipa', 320), followers: '62.1M' },
  { id: 'a3', name: 'Olivia Rodrigo', image: generateCover('olivia', 200), followers: '45.8M' },
  { id: 'a4', name: 'Ed Sheeran', image: generateCover('edsheeran', 140), followers: '92.3M' },
  { id: 'a5', name: 'Billie Eilish', image: generateCover('billie', 100), followers: '71.5M' },
  { id: 'a6', name: 'Doja Cat', image: generateCover('dojacat', 340), followers: '52.7M' },
];

export const recentlyPlayed: Playlist[] = playlists.slice(0, 6);

export const categories = [
  { id: 'c1', name: 'Pop', color: '#E13300', image: generateCover('catpop', 0) },
  { id: 'c2', name: 'Hip-Hop', color: '#BA5D07', image: generateCover('cathiphop', 30) },
  { id: 'c3', name: 'Rock', color: '#E61E32', image: generateCover('catrock', 350) },
  { id: 'c4', name: 'Latin', color: '#1E3264', image: generateCover('catlatin', 220) },
  { id: 'c5', name: 'Podcasts', color: '#006450', image: generateCover('catpod', 160) },
  { id: 'c6', name: 'Indie', color: '#8D67AB', image: generateCover('catindie', 280) },
  { id: 'c7', name: 'Workout', color: '#777777', image: generateCover('catworkout', 180) },
  { id: 'c8', name: 'R&B', color: '#DC148C', image: generateCover('catrb', 300) },
  { id: 'c9', name: 'K-Pop', color: '#E8115B', image: generateCover('catkpop', 340) },
  { id: 'c10', name: 'Chill', color: '#148A08', image: generateCover('catchill', 120) },
  { id: 'c11', name: 'Sleep', color: '#1E3264', image: generateCover('catsleep', 240) },
  { id: 'c12', name: 'Party', color: '#E91429', image: generateCover('catparty', 10) },
];
