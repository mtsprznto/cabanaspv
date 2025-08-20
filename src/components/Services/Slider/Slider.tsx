import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { sliderDataImages } from "./Slider.data";
import Image from "next/image";

export function Slider() {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={15}
      freeMode={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      modules={[Navigation, Scrollbar]}
      className="w-full max-w-full md:max-w-[1000px] mx-auto h-[240px] md:h-[290px]"
      grabCursor
    >
      {sliderDataImages.map(({ id, urlImage }) => (
        <SwiperSlide key={id} className="relative md:w-[300px] w-full h-full">
          <Image
            src={`/assets/houses/${urlImage}`}
            alt="House"
            fill
            className="rounded-xl object-cover w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
