interface Followers{
    href: string,
    total: number
}

interface Images {
    url: string,
    height: number,
    width: number,
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