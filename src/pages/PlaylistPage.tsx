import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserPlaylistSongs, getPlaylistMetadata } from "@/api";
import { PlaylistTracks } from "@/types";
import { LoaderCircle, ChevronLeft } from "lucide-react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PlaylistPageSkeleton from "@/components/Skeleton/PlaylistPageSkeleton";

const PlaylistPage = () => {
  const { accessToken } = useAuth();
  const { playlistId } = useParams<{ playlistId: string }>();

  const navigate = useNavigate();

  const { data: playlistInfo, isLoading } = useQuery({
    queryKey: ["playlistInfo", playlistId],
    queryFn: () => getPlaylistMetadata(playlistId, accessToken),
    refetchOnWindowFocus: false,
    enabled: !!playlistId && !!accessToken,
  });

  const {
    data: songs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["playlistTracks", playlistId],
    queryFn: ({ pageParam = 0 }) =>
      getUserPlaylistSongs(pageParam, 50, playlistId, accessToken),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length * 50 : undefined,
    refetchOnWindowFocus: false,
    enabled: !!playlistId && !!accessToken,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <PlaylistPageSkeleton />;
  }

  const allSongs: PlaylistTracks[] =
    songs?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="min-h-screen px-4">
      <div className="sticky top-0 left-0 bg-dark-color py-5 w-full">
        <div className="max-w-3xl w-full mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center group"
          >
            <ChevronLeft className="text-neutral-300/70 size-6 group-hover:text-neutral-300" />
            <span className="text-neutral-300/70 group-hover:text-neutral-300 font-medium">
              Back
            </span>
          </button>
        </div>
      </div>
      <div className="max-w-3xl w-full mx-auto py-4">
        <div className="flex items-end gap-6 bg-gradient-to-b from-stone-400 to-stone-400/50 rounded-t-md p-4">
          <img
            src={playlistInfo.images[0].url}
            alt="playlist cover"
            className="w-[130px] h-[130px] min-[580px]:w-[180px] min-[580px]:h-[180px] rounded-sm object-cover"
          />
          <div className="flex flex-1 flex-col">
            <span className="text-sm text-white">
              {playlistInfo.public === true ? "Public" : "Private"} Playlist
            </span>
            <h1 className="text-white text-3xl min-[580px]:text-5xl leading-8 font-extrabold pt-2 line-clamp-2 min-[580px]:pt-3 w-[200px] min-[540px]:w-[330px] min-[700px]:w-[430px] min-[800px]:w-[532px]">
              {playlistInfo.name}
            </h1>
            <p className="text-sm text-white pt-4 min-[580px]:pt-5">
              by{" "}
              <span className="font-bold">
                {playlistInfo.owner.display_name}
              </span>
              ,{" "}
              <span className="text-neutral-300">
                followers: {playlistInfo.followers.total}
              </span>
            </p>
          </div>
        </div>
        <div className="p-4 gradient-playlist-tracks">
          <ul className="space-y-4">
            {allSongs.map((item, index) => (
              <li key={index} className="w-full flex items-center gap-4 ">
                <span className="text-gray-200 text-end  w-5">{index + 1}</span>
                <div className="flex items-center gap-2">
                  <img
                    src={item.track.album.images[0].url}
                    alt={`${item.track.name}'s album cover`}
                    className="w-11 h-11 object-cover rounded-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-white truncate w-[200px] min-[580px]:w-[400px] min-[660px]:w-[500px] min-[800px]:w-[620px]">
                      {item.track.name}
                    </span>
                    <div className="flex items-center text-ellipsis truncate w-[200px] min-[580px]:w-[400px] min-[660px]:w-[500px] min-[800px]:w-[620px]">
                      {item.track.explicit && (
                        <span className="text-xs text-black font-semibold size-4 flex flex-shrink-0 items-center justify-center bg-neutral-400 mr-1">
                          E
                        </span>
                      )}
                      {item.track.artists.map((artist, i) => (
                        <span
                          key={artist.id}
                          className="text-sm text-neutral-400 mr-1"
                        >
                          {artist.name}
                          {i < item.track.artists.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div ref={ref} className="flex justify-center items-center">
            {isFetchingNextPage && (
              <>
                <LoaderCircle
                  size={20}
                  className="animate-spin text-gray-200"
                />
                <span className="text-white font-semibold pl-2">
                  Loading tracks...
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
