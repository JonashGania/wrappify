import Hero from "@/components/Sections/Hero"
import WrappedSwiper from "@/components/Sections/WrappedSwiper"
import Masonry from "@/components/Sections/Masonry"
import Playlists from "@/components/Sections/Playlists"

const MainLayout = () => {
    return (
        <div className="w-full px-8 py-8">
            <Hero />
            <WrappedSwiper />
            <Masonry />
            <Playlists />
        </div>
    )
}

export default MainLayout