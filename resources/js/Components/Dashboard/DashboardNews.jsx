import React, { useState } from "react";
import DashboardSlider from "./DashboardSlider";

export default function DashboardNews({ news }) {
    const [currentImage, setCurrentImage] = useState(news[0].image);

    const handleSlideChange = (image) => {
        setCurrentImage(image);
    };

    return (
        <div className="grid grid-col-1 lg:grid-cols-2 gap-[16px] p-[8px] rounded-[8px] bg-[#121212] border border-solid border-[#252525] w-full">
            <img
                src={`/storage/${currentImage}`}
                alt=""
                className="w-full rounded-[6px] h-full object-cover"
            />
            <DashboardSlider news={news} onSlideChange={handleSlideChange} />
        </div>
    );
}
