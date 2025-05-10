import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserPlaylistSongs, getPlaylistMetadata } from "@/api";
import { PlaylistTracks, UserPlaylists } from "@/types";

const PlaylistPage = () => {
  const { accessToken } = useAuth();
  const { playlistId } = useParams<{ playlistId: string }>();

  const [songs, setSongs] = useState<PlaylistTracks[]>([]);
  const [playlistInfo, setPlaylistInfo] = useState<UserPlaylists>();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 50;

  useEffect(() => {
    const fetchData = async () => {
      if (!playlistId || !accessToken || !hasMore) return;

      try {
        const [metadata, tracks] = await Promise.all([
          getPlaylistMetadata(playlistId, accessToken),
          getUserPlaylistSongs(offset, limit, playlistId, accessToken),
        ]);

        if (offset === 0) setPlaylistInfo(metadata);
        setSongs((prev) => [...prev, ...tracks.items]);
        setOffset((prev) => prev + limit);
        setHasMore(tracks.next !== null);
      } catch (error) {
        console.error("Error loading playlist", error);
      }
    };

    fetchData();
  }, [offset, playlistId, accessToken, hasMore]);

  console.log(playlistInfo);
  console.log(songs);

  if (!playlistInfo) {
    return <h1 className="text-white">loading...</h1>;
  }

  return (
    <div className="max-w-3xl w-full mx-auto min-h-screen">
      <div className="pt-12">
        <div className="flex items-end gap-6 bg-gradient-to-b from-stone-400 to-stone-400/50 rounded-md p-4">
          <img
            src={playlistInfo.images[0].url}
            alt="playlist cover"
            className="w-[180px] h-[180px] rounded-sm object-cover"
          />
          <div className="flex flex-1 flex-col">
            <span className="text-sm text-white">
              {playlistInfo.public === true ? "Public" : "Private"} Playlist
            </span>
            <h1 className="text-white text-5xl font-extrabold pt-3 pb-5 truncate lg:w-[532px]">
              {playlistInfo.name}
            </h1>
            <p className="text-sm text-white">
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
        <div className="p-4"></div>
      </div>
    </div>
  );
};

export default PlaylistPage;
