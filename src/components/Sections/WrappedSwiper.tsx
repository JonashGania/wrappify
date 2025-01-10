import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from 'swiper/modules';
import { useState } from "react";
import TopSongsLastFourWeeks from "../SwiperSlides/Slide1";
import MostPlayedSong from "../SwiperSlides/Slide2";
import TopSongs from "../SwiperSlides/slide3";
import TopGenres from "../SwiperSlides/Slide4";
import TopArtist from "../SwiperSlides/Slide5";
import MostStreamedArtists from "../SwiperSlides/Slide6";

import 'swiper/css';
import 'swiper/css/pagination';

const WrappedSwiper = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full mt-16 md:py-24">
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }} 
                pagination={{ clickable: true }} 
                modules={[Pagination, Autoplay]}
                speed={2000}
                className="max-w-[1000px] min-h-[580px] mx-auto rounded-xl"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                <SwiperSlide>
                    <TopSongsLastFourWeeks />
                </SwiperSlide>
                <SwiperSlide>
                    <MostPlayedSong isActive={activeIndex === 1}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TopSongs isActive={activeIndex === 2}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TopGenres isActive={activeIndex === 3}/>
                </SwiperSlide>
                <SwiperSlide>
                    <TopArtist isActive={activeIndex === 4}/>
                </SwiperSlide>
                <SwiperSlide>
                    <MostStreamedArtists isActive={activeIndex === 5}/>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default WrappedSwiper