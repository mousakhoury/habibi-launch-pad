import React, { useContext } from "react";
import StakeHistoryLabel from "./StakeHistoryLabel";
import { Web3Context } from "@/Store/Web3Context";

export default function StakeHistory({ histories }) {
    const { account } = useContext(Web3Context);

    const reversedHistories = [...histories].reverse();

    return (
        <div className="flex flex-col items-start gap-[12px] lg:gap-[16px] w-full p-[16px] rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B]">
            <h2 className="text-[#FCFCFC] text-[18px] lg:text-[24px] font-semibold tracking-[-0.075px]">
                Stake History
            </h2>
            <div className="flex flex-col items-start gap-[16px] w-full h-[376px] overflow-y-scroll pr-0 lg:pr-[16px]">
                {reversedHistories.map(
                    (history) =>
                        account === history.address && (
                            <StakeHistoryLabel
                                key={history.id}
                                history={history}
                            />
                        )
                )}
            </div>
        </div>
    );
}
