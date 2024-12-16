import useDateFormater from "@/Hooks/useDateFormater";
import React from "react";

export default function StakeHistoryLabel({ history }) {
    return (
        <div className="p-[16px] w-full rounded-[8px] bg-[#252525] flex flex-col lg:flex-row gap-[12px] items-start lg:items-center justify-between">
            <div className="flex flex-col items-start gap-[8px]">
                <p className="text-[#FCFCFC] text-[14px] lg:text-[18px] font-semibold">
                    {history.amount} HABB
                </p>
                <div className="flex items-center gap-[36px]">
                    <p className="text-[12px] lg:text-[16px] text-[#848484] font-medium">
                        {history.status == "stake" || history.status == "stake2"
                            ? "Staked "
                            : "Unstaked "}
                        on {useDateFormater(history.created_at)}
                    </p>
                    <div className="text-[12px] lg:text-[16px] font-medium hidden lg:block">
                        {history.status == "stake" ||
                        history.status == "stake2" ? (
                            <ul className="text-[#57D37D] list-disc">
                                <li>Staked</li>
                            </ul>
                        ) : (
                            <ul className="text-[#E26666] list-disc">
                                <li>Unstaked</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <a
                href={`https://bscscan.com/tx/${history.transaction_hash}`}
                target="_blank"
            >
                <img
                    src="/images/staking/stake-link-image.svg"
                    alt=""
                    className="w-[20px]"
                />
            </a>
        </div>
    );
}
