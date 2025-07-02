import { useAuth } from "@/context/AuthProvider";
import { useState, useEffect } from "react";
import {
  RadialBar,
  RadialBarChart,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription } from "../ui/card";
import { capitalizeStringWords } from "@/utils/capitalizeEachWord";
import { useTopGenres } from "@/hooks/useTopGenres";

const TopGenres = ({ isActive }: { isActive: boolean }) => {
  const { accessToken } = useAuth();
  const [showText, setShowText] = useState(false);

  const { data: topGenres, isLoading } = useTopGenres({
    accessToken: accessToken || "",
  });

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isActive]);

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
    <div className="w-full px-4 md:px-8 sm:pt-8 pb-16">
      <h1
        className={` text-2xl sm:text-[35px] text-primary-color font-bold text-center transition-all duration-1000 delay-700 ease-out ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-14"
        }`}
      >
        Your Top Genres
      </h1>
      <div className="hidden sm:flex gap-4 pt-12">
        <div className="flex-1">
          <div className="w-full text-center">
            <ResponsiveContainer width="100%" height={180}>
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
            <span className="text-white font-semibold max-w-[250px]">
              {capitalizeStringWords(topGenres.topGenres[0].genre)} is your most
              streamed genre
            </span>
            <p
              className={`text-zinc-400 max-w-[240px] mx-auto text-sm text-center pt-4 transition duration-700 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              You were big on artists like
              <span className="text-white font-medium">
                {" "}
                {topGenres.userBigArtists?.join(", ")}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <ul className="flex flex-col gap-2 pt-2 w-full max-w-[250px]">
            {topGenres.topGenres.map((genre, index) => (
              <li
                className={`flex items-center gap-4 bg-[#1e1e20] rounded-md px-4 py-3 opacity-0 ${
                  isActive ? "fade-up-animation" : ""
                }`}
                key={index}
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                <span className="text-gray-300">{index + 1}.</span>
                <span className="text-white font-medium text-lg">
                  {capitalizeStringWords(genre.genre)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Card
        className={`w-full max-w-[350px] mx-auto mt-6 bg-transparent border-zinc-700 block sm:hidden`}
      >
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={170}>
            <RadialBarChart
              data={chartData}
              startAngle={-90}
              endAngle={380}
              innerRadius={10}
              outerRadius={80}
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
          <CardDescription className="text-center py-4">
            <span className="text-white text-center font-semibold max-w-[250px]">
              {capitalizeStringWords(topGenres.topGenres[0].genre)} is your most
              streamed genre
            </span>
            <p
              className={`text-zinc-400 max-w-[240px] mx-auto text-sm text-center pt-4 transition duration-700 ${
                showText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              You were big on artists like
              <span className="text-white font-medium">
                {" "}
                {topGenres.userBigArtists.join(", ")}
              </span>
            </p>
          </CardDescription>
          <ul className="flex flex-col gap-2 pt-2 w-full ">
            {topGenres.topGenres.map((genre, index) => (
              <li
                className={`flex items-center gap-4 bg-[#1e1e20] rounded-md px-4 py-1 opacity-0 ${
                  isActive ? "fade-up-animation" : ""
                }`}
                key={index}
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
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
    </div>
  );
};

export default TopGenres;
