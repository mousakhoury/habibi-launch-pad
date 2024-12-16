import React from "react";

export default function ContributeSuccess({ amount, phase }) {
    const round =
        phase === "Guaranteed" ? "1st" : phase === "FCFS1" ? "2nd" : "3rd";
    return (
        <div className="flex items-center justify-center fixed w-full h-screen top-0 left-0 bg-[#0D0D0DD9]">
            <div className="flex flex-col items-center gap-[32px] py-[84px] w-full max-w-[480px] rounded-[18px] border border-[#ffffff0d] bg-[#252525]">
                <img
                    src="/images/project/Congrats.svg"
                    alt=""
                    className="w-[120px]"
                />
                <div className="flex flex-col items-center gap-[12px]">
                    <p className="text-[#E4E4E4] text-[28px] text-center font-semibold leading-[34px] max-w-[407px]">
                        Contribution of{" "}
                        <span className="text-[#E2FD70]">{amount}</span> USDT
                        was Successful!
                    </p>
                    <p className="text-[#9C9C9C] text-[18px] text-center font-medium leading-[24px] max-w-[362px]">
                        Congratulations, the contribution of {round} round was
                        allocated successfully.
                    </p>
                </div>
            </div>
        </div>
    );
}
