import React, { useContext, useEffect, useState } from "react";
import StakeUnstakeSwitcher from "./StakeUnstakeSwitcher";
import useGetBalance from "@/Hooks/useGetBalanceFtok";
import StakeInput from "./StakeInput";
import useCheckAllowance from "@/Hooks/Staking/useCheckAllowance";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";
import useUnstakeCooldown from "@/Hooks/Staking/useUnstakeCooldown";
import useStakingApprove from "@/Hooks/Staking/useStakingApprove";
import useStakingUnstaking from "@/Hooks/Staking/useStakingUnstaking";
import Congratulations from "./Congratulations";
import useStakedAmount from "@/Hooks/useStakedAmount";

export default function StakingForm({ histories, accounts }) {
    const { web3, account } = useContext(Web3Context);
    const { stakeABI, StakeAddress, FtokAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const [stakeOrUnstake, setStakeOrUnstake] = useState("stake");
    const [isApproved, setIsApproved] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [amount, setAmount] = useState("");

    // Custom Hooks
    const userBalance = useGetBalance();
    const stakedAmount = useStakedAmount();
    const { approved, checkAllowance } = useCheckAllowance({ amount });
    const countdown = useUnstakeCooldown({ histories });
    const handleApprove = useStakingApprove({
        setIsLoading,
        setIsApproved,
        amount,
    });
    const submitHandler = useStakingUnstaking({
        amount,
        stakeOrUnstake,
        isApproved,
        setIsLoading,
        checkAllowance,
        setShowSuccess,
    });

    // Main functions

    useEffect(() => {
        if (account && web3) {
            checkAllowance();
            setIsApproved(approved);
        }
    }, [account, web3]);

    return (
        <>
            <form
                onSubmit={submitHandler}
                className="flex flex-col items-start gap-[24px] w-full p-[16px] rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B]"
            >
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-[#FCFCFC] text-[20px] lg:text-[24px] font-semibold tracking-[-0.075px]">
                        Staking
                    </h1>
                    <StakeUnstakeSwitcher
                        stakeOrUnstake={stakeOrUnstake}
                        setStakeOrUnstake={setStakeOrUnstake}
                    />
                </div>
                <div className="flex flex-col items-start gap-[16px] w-full">
                    <div className="flex items-center justify-between w-full flex-wrap">
                        <p className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-medium tracking-[-0.075px]">
                            How much do you want to stake?
                        </p>
                        <div className="flex items-center gap-[6px]">
                            <p className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-medium tracking-[-0.075px]">
                                Balance:
                            </p>
                            <p className="text-[#E4E4E4] text-[12px] lg:text-[16px] font-medium tracking-[-0.075px]">
                                {userBalance} HABB
                            </p>
                        </div>
                    </div>
                    <StakeInput
                        amount={amount}
                        setAmount={setAmount}
                        handleApprove={handleApprove}
                        isApproved={isApproved}
                        stakeOrUnstake={stakeOrUnstake}
                        countdown={countdown}
                    />
                </div>

                {countdown && stakeOrUnstake === "unstake" ? (
                    <div className="flex flex-col items-center gap-[6px] w-full">
                        <p className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-medium">
                            Unlocking in
                        </p>
                        <p className="text-[#D3CE57] text-[28px] lg:text-[32px] font-medium">
                            {countdown}
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-[10px]">
                        <img
                            src="/images/staking/stake-info.svg"
                            alt=""
                            className="w-[24px]"
                        />
                        <p className="text-[#848484] text-[11px] lg:text-[16px] font-normal tracking-[-0.075px] max-w-[812px] ">
                            Disclaimer: HABB token staking involves financial
                            risk, and potential returns are not guaranteed.
                            Before participating, carefully consider your
                            investment goals and be aware that market
                            fluctuations may impact staking rewards.
                        </p>
                    </div>
                )}

                {showSuccess &&
                    parseFloat(stakedAmount) + parseFloat(amount) !==
                        5000000000 && (
                        <div className="fixed w-full h-[100vh] top-0 left-0 bg-[#121212cc] flex justify-center items-center z-[50]">
                            <div className="px-[12px] lg:px-[84px] py-[40px] lg:py-[81px] rounded-[18px] border border-solid border-[#ffffff0d] bg-[#252525] flex flex-col items-center gap-[32px]">
                                <img
                                    src="/images/staking/success.svg"
                                    alt=""
                                    className="w-[100px] lg:w-[120px]"
                                />
                                <div className="flex flex-col items-center gap-[12px]">
                                    <p className="text-[#E4E4E4] text-[27px] lg:text-[32px] font-semibold text-center">
                                        {stakeOrUnstake === "stake"
                                            ? "Staking"
                                            : "Unstaking"}{" "}
                                        Successful!
                                    </p>
                                    <p className="text-[#9C9C9C] text-[16px] lg:text-[18px] font-medium text-center w-full max-w-[318px]">
                                        Congratulations, the amount of {amount}{" "}
                                        HABB was{" "}
                                        {stakeOrUnstake === "stake"
                                            ? "staked"
                                            : "unstaked"}{" "}
                                        successfully.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
            </form>
        </>
    );
}
