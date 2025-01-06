import { Artists, Track } from "@/types"

export const mapArtistsToGenres = (artists: Artists[]) => {
    return artists.reduce<Record<string, string[]>>((acc, artist) => {
        acc[artist.id] = artist.genres;
        return acc;
    }, {});
};

export const countTracksPerGenre = (tracks: Track[], artistGenreMap: Record<string, string[]>) => {
    const genreCountMap: Record<string, number> = {};

    tracks.forEach(track => {
        track.artists.forEach(artist => {
            const genres = artistGenreMap[artist.id] || [];
            genres.forEach(genre => {
                genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
            })
        })
    })

    return genreCountMap;
};

export const getTopGenres = (genreCountMap: Record<string, number>) => {
    return Object.entries(genreCountMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([genre, count]) => ({ genre, count }));
}
