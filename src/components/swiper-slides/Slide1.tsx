import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react"
import { getUserTopTracks } from "@/api";
import { TopTracks } from "@/types";
import Tilt from 'react-parallax-tilt';

const TopSongsLastFourWeeks = () => {
    const { accessToken } = useAuth();
    const [topTracks, setTopTracks] = useState<TopTracks>();
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (accessToken) {
            getUserTopTracks('short_term', 5, accessToken).then(setTopTracks);
        }
    }, [accessToken]);

    useEffect(() => {
                  
        const timer = setTimeout(() => {
            setShowText(true)
        }, 3000);
        return () => clearTimeout(timer);

    }, [])

    if (!topTracks) {
        return <h1>Loading...</h1>
    }


    return (
        <div className="flex w-full gap-4 px-8 pb-8 pt-16">
            <div className="flex-1">
                <h1 className={`text-white text-[35px] font-bold leading-10 max-w-[380px] transition-transform duration-700 ${showText ? 'translate-y-0' : 'translate-y-28'}`}>
                    Your Recent Top Songs...
                </h1>
                <p className={`text-zinc-400 font-normal max-w-[380px] leading-5 mt-14 text-lg transition duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    These songs ruled your playlist, keeping you on repeat all month long!
                </p>
            </div>
            <div className="flex-1 flex justify-end">
                <Tilt>
                    <div className="w-[340px] h-[365px] rounded-lg gradient-card-gray px-8 py-8">
                        <ul className="flex flex-col w-full gap-5">
                            {topTracks.items.map((track, index) => (
                                <li className="flex items-center" key={track.id}>
                                    <div className="text-white text-lg font-bold">{index + 1}.</div>
                                    <div className="w-10 h-10 object-cover ml-3">
                                        <img src={track.album.images[0].url} alt="song cover" />
                                    </div>
                                    <div className="flex flex-col gap-[2px] pl-4 max-w-[185px]">
                                        <span className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{track.name}</span>
                                        <span className="text-zinc-300 font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">{track.artists[0].name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tilt>
            </div>
        </div>
    )
}

export default TopSongsLastFourWeeks