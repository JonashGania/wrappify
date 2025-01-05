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

interface Track {
    id: string,
    name: string,
    album: Album
    artists: Artist[],
    duration_ms: number,
    popularity: number,
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

export interface TopTracks {
    items: Track[],
    total: number,
    limit: number,
    offset: number,
    href: string,
}