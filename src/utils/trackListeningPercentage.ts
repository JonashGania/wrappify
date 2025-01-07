import { Track } from "@/types";

export const calculateListeningTimePercentage = (tracks: Track[], topArtistId: string) => {
    const totalListeningTime = tracks.reduce((total, track) => total + track.duration_ms, 0);
    const totalDurationByTopArtist = tracks
        .filter(track => track.artists.some(artist => artist.id === topArtistId))
        .reduce((total, track) => total + track.duration_ms, 0);

    return (totalDurationByTopArtist / totalListeningTime) * 100;
}

export const findMostPlayedTrack = (tracks: Track[], topArtistId: string) => {
    const tracksByTopArtist = tracks.filter(track => track.artists.some(artist => artist.id === topArtistId));

    const trackCount = tracksByTopArtist.reduce<Record<string, number>>((acc, track) => {
        acc[track.id] = (acc[track.id] || 0) + 1;
        return acc
    }, {})

    const mostPlayedTrackId = Object.keys(trackCount).reduce((a, b) => trackCount[a] > trackCount[b] ? a : b);
    const mostPlayedTrack = tracksByTopArtist.find(track => track.id === mostPlayedTrackId)
    return mostPlayedTrack ? mostPlayedTrack.name : undefined;
}