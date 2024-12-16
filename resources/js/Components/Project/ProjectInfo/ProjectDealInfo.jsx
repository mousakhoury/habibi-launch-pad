import React from "react";

export default function ProjectDealInfo({ project }) {
    const dealInfo = [
        {
            name: "Token Price",
            data: project.price,
            image: "/images/project/token_price.svg",
        },
        {
            name: "Vesting",
            data: project.vesting,
            image: "/images/project/vesting.svg",
        },
    ];

    return (
        <div className="flex flex-col items-start gap-[12px] lg:gap-[16px]">
            <h4 className="text-[#FCFCFC] text-[16px] lg:text-[20px] font-semibold">
                Deal Info
            </h4>
            <div className="flex flex-col items-start gap-[12px]">
                {dealInfo.map((info) => (
                    <div
                        key={info.name}
                        className="flex items-start gap-[8px] lg:gap-[12px]"
                    >
                        <img
                            src={info.image}
                            alt=""
                            className="w-[20px] lg:w-[24px]"
                        />
                        <div className="flex items-start lg:items-center gap-[4px] lg:gap-[8px] mt-[1px] lg:mt-0">
                            <p className="text-[#E4E4E4] text-[12px] lg:text-[14px] font-medium">
                                {info.name}:
                            </p>
                            <p className="text-[#9C9C9C] text-[12px] lg:text-[14px] font-medium">
                                {info.data}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
