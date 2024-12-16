import useGetUsdtData from "@/Hooks/useGetUsdtData";
import useGetUserDataForPool from "@/Hooks/useGetUserDataForPool";
import React from "react";

export default function ContributionInfo({ project, phase }) {
    const { usdtBalance, userAlloc } = useGetUsdtData(project.pool_id);

    return (
        <div className="flex flex-col items-start gap-[20px] p-[12px] rounded-[3px] bg-[#21221D] w-full">
            <div className="flex items-center justify-between w-full">
                <p className="text-[#FCFCFC] text-[20px] lg:text-[24px] font-semibold">
                    Allocation
                </p>
                <p className="text-[#E2FD70] text-[14px] lg:text-[16px] font-normal">
                    {phase}
                </p>
            </div>
            <div className="flex flex-col items-start gap-[7px] w-full">
                <div className="flex items-center justify-between w-full rounded-[4px] p-[4px] pr-[6px] bg-[#232A26]">
                    <div className="flex items-center gap-[8px]">
                        <div className="p-[3px] rounded-[3px] bg-[#293A36]">
                            <img src="/images/contribute/currency.svg" alt="" />
                        </div>
                        <p className="text-[#769799] text-[14px] font-normal">
                            Currency
                        </p>
                    </div>
                    <p className="text-[#C2F8FC] text-[16px] font-semibold">
                        USDT
                    </p>
                </div>
                <div className="flex flex-col items-start gap-[7px] w-full">
                    <div className="flex items-center justify-start w-full gap-[8px] p-[4px] rounded-[6px] bg-[#2A2A20]">
                        <div className="p-[10px] rounded-[4px] bg-[#3B3A25]">
                            <img
                                src="/images/contribute/allocation.svg"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-[#9B9A84] text-[14px] font-normal">
                                Your Allocation
                            </p>
                            <p className="text-[#CDCCB1] text-[16px] font-semibold">
                                {userAlloc} USDT
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-full gap-[8px] p-[4px] rounded-[6px] bg-[#232B22]">
                        <div className="p-[10px] rounded-[4px] bg-[#283C2B]">
                            <img src="/images/contribute/balance.svg" alt="" />
                        </div>
                        <div className="flex flex-col items-start gap-[3px]">
                            <p className="text-[#89998E] text-[14px] font-normal">
                                Your Balance
                            </p>
                            <p className="text-[#B9CCBF] text-[16px] font-semibold">
                                {usdtBalance} USDT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
