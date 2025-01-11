import { useAuth } from "@/context/AuthProvider"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { getUserProfile } from "@/api"
import { useEffect, useState } from "react"
import { UserProfile } from "@/types"

const Hero = () => {
    const { accessToken, logout }  = useAuth()
    const [userProfile, setUserProfile] = useState<UserProfile>();

    useEffect(() => {
        if (accessToken) {
            getUserProfile(accessToken).then(setUserProfile)
        }

    }, [accessToken])

    if (!userProfile) {
        return <h1>Loading...</h1>
    }

    return (
        <section className="w-full h-screen">
            <div className="flex justify-end">
                <button 
                    onClick={logout}
                    className="hover:bg-primary-color bg-[#21a14e] transition-colors duration-300 px-8 py-2 text-white rounded-3xl"
                >
                    Sign out
                </button>
            </div>
            <div className="flex justify-center items-center text-center pt-24 flex-col px-4">
                <Avatar className="w-[80px] h-[80px]">
                    <AvatarImage 
                        src={userProfile.images[0]?.url} 
                        alt={`${userProfile.display_name}'s Profile`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-white text-3xl font-bold my-24">Hi {userProfile.display_name},</h1>
                <h2 className="text-white font-normal text-2xl">Welcome to your listening journey with Spotify!</h2>
                <p className="text-zinc-300 max-w-[480px] w-full mt-4 mb-24">Every song you streamed has a story to tell—let's rediscover your streaming music, one moment at a time.</p>
            </div>
        </section>
    )
}

export default Hero
