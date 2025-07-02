import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { useTopTracks } from "@/hooks/useTopTracks";
import Tilt from "react-parallax-tilt";

const TopSongsLastFourWeeks = () => {
  const { accessToken } = useAuth();
  const [showText, setShowText] = useState(false);

  const { data: toptracks, isLoading } = useTopTracks({
    timeRange: "short_term",
    limit: 5,
    accessToken: accessToken || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center sm:items-start sm:flex-row w-full gap-4 px-4 md:px-8 pb-8 sm:pt-16">
      <div className="flex-1 hidden sm:block">
        <h1
          className={`text-white text-[35px] font-bold leading-10 max-w-[380px] transition-transform duration-700 ${
            showText ? "translate-y-0" : "translate-y-28"
          }`}
        >
          Your Recent Top Songs...
        </h1>
        <p
          className={`text-zinc-400 font-normal max-w-[380px] leading-5 mt-14 text-lg transition duration-700 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          These songs ruled your playlist, keeping you on repeat all month long!
        </p>
      </div>
      <h1
        className={`text-white text-start w-[300px] block sm:hidden pb-8 text-2xl font-bold leading-10`}
      >
        Your Recent Top Songs...
      </h1>
      <div className="sm:flex-1 w-full flex justify-center">
        <Tilt>
          <div className="w-[300px] sm:w-[280px] md:w-[340px] h-[365px] rounded-lg gradient-card-gray px-4 md:px-8 py-8">
            <ul className="flex flex-col w-full gap-5">
              {toptracks?.items.map((track, index) => (
                <li className="flex items-center" key={track.id}>
                  <div className="text-white text-lg font-bold">
                    {index + 1}.
                  </div>
                  <div className="w-10 h-10 ml-3 flex-shrink-0">
                    <img
                      src={track.album.images[0].url}
                      alt="song cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px] pl-4 overflow-hidden min-w-0">
                    <span className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {track.name}
                    </span>
                    <span className="text-zinc-300 font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {track.artists[0].name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Tilt>
      </div>
      <p
        className={`text-zinc-300 block text-start w-[300px] sm:hidden font-normal leading-5 pt-8  transition duration-700 ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        These songs ruled your playlist, keeping you on repeat all month long!
      </p>
    </div>
  );
};

export default TopSongsLastFourWeeks;
