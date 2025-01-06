import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from 'swiper/modules';
import { useState } from "react";
import TopSongsLastFourWeeks from "./swiper-slides/Slide1";
import MostPlayedSong from "./swiper-slides/Slide2";
import TopSongs from "./swiper-slides/slide3";
import TopGenres from "./swiper-slides/Slide4";

import 'swiper/css';
import 'swiper/css/pagination';

const WrappedSwiper = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full mt-24">
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }} 
                pagination={{ clickable: true }} 
                modules={[Pagination, Autoplay]}
                speed={2000}
                simulateTouch={false}
                className="max-w-[900px] h-[580px] mx-auto rounded-xl"
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
                    <TopGenres />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default WrappedSwiper