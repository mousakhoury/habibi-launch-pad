import React from "react";

export default function Input({
    amount,
    setAmount,
    balance,
    placeholder = "Enter Amount",
}) {
    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    };

    const maxAmountHandler = () => {
        setAmount(balance);
    };

    return (
        <div className="flex items-center justify-between py-[13.5px] lg:py-[14px] px-[10px] lg:px-[14px] rounded-[6px] border border-solid border-[#3D3D3D] bg-[#252525] w-full ">
            <input
                type="number"
                placeholder={placeholder}
                onChange={amountChangeHandler}
                value={amount}
                className="p-0 bg-transparent w-full text-[14px] lg:text-[18px] text-[#b7b7b7] font-medium !border-0 !outline-0 !shadow-none tracking-[-0.075px]"
            />
            <div
                onClick={maxAmountHandler}
                className="text-[12px] lg:text-[16px] text-[#9C9C9C] font-medium tracking-[-0.075px] hover:underline cursor-pointer "
            >
                MAX
            </div>
        </div>
    );
}
