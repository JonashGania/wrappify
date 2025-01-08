import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { getUserTopArtists, getUserTopTracks } from "@/api";
import { calculateListeningTimePercentage, findMostPlayedTrack } from "@/utils/trackListeningPercentage";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Artists } from "@/types";

const TopArtistCard = () => {
    const { accessToken } = useAuth();
    const [topArtist, setTopArtist] = useState<Artists>();

    useEffect(() => {
        if (accessToken) {
            const fetchTopArtistWithTrack = async () => {
                const topTracks = await getUserTopTracks('long_term', 50, accessToken);
                const artist = await getUserTopArtists('long_term', 1, accessToken);
                if (topTracks && artist) {
                    const artistId = artist[0].id;
                    const percentage = calculateListeningTimePercentage(topTracks.items, artistId);
                    const topTrack = findMostPlayedTrack(topTracks.items, artistId);

                    const artistObject = {
                        ...artist[0],
                        percentage,
                        topTrack,
                    }

                    setTopArtist(artistObject);
                }
            }

            fetchTopArtistWithTrack()
        }
    }, [accessToken]);

    if (!topArtist) {
        return <h1>Loading...</h1>
    }

    return (
        <Card className={`h-full w-full pb-8 gradient-card-red border-zinc-700`}>
            <CardHeader className="py-4">
                <CardTitle className="text-white font-semibold text-center">Your Top Artist</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="w-full flex justify-center pt-4">
                    <img 
                        src={topArtist.images[0].url} 
                        alt="artist cover" 
                        className="w-[100px] h-[100px] object-cover rounded-[50%]"
                    />
                </div>
                <h2 className="text-gray-200 text-center pt-7">
                    <span className="text-white font-semibold">{topArtist.name} </span>
                    was your Top Artist!
                </h2>
                {topArtist.percentage !== undefined && (
                    <p className="text-zinc-300 text-sm text-center pt-4 font-medium">
                        You have spent {Math.round(topArtist.percentage)}% of your listening time with {topArtist.name}.
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

export default TopArtistCard