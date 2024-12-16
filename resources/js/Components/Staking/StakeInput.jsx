import React from "react";
import useGetBalance from "@/Hooks/useGetBalanceFtok";
import Input from "@/Layouts/UI/Input";
import Button from "@/Layouts/UI/Button";
import useStakedAmount from "@/Hooks/useStakedAmount";

export default function StakeInput({
    amount,
    setAmount,
    handleApprove,
    isApproved,
    stakeOrUnstake,
    countdown,
}) {
    const userBalance = useGetBalance();
    const stakedAmount = useStakedAmount();

    return (
        <div className="flex flex-col lg:flex-row items-center gap-[24px] lg:gap-[10px] w-full">
            <Input
                amount={amount}
                setAmount={setAmount}
                balance={
                    stakeOrUnstake === "stake" ? userBalance : stakedAmount
                }
            />
            <div className="w-full msx-w-[full] lg:max-w-[153px]">
                {isApproved ? (
                    <>
                        {stakeOrUnstake === "stake" ? (
                            <Button disabled={!amount} type="stake" />
                        ) : (
                            <Button
                                disabled={!amount || countdown}
                                type="unstake"
                            />
                        )}
                    </>
                ) : (
                    <Button
                        onClick={handleApprove}
                        disabled={!amount}
                        type="approve"
                    />
                )}

                {/* <button type="submit"></button> */}
            </div>
        </div>
    );
}
