import { useQuery } from "@tanstack/react-query";
import { getUserTopTracks } from "@/api";
import { timeRange } from "@/types";

interface UseTopTracksParams {
  timeRange: timeRange;
  limit: number;
  accessToken: string;
}

export const useTopTracks = ({
  timeRange,
  limit,
  accessToken,
}: UseTopTracksParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ["topTracks", timeRange, limit],
    queryFn: () => getUserTopTracks(timeRange, limit, accessToken),
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading };
};
