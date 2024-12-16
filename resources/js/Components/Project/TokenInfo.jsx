import useNumberComma from "@/Hooks/useNumberComma";
import React from "react";

export default function TokenInfo({ project }) {
    const tokenInfo = [
        {
            name: project.deal_type,
            amount: `$ ${useNumberComma(project.amount_target)}`,
        },
        {
            name: "Number of Tokens",
            amount: useNumberComma(
                (project.amount_target / project.price).toFixed(0)
            ),
        },
        {
            name: "Token Price",
            amount: `$ ${project.price}`,
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row items-start gap-[16px] lg:gap-[26px] w-full">
            {tokenInfo.map((info) => (
                <div
                    key={info.name}
                    className="flex flex-col items-start gap-[8px] lg:gap-[12px] p-[12px] lg:p-[20px] w-full rounded-[6px] bg-[#252525]"
                >
                    <p className="text-[#848484] text-[12px] lg:text-[16px] font-medium">
                        {info.name}
                    </p>
                    <p className="text-[#FCFCFC] text-[16px] lg:text-[20px] font-semibold">
                        {info.amount}
                    </p>
                </div>
            ))}
        </div>
    );
}
