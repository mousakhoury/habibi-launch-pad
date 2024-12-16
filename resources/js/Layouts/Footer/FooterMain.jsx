import React from "react";

export default function FooterMain() {
    const socials = [
        {
            name: "telegram",
            link: "https://t.me/habibiofficialar",
            image: "telegram.svg",
        },
        {
            name: "twitter",
            link: "https://twitter.com/Habibi_Finance",
            image: "twitter.svg",
        },
        {
            name: "discord",
            link: "#",
            image: "discord.svg",
        },
    ];

    return (
        <div className="flex flex-col items-center lg:items-start gap-[24px] lg:gap-[60px]">
            <img
                src="/images/footer/footer-logo.svg"
                alt=""
                className="w-[74.286px] lg:w-[111.429px]"
            />
            <div className="flex flex-col items-center lg:items-start gap-[18px] lg:gap-[23px]">
                <div className="flex flex-col items-center lg:items-start gap-[8px] lg:gap-[16px]">
                    <p className="text-[20px] lg:text-[24px] text-[#FCFCFC] text-center lg:text-left font-semibold">
                        Join Habibi Today
                    </p>
                    <p className="text-[14px] lg:text-[16px] text-[#B4B4B4] text-center lg:text-left font-medium max-w-[307px] lg:max-w-[369px]">
                        You will find all the details updates there about HABIBI
                        also about our upcoming projects
                    </p>
                </div>
                <div className="flex items-start gap-[16px] lg:gap-[30px]">
                    {socials.map((link) => (
                        <a href={link.link} key={link.name}>
                            <img
                                src={`/images/footer/${link.image}`}
                                alt=""
                                className="w-[30px] lg:w-[40px]"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
