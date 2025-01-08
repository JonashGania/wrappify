import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { TopTracks } from "@/types";
import { getUserTopTracks } from "@/api";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "../ui/card";


const MostPlayedSongCard = () => {
    const { accessToken } = useAuth();
    const [topSong, setTopSong] = useState<TopTracks>();

    useEffect(() => {
        if (accessToken) {
            getUserTopTracks('long_term', 1, accessToken).then(setTopSong)
        }
    }, [accessToken]);

    if (!topSong) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            {topSong.items.map((song) => (
                <Card
                    className={`h-full w-full gradient-card-green border-zinc-700`}
                    key={song.id}
                >
                    <CardHeader className="py-4">
                        <CardTitle className="text-white font-semibold text-center">Your Most Played Song</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <div className="w-full">
                            <img 
                                src={song.album.images[0].url} 
                                alt="song cover" 
                                className="w-full max-h-[220px] h-full object-cover"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center flex-col">
                        <span className="text-zinc-300 text-sm font-semibold">
                            {song.artists.map(artist => artist.name).join(', ')}
                        </span>
                        <span className="text-white font-semibold text-lg">{song.name}</span>
                    </CardFooter>
                </Card>
            ))}
        </>
    )
}

export default MostPlayedSongCard