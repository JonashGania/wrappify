import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { useAuth } from "@/context/AuthProvider";
import { useTopTracks } from "@/hooks/useTopTracks";

const TopSongs = ({ isActive }: { isActive: boolean }) => {
  const { accessToken } = useAuth();

  const { data: toptracks, isLoading } = useTopTracks({
    timeRange: "long_term",
    limit: 5,
    accessToken: accessToken || "",
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full md:px-8 px-4 pt-8 pb-16">
      <h1
        className={`text-2xl sm:text-[35px] text-primary-color font-bold text-center transition-all duration-1000 delay-700 ease-out ${
          isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-14"
        }`}
      >
        Your Top Streamed Songs
      </h1>
      <Table className="max-w-[650px] w-full mx-auto px-4 mt-12 overflow-hidden">
        <TableHeader className="border-0">
          <TableRow className="hover:bg-transparent border-b-zinc-700 flex">
            <TableHead className="text-xl w-10 text-zinc-500">#</TableHead>
            <TableHead className="sm:w-[380px] md:w-[450px] text-zinc-500">
              Title
            </TableHead>
            <TableHead className="hidden sm:block w-[140px] text-zinc-500">
              Album
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toptracks?.items.map((track, index) => (
            <TableRow
              key={track.id}
              className={`hover:bg-transparent border-b-zinc-700 flex opacity-0 ${
                isActive ? "fade-left-animation" : ""
              }`}
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
            >
              <TableCell className="text-gray-300 text-lg">
                {index + 1}.
              </TableCell>
              <TableCell className="flex gap-3 w-full max-w-[280px] sm:max-w-[380px] md:max-w-[450px]">
                <div className="w-10 h-10 object-cover">
                  <img
                    src={track.album.images[0].url}
                    alt="song cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-1 song-name-container">
                  <span className="text-white font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {track.name}
                  </span>
                  <span className="text-zinc-400 font-semibold text-xs whitespace-nowrap overflow-hidden text-ellipsis ">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:block max-w-[140px]">
                <span className="text-zinc-300 whitespace-nowrap overflow-hidden text-ellipsis block w-full">
                  {track.album.name}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopSongs;
