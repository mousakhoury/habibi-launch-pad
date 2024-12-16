import useNumberComma from "@/Hooks/useNumberComma";
import React from "react";

export default function TokenomicsInfo({ project }) {
    const tokenomics = [
        {
            name: "Market cap",
            info: project.market_cap
                ? `$${useNumberComma(project.market_cap)}`
                : "TBA",
        },
        {
            name: "FDMC",
            info: project.fdmc ? `$${useNumberComma(project.fdmc)}` : "TBA",
        },
        {
            name: "Total Supply",
            info: project.total_supply
                ? `${useNumberComma(project.total_supply)} ${project.sub_name}`
                : "TBA",
        },
        {
            name: "Circulating",
            info: project.circulating
                ? `${useNumberComma(project.circulating)} ${project.sub_name}`
                : "TBA",
        },
    ];

    return (
        <div className="flex flex-col items-start gap-[12px] lg:gap-[16px] w-full">
            <h4 className="text-[#FCFCFC] gap-[16px] lg:text-[20px] font-semibold">
                Tokenomics
            </h4>
            <div className="flex flex-col items-start gap-[8px] lg:gap-[12px]">
                {tokenomics.map((info) => (
                    <p
                        key={info.name}
                        className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-normal"
                    >
                        {info.name}:{" "}
                        <span className="text-[#E4E4E4] font-medium">
                            {info.info}
                        </span>
                    </p>
                ))}
            </div>
        </div>
    );
}
