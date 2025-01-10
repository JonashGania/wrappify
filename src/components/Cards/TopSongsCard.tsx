import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { TopTracks } from "@/types";
import { getUserTopTracks } from "@/api";

const TopSongsCard = () => {
    const { accessToken } = useAuth();
    const [topSongs, setTopSongs] = useState<TopTracks>();

    useEffect(() => {
        if (accessToken) {
            getUserTopTracks('long_term', 5, accessToken).then(setTopSongs);
        }
    }, [accessToken]);

    if (!topSongs) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="px-6 pt-4 pb-8 gradient-card-indigo-violet rounded-lg w-full">
            <span className="text-white font-semibold w-full grid place-items-center text-lg">Top Songs</span>
            <ul className="flex flex-col w-full gap-3 mt-4">
                {topSongs.items.map((track, index) => (
                    <li className="flex items-center" key={track.id}>
                        <div className="text-white text-lg font-bold">{index + 1}.</div>
                        <div className="w-10 h-10 ml-3 flex-shrink-0">
                            <img 
                                src={track.album.images[0].url} 
                                alt="song cover" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-[2px] pl-4 overflow-hidden min-w-0">
                            <span className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</span>
                            <span className="text-zinc-300 font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">{track.artists[0].name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopSongsCard