import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import { getUserTopTracks, getUserTopArtists } from "@/api";
import { mapArtistsToGenres, getTopGenres, countTracksPerGenre } from "@/utils/getTopGenres";
import { Genres } from "@/types";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import { ResponsiveContainer, RadialBarChart, RadialBar, LabelList } from "recharts";
import { capitalizeStringWords } from "@/utils/capitalizeEachWord";

const TopGenresCard = () => {
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

    const opacityLevels = ['ff', 'd9', 'b3', '80', '33'];

    const chartData = genreCount.map((genre, index) => ({
        name: genre.genre,
        value: genre.count,
        fill: `#1db954${opacityLevels[index]}`  
    }))

    return (
        <Card
            className={`w-full bg-transparent border-zinc-700`}
        >
            <CardHeader className="py-4">
                <CardTitle className="text-white font-semibold text-center">Top Genres</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
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
                <ul className="flex flex-col gap-2 pt-2 w-full ">
                    {genreCount.map((genre, index) => (
                        <li 
                            className={`flex items-center gap-4 bg-[#1e1e20] rounded-md px-4 py-1`}
                            key={index}
                        >
                            <span className="text-gray-300">{index + 1}.</span>
                            <span className="text-white font-medium">
                                {capitalizeStringWords(genre.genre)}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default TopGenresCard
