import React, { useContext } from "react";
import useTVL from "@/Hooks/useTVL";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";
import useTotalUnstakedPrice from "@/Hooks/useTotalUnstakedPrice";
import useNumberComma from "@/Hooks/useNumberComma";

export default function StakingElements() {
    const { StakeAddress, StakeV1 } = useContext(BlockchainContext);
    const { web3 } = useContext(Web3Context);
    const totalLockedTokens = useTVL(StakeAddress);
    const totalLockedTokens2 = useTVL(StakeV1);
    const totalUnstakedPrice = useTotalUnstakedPrice(
        totalLockedTokens,
        totalLockedTokens2
    );

    const elements = [
        {
            title: "Total Locked Value",
            content: `$${useNumberComma(totalUnstakedPrice)}`,
            image: "token-value.svg",
        },
        {
            title: "Total Locked Amount",
            content: useNumberComma(totalLockedTokens + totalLockedTokens2),
            image: "token-amount.svg",
        },
        {
            title: "Minimum Tier Token Amount",
            content: `10,000,000`,
            image: "minimum-tier.svg ",
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row items-start gap-[16px] lg:gap-[24px] w-full">
            {elements.map((ele, index) => (
                <div
                    key={index}
                    className="rounded-[8px] bg-[#1B1B1B] p-[16px] lg:p-[24px] flex items-center gap-[20px] w-full"
                >
                    <img
                        src={`/images/staking/${ele.image}`}
                        alt=""
                        className="w-[56px] lg:w-[66px]"
                    />
                    <div className="flex flex-col gap-[12px] items-start">
                        <p className="text-[#848484] text-[12px] lg:text-[16px] font-medium tracking-[-0.075px] leading-[15px] lg:leading-[20px] ">
                            {ele.title}
                        </p>
                        <p className="text-[#FCFCFC] text-[20px] lg:text-[28px] font-semibold tracking-[-0.075px] leading-[25px] lg:leading-[34px] ">
                            {ele.content}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
