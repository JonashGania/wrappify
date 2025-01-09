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
                <div className="grid-row">
                    <RecentTopSongCards />
                    <TopGenresCard />
                </div>
                <div className="grid-row">
                    <MostPlayedSongCard />
                    <TopArtistCard />
                </div>
                <div className="grid-row">
                    <TopSongsCard />
                    <MostStreamedArtistsCard />
                </div>
            </div>
        </section>
    )
}

export default Masonry