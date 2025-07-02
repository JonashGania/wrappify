import { timeRange } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getUserTopArtists, getUserTopTracks } from "@/api";
import { calculateListeningTimePercentage } from "@/utils/trackListeningPercentage";
import { findMostPlayedTrack } from "@/utils/trackListeningPercentage";

interface UseTopArtistWithDetailsParams {
  timeRange?: timeRange;
  trackLimit?: number;
  artistLimit?: number;
  accessToken: string;
}

export const useTopArtistWithDetails = ({
  timeRange = "long_term",
  trackLimit = 50,
  artistLimit = 1,
  accessToken,
}: UseTopArtistWithDetailsParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topArtistWithDetails", timeRange, trackLimit, artistLimit],
    queryFn: async () => {
      const [topTracksResponse, topArtistsResponse] = await Promise.all([
        getUserTopTracks(timeRange, trackLimit, accessToken),
        getUserTopArtists(timeRange, artistLimit, accessToken),
      ]);

      const topTracks = topTracksResponse?.items || [];
      const topArtist = topArtistsResponse?.[0];

      if (!topArtist) {
        throw new Error("No top artist found");
      }

      const percentage = calculateListeningTimePercentage(
        topTracks,
        topArtist?.id
      );
      const topSong = findMostPlayedTrack(topTracks, topArtist?.id);

      return {
        ...topArtist,
        percentage,
        topSong,
      };
    },
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
