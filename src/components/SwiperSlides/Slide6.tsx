import { useAuth } from "@/context/AuthProvider";
import { useTopArtists } from "@/hooks/useTopArtists";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const MostStreamedArtists = ({ isActive }: { isActive: boolean }) => {
  const { accessToken } = useAuth();

  const { data: topArtists, isLoading } = useTopArtists({
    timeRange: "long_term",
    limit: 10,
    accessToken: accessToken || "",
  });

  if (!topArtists || topArtists.length === 0) {
    return <h1 className="text-white">No Artists</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full px-4 sm:px-8 sm:pt-6 pb-16">
      <h1
        className={`text-2xl sm:text-[35px] text-primary-color font-bold text-center transition-all duration-1000 delay-700 ease-out ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-14"
        }`}
      >
        Your Most Streamed Artists
      </h1>
      <div className="max-w-[370px] w-full border mx-auto mt-8 border-zinc-800 rounded-lg py-6 px-4 transition duration-300 hover:shadow-around-green">
        <TooltipProvider>
          <div className="flex justify-center">
            <Tooltip>
              <div
                className={`flex items-center gap-3 py-3 sm:px-5 transition duration-300 sm:hover:bg-[#1db95433] rounded-lg max-w-[175px] opacity-0 ${
                  isActive ? "fade-left-animation" : ""
                }`}
              >
                <img
                  src={topArtists[0].images[0].url}
                  alt="artist cover"
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex-shrink-0"
                />
                <TooltipTrigger>
                  <span className="text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                    {topArtists[0].name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{topArtists[0].name}</p>
                </TooltipContent>
              </div>
            </Tooltip>
          </div>
          <div className="card-grid">
            {topArtists.slice(1, 9).map((artist, index) => (
              <Tooltip key={artist.id}>
                <div
                  className={`flex items-center gap-3 py-3 sm:px-5 transition duration-300 sm:hover:bg-[#1db95433] rounded-lg group opacity-0 
                      ${isActive ? "fade-left-animation" : ""}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <img
                    src={artist.images[0].url}
                    alt="artist cover"
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <TooltipTrigger asChild>
                    <span className="text-zinc-400 group-hover:text-white transition duration-300 font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                      {artist.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{artist.name}</p>
                  </TooltipContent>
                </div>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MostStreamedArtists;
