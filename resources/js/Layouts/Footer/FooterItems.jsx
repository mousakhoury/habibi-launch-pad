import React from "react";

export default function FooterItems() {
    const categories = [
        {
            name: "Pages",
            links: [
                {
                    name: "Dashboard",
                    url: "#",
                },
                {
                    name: "Account",
                    url: "#",
                },
                {
                    name: "Stacking",
                    url: "#",
                },
                {
                    name: "All Project",
                    url: "#",
                },
            ],
        },
        {
            name: "Resources",
            links: [
                {
                    name: "Website",
                    url: "#",
                },
                {
                    name: "Tier System",
                    url: "#",
                },
                {
                    name: "Contact Us",
                    url: "#",
                },
                {
                    name: "Apply for IDO",
                    url: "#",
                },
            ],
        },
        {
            name: "Quick Links",
            links: [
                {
                    name: "Privacy Policy",
                    url: "#",
                },
                {
                    name: "About us",
                    url: "#",
                },
            ],
        },
    ];

    return (
        <div className="flex items-start flex-wrap lg:flex-nowrap justify-center lg:justify-between w-full max-w-[690px] gap-[40px] lg:gap-[20px] ">
            {categories.map((cat) => (
                <div
                    key={cat.name}
                    className="flex flex-col items-start gap-[20px] lg:gap-[30px] w-full max-w-[96px] lg:max-w-[186px]"
                >
                    <h5 className="text-[16px] lg:text-[20px] text-[#FCFCFC] font-semibold">
                        {cat.name}
                    </h5>
                    <div className="flex flex-col items-start gap-[12px] lg:gap-[24px]">
                        {cat.links.map((link) => (
                            <a href={link.url} key={link.name}>
                                <p className="text-[12px] lg:text-[14px] text-[#9C9C9C] font-medium">
                                    {link.name}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
