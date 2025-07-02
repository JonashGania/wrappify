import { useAuth } from "@/context/AuthProvider";
import { useTopTracks } from "@/hooks/useTopTracks";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";

const MostPlayedSongCard = () => {
  const { accessToken } = useAuth();

  const { data: toptracks, isLoading } = useTopTracks({
    timeRange: "long_term",
    limit: 1,
    accessToken: accessToken || "",
  });

  if (!toptracks || toptracks.items.length === 0) {
    return <h1 className="text-white">No Most played song</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {toptracks.items.map((song) => (
        <Card
          className={`h-full w-full gradient-card-green border-zinc-700`}
          key={song.id}
        >
          <CardHeader className="py-4">
            <CardTitle className="text-white font-semibold text-center">
              Most Played Song
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="w-full">
              <img
                src={song.album.images[0].url}
                alt="song cover"
                className="w-full max-h-[220px] h-full object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-center flex-col">
            <span className="text-zinc-300 text-sm font-semibold">
              {song.artists.map((artist) => artist.name).join(", ")}
            </span>
            <span className="text-white font-semibold text-lg">
              {song.name}
            </span>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default MostPlayedSongCard;
