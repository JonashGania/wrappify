import { useAuth } from "@/context/AuthProvider";
import { useEffect, useState } from "react";
import { getUserPlaylists } from "@/api";
import { UserPlaylists } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const Playlists = () => {
  const { accessToken } = useAuth();
  const [playlists, setPlaylists] = useState<UserPlaylists[]>();

  useEffect(() => {
    if (accessToken) {
      getUserPlaylists(accessToken).then(setPlaylists);
    }
  }, [accessToken]);

  if (!playlists) {
    return <h1>loading...</h1>;
  }

  console.log(playlists);

  return (
    <div className="max-w-[1000px] w-full mx-auto pt-16 pb-24">
      <h1 className="text-white font-bold text-3xl mb-6">Playlists</h1>
      <Swiper
        slidesPerView={"auto"}
        navigation={true}
        freeMode={true}
        centeredSlides={false}
        modules={[Navigation, FreeMode]}
        className="mySwiper w-full playlist-swiper"
      >
        {playlists.map((playlist) => (
          <SwiperSlide key={playlist.id} className="max-w-[150px] mr-6">
            <div className="w-full flex flex-col">
              <div className="w-full">
                <Link to={`/playlists/${playlist.id}`}>
                  <img
                    src={playlist.images[0].url}
                    alt="playlist cover"
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                </Link>
              </div>
              <div className="pt-2 flex flex-col">
                <span className="text-white">{playlist.name}</span>
                {playlist.tracks.total === 0 ? (
                  <span className="text-zinc-300 text-sm">
                    By {playlist.owner.display_name}
                  </span>
                ) : (
                  <span className="text-zinc-300 text-sm">
                    {playlist.tracks.total} songs
                  </span>
                )}
                <p className="text-zinc-400 pt-2 leading-4">
                  {playlist.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Playlists;
