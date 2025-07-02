interface Followers {
  href: string;
  total: number;
}

interface Images {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  name: string;
  id: string;
}

interface Album {
  name: string;
  images: Images[];
}

interface PlaylistTrackTotal {
  href: string;
  total: number;
}

interface Owner {
  id: string;
  type: string;
  display_name: string;
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  explicit: boolean;
  duration_ms: number;
  popularity: number;
}

export interface Artists {
  followers: Followers;
  genres: string[];
  images: Images[];
  name: string;
  popularity: number;
  id: string;
  percentage?: number;
  topTrack?: string;
}

export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  followers: Followers;
  href: string;
  id: string;
  images: Images[];
}

export interface UserPlaylists {
  description: string;
  id: string;
  images: Images[];
  name: string;
  owner: Owner;
  public: boolean;
  followers: PlaylistTrackTotal;
  tracks: PlaylistTrackTotal;
}

export interface PlaylistTracks {
  added_at: string;
  track: Track;
}

export interface Genres {
  genre: string;
  count: number;
}

export interface TopTracks {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}

export interface TopArtists {
  items: Artists[];
  total: number;
  limit: number;
  offset: number;
  href: string;
}

export type timeRange = "short_term" | "medium_term" | "long_term";
