interface Followers{
    href: string,
    total: number
}

interface Images {
    url: string,
    height: number,
    width: number,
}

interface Artist {
    name: string,
    id: string,
}

interface Album {
    name: string,
    images: Images[]
}

interface PlaylistTracks {
    href: string,
    total: number,
}

interface Owner {
    id: string,
    type: string,
    display_name: string
}

export interface Track {
    id: string,
    name: string,
    album: Album
    artists: Artist[],
    duration_ms: number,
    popularity: number,
}

export interface Artists {
    followers: Followers
    genres: string[],
    images: Images[],
    name: string,
    popularity: number,
    id: string,
    percentage?: number
    topTrack?: string,
}

export interface UserProfile {
    country: string,
    display_name: string,
    email: string,
    followers: Followers,
    href: string,
    id: string,
    images: Images[],
}

export interface UserPlaylists {
    description: string,
    id: string,
    images: Images[],
    name: string,
    owner: Owner
    tracks: PlaylistTracks,
}

export interface Genres {
    genre: string,
    count: number,
} 

export interface TopTracks {
    items: Track[],
    total: number,
    limit: number,
    offset: number,
    href: string,
}

export interface TopArtists {
    items: Artists[],
    total: number,
    limit: number,
    offset: number,
    href: string,
}
