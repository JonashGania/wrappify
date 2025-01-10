import RecentTopSongCards from "../Cards/RecentTopSongsCard"
import MostPlayedSongCard from "../Cards/MostPlayedSongCard"
import TopSongsCard from "../Cards/TopSongsCard"
import TopGenresCard from "../Cards/TopGenresCard"
import TopArtistCard from "../Cards/TopArtistCard"
import MostStreamedArtistsCard from "../Cards/MostStreamedArtistsCard"

const Masonry = () => {
    return (
        <section className="w-full py-24">
            <div className="masonry-grid">
                <RecentTopSongCards />
                <MostPlayedSongCard />
                <TopSongsCard />
                <TopGenresCard />
                <TopArtistCard />
                <MostStreamedArtistsCard />
            </div>
        </section>
    )
}

export default Masonry