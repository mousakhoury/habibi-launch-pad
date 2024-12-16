import React from "react";
import { Link } from "@inertiajs/react";
import Button from "@/Layouts/UI/Button";

export default function DashboardPages() {
    const pages = [
        {
            title: "Participate in IDO",
            paragraph:
                "Please note that this opportunity is exclusively for project applications seeking incubation/launch, and not open to individuals.",
            url: "#",
        },
        {
            title: "Tiers Demystified",
            paragraph: "Explore the Allocation System: Learn More Here!",
            url: "#",
        },
    ];

    return (
        <div className="flex items-start gap-[16px] flex-wrap-reverse lg:flex-nowrap w-full">
            {pages.map((page) => (
                <div
                    key={page.title}
                    className="w-full h-auto lg:h-[207px] p-[20px] flex flex-col items-start justify-between rounded-[8px] gap-[24px] lg:gap-0 bg-[#1B1B1B] "
                >
                    <div className="flex flex-col items-start gap-[16px]">
                        <div className="flex items-start gap-[10px] lg:gap-[12px]">
                            <img
                                src="/images/dashboard/info.svg"
                                alt=""
                                className="w-[24px] lg:w-[30px]"
                            />
                            <h5 className="text-[#E2FD70] text-[20px] lg:text-[24px] font-medium">
                                {page.title}
                            </h5>
                        </div>
                        <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-medium">
                            {page.paragraph}
                        </p>
                    </div>
                    <Link href={page.url}>
                        <Button type={"leanMore"} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
