import Hero from "@/components/Sections/Hero"
import WrappedSwiper from "@/components/Sections/WrappedSwiper"
import Masonry from "@/components/Sections/Masonry"
import Playlists from "@/components/Sections/Playlists"
import Footer from "@/components/Sections/Footer"

const MainLayout = () => {
    return (
        <div className="w-full px-4 sm:px-8 pt-8">
            <Hero />
            <WrappedSwiper />
            <Masonry />
            <Playlists />
            <Footer />
        </div>
    )
}

export default MainLayout