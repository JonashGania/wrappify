import { useAuth } from "@/context/AuthProvider";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LabelList,
} from "recharts";
import { capitalizeStringWords } from "@/utils/capitalizeEachWord";
import { useTopGenres } from "@/hooks/useTopGenres";

const TopGenresCard = () => {
  const { accessToken } = useAuth();

  const { data: topGenres, isLoading } = useTopGenres({
    accessToken: accessToken || "",
  });

  if (!topGenres || topGenres.topGenres.length === 0) {
    return <h1>No top genres</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const opacityLevels = ["ff", "d9", "b3", "80", "33"];

  const chartData = topGenres.topGenres.map((genre, index) => ({
    name: genre.genre,
    value: genre.count,
    fill: `#1db954${opacityLevels[index]}`,
  }));

  return (
    <Card className={`w-full bg-transparent border-zinc-700`}>
      <CardHeader className="py-4">
        <CardTitle className="text-white font-semibold text-center">
          Top Genres
        </CardTitle>
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
            <RadialBar dataKey={"value"} background={{ fill: "#b3b3b34d" }}>
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
          {topGenres.topGenres.map((genre, index) => (
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
  );
};

export default TopGenresCard;
