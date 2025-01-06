import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { getUserTopTracks, getUserTopArtists } from "@/api";
import { mapArtistsToGenres, getTopGenres, countTracksPerGenre } from "@/utils/getTopGenres";
import { Genres } from "@/types";
import { RadialBar, RadialBarChart, LabelList, ResponsiveContainer } from "recharts";

const TopGenres = () => {
    const { accessToken } = useAuth();
    const [genreCount, setGenreCount] = useState<Genres[]>([]);

    useEffect(() => {
        if (accessToken) {
            const fetchAndProcessGenres = async () => {
                const topTracks = await getUserTopTracks('long_term', 50, accessToken);
                const topArtists = await getUserTopArtists('long_term', 50, accessToken);
                
                if (topTracks && topArtists) {
                    const artistGenreMap = mapArtistsToGenres(topArtists);
                    const genreCountMap = countTracksPerGenre(topTracks.items, artistGenreMap);
                    const topGenres = getTopGenres(genreCountMap);

                    setGenreCount(topGenres)
                }
            
            }

            fetchAndProcessGenres();
        }
    }, [accessToken]);


    if (!genreCount || genreCount.length === 0) {
        return <h1>Loading...</h1>;
    }

    const chartData = [
        { name: genreCount[0]?.genre, value: genreCount[0]?.count, fill: '#1db954' },
        { name: genreCount[1]?.genre, value: genreCount[1]?.count, fill: '#1db954d9' },
        { name: genreCount[2]?.genre, value: genreCount[2]?.count, fill: '#1db954b3' },
        { name: genreCount[3]?.genre, value: genreCount[3]?.count, fill: '#1db95480' },
        { name: genreCount[4]?.genre, value: genreCount[4]?.count, fill: '#1db95433' },
    ]

    return (
        <div className="w-full px-8 pt-8 pb-16">
            <h1 className={`text-[35px] text-primary-color font-bold text-center textz`}>Your Top Genres</h1>
            <div className="flex gap-4 pt-12">
                <div className="flex-1">
                    <div className="w-full text-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <RadialBarChart
                                data={chartData}
                                startAngle={-90}
                                endAngle={380}
                                innerRadius={20}
                                outerRadius={90}
                                barSize={10}
                            >

                                <RadialBar
                                    dataKey={"value"}
                                    background={{ fill: '#b3b3b34d' }}
                                >
                                    <LabelList
                                        dataKey={"name"}
                                        fontSize={12}
                                        position={"insideStart"}
                                        className="fill-white capitalize mix-blend-luminosity"
                                    />
                                </RadialBar>
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <span className="text-white font-semibold">
                            {genreCount[0].genre.charAt(0).toUpperCase() + genreCount[0].genre.slice(1)} is your most streamed genre
                        </span>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <ul className="flex flex-col gap-2 pt-2">
                        {genreCount.map((genre, index) => (
                            <li 
                                className="flex items-center gap-4" 
                                key={index}
                            >
                                <span className="text-gray-300">{index + 1}.</span>
                                <span className="text-white font-medium text-xl">
                                    {genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopGenres