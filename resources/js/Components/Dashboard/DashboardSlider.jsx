import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./DashboardSlider.module.css";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
    Autoplay,
} from "swiper/modules";

export default function DashboardSlider({ news, onSlideChange }) {
    const swiperRef = useRef(null);
    const extractAndTruncateParagraph = (htmlString, charLimit, slug) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        const paragraphs = doc.querySelectorAll("p");
        for (let p of paragraphs) {
            if (p.children.length === 0) {
                let textContent = p.textContent;
                if (textContent.length > charLimit) {
                    textContent = textContent.substring(0, charLimit) + " ";
                    textContent += `<a href='/news/${slug}' class="text-[#E2FD70] font-semibold cursor-pointer">See more...</a>`;
                }
                return `<p>${textContent}</p>`;
            }
        }
        return ""; // Return an empty string if no such <p> tag is found
    };

    function formatDate(dateString) {
        const options = { day: "2-digit", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", options);
    }

    const handleSlideClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop();
        }
    };

    return (
        <Swiper
            ref={swiperRef}
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className="NewsSwiper h-full"
            onSlideChange={(swiper) =>
                onSlideChange(news[swiper.activeIndex].image)
            }
            autoplay={{
                delay: 3000, // 3 seconds
                disableOnInteraction: false,
            }}
        >
            {news.map((newsItem, index) => (
                <SwiperSlide
                    key={index}
                    className={styles.NewsSlide}
                    onClick={handleSlideClick}
                >
                    <div className="flex flex-col items-start gap-[36px] h-full">
                        <div className="flex flex-col items-start gap-[18px]">
                            <div className="flex items-start gap-[10px]">
                                {newsItem.category.map((cat, index) => (
                                    <div
                                        key={index}
                                        className="flex px-[8px] py-[3px] rounded-[100px] bg-[#3D3D3D]"
                                    >
                                        <p className="text-[#ccc] text-[14px] font-medium">
                                            {cat.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start gap-[8px]">
                                <h4 className="text-[#FCFCFC] text-[28px] font-semibold leading-[35px]">
                                    {newsItem.title}
                                </h4>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: extractAndTruncateParagraph(
                                            newsItem.body,
                                            200,
                                            newsItem.slug
                                        ),
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full flex-wrap-reverse gap-[18px]">
                            <div className="flex items-center gap-[12px]">
                                <img
                                    src={`/storage/${newsItem.user.image}`}
                                    alt=""
                                    className="w-[40px] h-[40px] object-cover rounded-[100px]"
                                />
                                <div className="flex flex-col items-start gap-[4px]">
                                    <h6 className="text-[#ccc] text-[16px] font-semibold leading-[20px]">
                                        {newsItem.user.name}
                                    </h6>
                                    <p className="text-[#848484] text-[14px] font-normal leading-[17px]">
                                        {formatDate(newsItem.created_at)}
                                    </p>
                                </div>
                            </div>
                            {/* <a href="" className="flex items-center gap-[8px]">
                                <p className="text-[#E2FD70] text-[14px] font-medium">
                                    Read on Medium
                                </p>
                                <img
                                    src="/images/dashboard/read-arrow-right.svg"
                                    alt=""
                                />
                            </a> */}
                        </div>
                        <div className="flex flex-col items-start gap-[20px] border-t border-solid border-[#252525] w-full h-[50px] "></div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
