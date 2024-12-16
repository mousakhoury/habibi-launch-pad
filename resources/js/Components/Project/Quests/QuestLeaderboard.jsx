import React from "react";
import useGetAccount from "@/Hooks/useGetAccount";
import useNumberComma from "@/Hooks/useNumberComma";

export default function QuestLeaderboard({
    allAccounts,
    closeLeaderboardHandler,
}) {
    const accounts = allAccounts
        .slice() // Create a copy of the accounts array to avoid mutating the original
        .sort((a, b) => b.points - a.points) // Sort by points descending
        .map((allAccounts, index) => ({
            ...allAccounts,
            rank: (index + 1).toString().padStart(2, "0"), // Assign rank with leading zero
        }));

    const { matchedAccount } = useGetAccount({ accounts });

    const formatAccount = (account) => {
        return `${account.substring(0, 6)}....${account.substring(
            account.length - 6
        )}`;
    };

    return (
        <div className="flex flex-col items-start gap-[20px] w-full">
            <div
                onClick={closeLeaderboardHandler}
                className="flex items-center gap-[12px] cursor-pointer"
            >
                <img
                    src="/images/project/link-arrow.svg"
                    alt=""
                    className="w-[20px]"
                />
                <p className="text-[#CCC] text-[12px] lg:text-[14px] font-medium">
                    Back
                </p>
            </div>
            <div className="flex flex-col items-start gap-[40px] w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-[20px] p-[13px] rounded-[6px] bg-[#272727]">
                        <div className="flex items-center gap-[8px]">
                            <img src="/images/project/my-rank.svg" alt="" />
                            <div className="flex items-center gap-[6px] leading-[20px]">
                                <p className="text-[#9C9C9C] text-[16px] font-medium">
                                    My Rank -
                                </p>
                                <p className="text-[#E2FD70] text-[16px] font-semibold">
                                    {matchedAccount.rank}
                                </p>
                            </div>
                        </div>
                        <hr className=" h-[20px] border-r border-solid border-[#ffffff1a]" />
                        <div className="flex items-center gap-[8px]">
                            <img src="/images/project/my-points.svg" alt="" />
                            <div className="flex items-center gap-[6px] leading-[20px]">
                                <p className="text-[#9C9C9C] text-[16px] font-medium">
                                    My Points -
                                </p>
                                <p className="text-[#E2FD70] text-[16px] font-semibold">
                                    {matchedAccount.points}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center border border-solid border-[#323232] rounded-[6px] max-w-[200px]">
                        <img
                            src="/images/project/leaderboard-search.svg"
                            alt=""
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent !border-0 text-[14px] "
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start w-full">
                    <div className="flex items-center justify-between w-full px-[16px] py-[10px] text-[#6D6D6D] text-[14px] font-medium border-b border-solid border-[#3D3D3D]">
                        <div className="flex items-center">
                            <p className="w-[134px]">Rank</p>
                            <p>Wallet Address</p>
                        </div>
                        <p>Points</p>
                    </div>

                    {accounts.map((account, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between w-full p-[16px] text-[#CCC] text-[16px] font-medium border-b border-solid border-[#ffffff1a]"
                        >
                            <div className="flex items-center">
                                <p className="w-[134px]">{account.rank}</p>
                                <p>
                                    {formatAccount(account.address)}{" "}
                                    {account.address ===
                                        matchedAccount.address && (
                                        <span className="text-[#E2FD70]">
                                            (me)
                                        </span>
                                    )}
                                </p>
                            </div>
                            <p>{useNumberComma(account.points)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
