import React, { useState } from "react";
import useGetUsdtData from "@/Hooks/useGetUsdtData";
import Input from "@/Layouts/UI/Input";
import Button from "@/Layouts/UI/Button";
import useAllowanceApprove from "@/Hooks/Contribute/useAllowanceApprove";
import useInvest from "@/Hooks/Contribute/useInvest";
import ContributeSuccess from "./ContributeSuccess";

export default function ContributeInputs({ project, phase }) {
    const {
        usdtAllowance,
        usdtBalance,
        userAlloc,
        setUsdtAllowance,
        getUsdtAllowance,
    } = useGetUsdtData(project.pool_id);
    const [amount, setAmount] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleApprove = useAllowanceApprove(
        project.pool_id,
        userAlloc,
        setUsdtAllowance,
        getUsdtAllowance,
        amount
    );

    const handleInvestmentSubmit = useInvest(
        project.pool_id,
        amount,
        setShowSuccess
    );

    return (
        <>
            <form
                onSubmit={handleInvestmentSubmit}
                className="flex flex-col items-start gap-[24px] w-full"
            >
                <div className="flex flex-col items-start gap-[8px] w-full">
                    <p className="text-[#555] text-[14px] font-normal">
                        Place your allocation
                    </p>
                    <Input
                        amount={amount}
                        setAmount={setAmount}
                        balance={userAlloc}
                    />
                </div>

                {usdtAllowance == 0 || usdtAllowance < parseFloat(amount) ? (
                    <Button
                        onClick={handleApprove}
                        disabled={!amount}
                        type="approve"
                    />
                ) : (
                    <Button
                        type={"contribute"}
                        disabled={userAlloc < parseFloat(amount)}
                    />
                )}
            </form>

            {showSuccess && <ContributeSuccess amount={amount} phase={phase} />}
        </>
    );
}
