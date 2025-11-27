import { useAuth } from "@/context/AuthProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTopArtists } from "@/hooks/useTopArtists";

const MostStreamedArtistsCard = () => {
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
    <div className="px-2 pt-4 pb-8 gradient-card-frost rounded-lg w-full">
      <span className="text-white font-semibold w-full grid place-items-center text-lg">
        Most Streamed Artists
      </span>
      <div className="mt-4">
        <TooltipProvider>
          <div className="flex justify-center">
            <Tooltip>
              <div
                className={`flex items-center gap-3 py-2 px-2 transition duration-300 hover:bg-[#5590fd33] rounded-lg max-w-[175px] `}
              >
                <img
                  src={topArtists[0].images[0].url}
                  alt="artist cover"
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <TooltipTrigger>
                  <h2 className="text-white font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px]">
                    {topArtists[0].name}
                  </h2>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{topArtists[0].name}</p>
                </TooltipContent>
              </div>
            </Tooltip>
          </div>
          <div className="card-grid">
            {topArtists.slice(1, 9).map((artist) => (
              <Tooltip key={artist.id}>
                <div
                  className={`flex items-center gap-3 transition duration-300 px-2 py-2 hover:bg-[#5590fd33] rounded-lg group`}
                >
                  <img
                    src={artist.images[0].url}
                    alt="artist cover"
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex-shrink-0"
                  />
                  <TooltipTrigger asChild>
                    <span className="text-zinc-300 group-hover:text-white transition duration-300 font-semibold text-sm whitespace-nowrap text-ellipsis overflow-hidden">
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

export default MostStreamedArtistsCard;
