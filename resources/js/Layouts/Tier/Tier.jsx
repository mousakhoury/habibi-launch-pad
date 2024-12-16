import React, { useState, useEffect, useContext } from "react";
import useStakedAmount from "@/Hooks/useStakedAmount";
import { Web3Context } from "@/Store/Web3Context";
import useNumberWithSpaces from "@/Hooks/useNumberWithSpaces";

const tierImages = {
    Master: "/images/tier/Master-tier.svg",
    Diamond: "/images/tier/Diamond-tier.svg",
    Platinum: "/images/tier/platinum-tier.svg",
    Gold: "/images/tier/gold-tier.svg",
    Silver: "/images/tier/silver-tier.svg",
    Bronze: "/images/tier/bronze-tier.svg",
    "No Tier": "/images/tier/no-tier-image.svg",
};

// Define thresholds for entering each tier
const tierThresholds = {
    "No Tier": 0,
    Bronze: 10000000, // Minimum for Bronze
    Silver: 50000000, // Minimum for Silver
    Gold: 200000000, // Minimum for Gold
    Platinum: 1000000000, // Minimum for Platinum
    Diamond: 5000000000, // Minimum for Diamond
    Master: 10000000000, // Minimum for Master
};

export default function Tier() {
    const { web3, account } = useContext(Web3Context);
    const stakedAmount = useStakedAmount();
    const formattedStakedAmount = useNumberWithSpaces(stakedAmount);
    const [userTier, setUserTier] = useState({
        name: "No Tier",
        number: 0,
        image: tierImages["No Tier"],
        nextTier: "10 000 000",
        nextTierNumber: 10000000,
        percentageToNextTier: 0,
    });

    useEffect(() => {
        if (account) {
            const updateTierAndProgress = () => {
                let tierName,
                    tierNumber,
                    nextTierAmount,
                    nextTierAmountNumber,
                    percentageToNextTier = 0;

                // Determine the current tier and the next tier threshold
                if (stakedAmount >= 10000000000) {
                    tierName = "Master";
                    tierNumber = 6;
                    nextTierAmount = null; // No next tier for Master
                } else if (stakedAmount >= 5000000000) {
                    tierName = "Diamond";
                    tierNumber = 5;
                    nextTierAmount = "10 000 000 000";
                    nextTierAmountNumber = 10000000000;
                } else if (stakedAmount >= 1000000000) {
                    tierName = "Platinum";
                    tierNumber = 4;
                    nextTierAmount = "5 000 000 000";
                    nextTierAmountNumber = 5000000000;
                } else if (stakedAmount >= 200000000) {
                    tierName = "Gold";
                    tierNumber = 3;
                    nextTierAmount = "1 000 000 000";
                    nextTierAmountNumber = 1000000000;
                } else if (stakedAmount >= 50000000) {
                    tierName = "Silver";
                    tierNumber = 2;
                    nextTierAmount = "200 000 000";
                    nextTierAmountNumber = 200000000;
                } else if (stakedAmount >= 10000000) {
                    tierName = "Bronze";
                    tierNumber = 1;
                    nextTierAmount = "50 000 000";
                    nextTierAmountNumber = 50000000;
                } else {
                    tierName = "No Tier";
                    tierNumber = 0;
                    nextTierAmount = "10 000 000";
                    nextTierAmountNumber = 10000000;
                }

                // Calculate percentage to the next tier if not in the Master tier
                if (nextTierAmountNumber) {
                    let currentTierMin = tierThresholds[tierName];
                    let nextTierMin = nextTierAmountNumber;
                    let progress = stakedAmount - currentTierMin;
                    let totalNeeded = nextTierMin - currentTierMin;
                    percentageToNextTier = (progress / totalNeeded) * 100;
                }

                setUserTier((prevState) => ({
                    ...prevState,
                    name: tierName,
                    number: tierNumber,
                    image: tierImages[tierName],
                    nextTier: nextTierAmount,
                    percentageToNextTier: percentageToNextTier, // Round to 2 decimal places
                }));
            };

            updateTierAndProgress();
        }
    }, [stakedAmount]); // This effect runs whenever stakedAmount changes.

    const dynamicStyles = {
        borderColor:
            userTier.name === "No Tier"
                ? "#252525"
                : userTier.name === "Diamond" || userTier.name === "Master"
                ? "#555D2E"
                : "#1F2019",
        backgroundColor:
            userTier.name === "No Tier"
                ? "#1B1B1B "
                : userTier.name === "Diamond" || userTier.name === "Master"
                ? "#181912"
                : "#181912",
    };

    const insideStyles = {
        borderColor:
            userTier.name === "No Tier"
                ? "#252525"
                : userTier.name === "Diamond" || userTier.name === "Master"
                ? "#464B2E"
                : "#1F2019",
        backgroundColor:
            userTier.name === "No Tier"
                ? "#252525 "
                : userTier.name === "Diamond" || userTier.name === "Master"
                ? "#1F2019"
                : "#1F2019",
    };

    const progressBar = {
        width:
            userTier.name === "Master"
                ? "100%"
                : `${userTier.percentageToNextTier}%`,
    };

    return (
        <div
            className="w-full msx-w-full lg:max-w-[418px] flex flex-col items-start gap-[16px] p-[12px] pt-[20px] rounded-[8px] border border-solid lg:sticky top-[10px]"
            style={dynamicStyles}
        >
            <p className="text-[#FCFCFC] text-[18px] lg:text-[24px] font-semibold pl-[12px]">
                My Tier
            </p>
            <div
                className="w-full p-[20px] flex flex-col items-center justify-center gap-[40px] rounded-[6px] border border-solid"
                style={insideStyles}
            >
                <div className="flex flex-col items-center justify-center gap-[30px] w-full">
                    <div className="flex flex-col items-center justify-center gap-[12px] w-full">
                        <img
                            src={userTier.image}
                            alt={userTier.name}
                            className="w-[100px] lg:w-[110px]"
                        />
                        {userTier.name === "No Tier" ? (
                            <div className="flex flex-col items-center justify-center gap-[8px] w-full">
                                <p className="text-[#E4E4E4] text-[18px] lg:text-[20px] font-semibold">
                                    No Tier Yet
                                </p>
                                <p className="text-[#6D6D6D] text-[14px] lg:text-[16px] text-center w-full max-w-[300px] font-medium leading-[20px]">
                                    A minimum stake of 10,000,000 HABB is
                                    required to qualify for a tier.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-[8px]">
                                <p className="text-[#E4E4E4] text-[18px] lg:text-[20px] font-semibold leading-[25px]">
                                    Tier {userTier.number}
                                </p>
                                <p className="text-[#6D6D6D] text-[16px] font-medium leading-[20px]">
                                    Tier name{" "}
                                    <span className="text-[#E2FD70]">
                                        {userTier.name}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-[12px] w-full">
                        <div className="w-full h-[8px] rounded-[100px] bg-[#3D3D3D]">
                            <div
                                className="h-[8px] rounded-[100px] bg-[#E2FD70]"
                                style={progressBar}
                            />
                        </div>
                        {userTier.name === "Master" ? (
                            <p className="text-[#6D6D6D] text-[12px] lg:text-[14px] font-medium">
                                {formattedStakedAmount}
                            </p>
                        ) : (
                            <p className="text-[#6D6D6D] text-[12px] lg:text-[14px] font-medium">
                                {formattedStakedAmount} / {userTier.nextTier}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[8px] w-full">
                    <p className="text-[#6D6D6D] text-[12px] lg:text-[14px] font-medium">
                        Total Staked Till Now
                    </p>
                    <p className="text-[#E4E4E4] text-[18px] lg:text-[20px] font-semibold">
                        {formattedStakedAmount} HABB
                    </p>
                </div>
            </div>
        </div>
    );
}
