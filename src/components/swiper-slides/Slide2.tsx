import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"
import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { TopTracks } from "@/types";
import { getUserTopTracks } from "@/api";
import Tilt from 'react-parallax-tilt';

const MostPlayedSong = ({ isActive }: {isActive: boolean}) => {
    const { accessToken } = useAuth();
    const [topSong, setTopSong] = useState<TopTracks>();
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (accessToken) {
            getUserTopTracks('long_term', 1, accessToken).then(setTopSong);
        }
    }, [accessToken]);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                setShowText(true)
            }, 3500);

            return () => clearTimeout(timer);
        } else {
            setShowText(false);
        }
    }, [isActive])

    if (!topSong) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="flex w-full gap-4 px-8 pb-8 pt-16">
            <div className="flex-1">
                <h1 className={`text-white text-[35px] font-bold leading-10 max-w-[380px] transition-transform duration-700  ${isActive ? 'fade-right-up-animation': ''}`}
                >
                    Played countless songs, but one stood above them all...
                </h1>
                <p className={`text-zinc-400 font-normal max-w-[380px] leading-5 mt-14 text-lg transition duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <span className="text-white font-semibold">{topSong.items[0].name} </span>
                    by 
                    <span className="text-white font-semibold"> {topSong.items[0].artists.map(artist => artist.name).join(', ')} </span>
                    is your most played song!
                </p>
            </div>
            <div className="flex-1 flex justify-end">
                <Tilt
                    glareEnable={true} 
                    glareMaxOpacity={0.1} 
                    scale={1.1} 
                >
                    <div className="w-[305px] h-[370px]">
                        {topSong.items.map((song) => (
                            <Card
                                className={`h-full w-full gradient-card-green border-zinc-700`}
                                key={song.id}
                            >
                                <CardHeader className="py-4">
                                    <CardTitle className="text-white font-semibold">Your Most Played Song</CardTitle>
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
                                    <span className="text-zinc-400 text-sm font-semibold">
                                        {song.artists.map(artist => artist.name).join(', ')}
                                    </span>
                                    <span className="text-white font-semibold text-lg">{song.name}</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </Tilt>
            </div>
        </div>
    )
}

export default MostPlayedSong