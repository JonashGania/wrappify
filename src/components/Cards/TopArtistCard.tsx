import { useAuth } from "@/context/AuthProvider";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useTopArtistWithDetails } from "@/hooks/useTopArtistWithDetails";

const TopArtistCard = () => {
  const { accessToken } = useAuth();

  const { data: topArtist, isLoading } = useTopArtistWithDetails({
    accessToken: accessToken || "",
  });

  if (!topArtist) {
    return <h1>No top artist</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card className={`h-full w-full pb-8 gradient-card-red border-zinc-700`}>
      <CardHeader className="py-4">
        <CardTitle className="text-white font-semibold text-center">
          Top Artist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center pt-8">
          <img
            src={topArtist.images[0].url}
            alt="artist cover"
            className="w-[100px] h-[100px] object-cover rounded-[50%]"
          />
        </div>
        <h2 className="text-gray-200 text-center pt-8">
          <span className="text-white font-semibold">{topArtist.name} </span>
          was your Top Artist!
        </h2>
        {topArtist.percentage !== undefined && (
          <p className="text-zinc-300 text-sm text-center pt-4 font-medium">
            You have spent {Math.round(topArtist.percentage)}% of your listening
            time with {topArtist.name}.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TopArtistCard;
