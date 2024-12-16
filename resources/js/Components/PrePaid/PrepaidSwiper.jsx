import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function PrepaidSwiper({ images }) {
    console.log(images);
    return (
        <>
            <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: false,
                }}
                className="prepaidSwiper w-full rounded-[12px] border-2 border-[#3D3D3D]"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`storage/${image.image}`}
                            alt=""
                            className="w-full aspect-[343/280] lg:aspect-[1320/340] object-cover "
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
