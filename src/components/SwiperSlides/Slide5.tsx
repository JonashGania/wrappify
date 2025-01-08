import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { getUserTopArtists, getUserTopTracks } from "@/api";
import { calculateListeningTimePercentage, findMostPlayedTrack } from "@/utils/trackListeningPercentage";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Artists } from "@/types";
import Tilt from 'react-parallax-tilt';

const TopArtist = ({ isActive }: {isActive: boolean}) => {
    const { accessToken } = useAuth();
    const [topArtist, setTopArtist] = useState<Artists>();
    const [showText, setShowText] = useState(false);

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

    if (!topArtist) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="flex w-full gap-4 px-8 pb-8 pt-16">
            <div className="flex-1 flex justify-start">
                <Tilt
                    glareEnable={true} 
                    glareMaxOpacity={0.1} 
                    scale={1.1} 
                >
                    <div className="w-[305px] h-[370px]">
                        <Card className={`h-full w-full gradient-card-red border-zinc-700`}>
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
                                    <p className="text-zinc-400 text-sm text-center pt-4 font-medium">
                                        You have spent {Math.round(topArtist.percentage)}% of your listening time with {topArtist.name}.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Tilt>
            </div>
            <div className="flex-1 flex justify-end">
                <div>
                    <h1 className={`text-white text-[35px] font-bold leading-10 max-w-[380px] transition-transform duration-700 ${isActive ? 'fade-left-up-animation': ''}`}
                    >
                        Listened to multiple artists, but one truly stole your heart...
                    </h1>
                    <p className={`text-zinc-400 font-normal max-w-[380px] leading-6 mt-14 text-lg transition duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                        Your most listened track by
                        <span className="text-white font-semibold"> {topArtist.name} </span>
                        was
                        <span className="text-white font-semibold"> "{topArtist.topTrack}".</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopArtist