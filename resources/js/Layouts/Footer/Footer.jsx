import React, { useEffect, useState } from "react";
import FooterMain from "./FooterMain";
import FooterItems from "./FooterItems";

const backGround = {
    backgroundImage: `url('/images/footer/footer-bg.png')`, // Replace with your image path
    backgroundSize: "cover", // Cover the entire viewport
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Do not repeat the image
};

const backGroundMobile = {
    backgroundImage: `url('/images/footer/footer-mobile-bg.png')`, // Replace with your image path
    backgroundSize: "cover", // Cover the entire viewport
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Do not repeat the image
};

export default function Footer() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div
                className="w-full p-[30px] lg:p-[60px] pb-[40px] "
                style={isDesktop ? backGround : backGroundMobile}
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[20px] w-full max-w-[1320px] mx-auto">
                    <FooterMain />
                    <FooterItems />
                </div>
            </div>
            <div className="p-[12px] pb-[11px] bg-[#121212] flex items-center justify-center">
                <p className="text-[12px] lg:text-[14px] text-[#555] font-medium">
                    © Copyright 2023 Habb.Finance. All rights reserved.
                </p>
            </div>
        </>
    );
}
