import { useAuth } from "@/context/AuthProvider";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { getUserProfile } from "@/api";
import { useEffect, useState } from "react";
import { UserProfile } from "@/types";

const Hero = () => {
  const { accessToken, logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (accessToken) {
      getUserProfile(accessToken).then(setUserProfile);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!userProfile) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="hover:bg-primary-color bg-[#21a14e] transition-colors duration-300 px-8 py-2 text-white rounded-3xl"
        >
          Sign out
        </button>
      </div>
      <div className="flex flex-1 justify-center items-center text-center flex-col px-4">
        <Avatar
          className={`w-[90px] h-[90px] sm:w-[125px] sm:h-[125px] transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <AvatarImage
            src={userProfile.images[0]?.url}
            alt={`${userProfile.display_name}'s Profile`}
            className="border-4 border-primary-color rounded-full"
          />
          <AvatarFallback>
            {userProfile.display_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1
          className={`text-white text-4xl sm:text-5xl font-bold my-16 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Welcome back, <br />
          <span className="text-primary-color">{userProfile.display_name}</span>
        </h1>
        <h2
          className={`text-white font-normal text-xl sm:text-2xl transition-all duration-1000 delay-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Cheers to your listening journey with Spotify 🥂
        </h2>
        <p
          className={`text-zinc-300 max-w-[480px] w-full mt-4 mb-24 transition-all duration-1000 delay-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Every song you streamed has a story to tell—let's rediscover your
          streaming music, one moment at a time.
        </p>
      </div>
    </section>
  );
};

export default Hero;
