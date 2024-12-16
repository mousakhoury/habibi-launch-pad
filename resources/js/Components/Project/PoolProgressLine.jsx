import useGetPoolData from "@/Hooks/useGetPoolData";
import useNumberComma from "@/Hooks/useNumberComma";
import React from "react";

export default function PoolProgressLine({ project }) {
    const { amountRaised, percentageRaised } = useGetPoolData({ project });

    return (
        <div className="flex flex-col gap-[20px] px-[16px] w-full">
            <p className="text-[#E4E4E4] text-[20px] font-semibold">
                Progress Timeline
            </p>
            <div className="flex flex-col items-start gap-[12px] w-full px-[12px] py-[20px] rounded-[6px] border border-solid border-[#252525] bg-[#252525]">
                <div className="flex items-center justify-between w-full">
                    <p className="text-[#848484] text-[16px] font-medium leading-[20px]">
                        Progress
                    </p>
                    <p className="text-[#E2FD70] text-[14px] font-normal leading-[17px]">
                        {percentageRaised}%
                    </p>
                </div>
                <div className="w-full h-[8px] rounded-[100px] bg-[#121212]">
                    <div
                        className="h-[8px] rounded-[100px] bg-[#E2FD70]"
                        style={{ width: `${percentageRaised}%` }}
                    />
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-[#6D6D6D] text-[14px] font-normal leading-[17px]">
                        Target ${useNumberComma(project.amount_target)}
                    </p>
                    <p className="text-[#CCC] text-[14px] font-medium leading-[17px]">
                        Raised ${useNumberComma(amountRaised)}
                    </p>
                </div>
            </div>
        </div>
    );
}
