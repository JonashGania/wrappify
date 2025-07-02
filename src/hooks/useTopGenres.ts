import { timeRange } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getUserTopTracks, getUserTopArtists } from "@/api";
import {
  mapArtistsToGenres,
  getTopGenres,
  countTracksPerGenre,
  bigArtistsByGenre,
} from "@/utils/getTopGenres";

interface UseTopGenresParams {
  timeRange?: timeRange;
  trackLimit?: number;
  artistLimit?: number;
  accessToken: string;
}
export const useTopGenres = ({
  timeRange = "long_term",
  trackLimit = 50,
  artistLimit = 50,
  accessToken,
}: UseTopGenresParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topGenres", timeRange, trackLimit, artistLimit],
    queryFn: async () => {
      const [topTracksResponse, topArtistsResponse] = await Promise.all([
        getUserTopTracks(timeRange, trackLimit, accessToken),
        getUserTopArtists(timeRange, artistLimit, accessToken),
      ]);

      if (topTracksResponse && topArtistsResponse) {
        const topTracks = topTracksResponse.items;
        const artistGenreMap = mapArtistsToGenres(topArtistsResponse);
        const genreCountMap = countTracksPerGenre(topTracks, artistGenreMap);
        const topGenres = getTopGenres(genreCountMap);
        const topGenre = topGenres[0]?.genre;

        if (!topGenre) throw new Error("No top genre");

        const userBigArtists = bigArtistsByGenre(topArtistsResponse, topGenre);

        return { topGenres, userBigArtists };
      }
    },
  });

  return { data, isLoading, isError };
};
