import { timeRange } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getUserTopArtists } from "@/api";

interface UseTopArtistsParams {
  timeRange: timeRange;
  limit: number;
  accessToken: string;
}

export const useTopArtists = ({
  timeRange,
  limit,
  accessToken,
}: UseTopArtistsParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["topArtists", timeRange, limit],
    queryFn: () => getUserTopArtists(timeRange, limit, accessToken),
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
