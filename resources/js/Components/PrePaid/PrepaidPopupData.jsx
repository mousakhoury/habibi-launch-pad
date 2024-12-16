import Button from "@/Layouts/UI/Button";
import React from "react";

export default function PrepaidPopupData({
    card,
    amount,
    changeAmountHandler,
    goToPrepaidInputsHandler,
}) {
    const maxAmount = card.valueRestrictions.maxVal;
    const minAmount = card.valueRestrictions.minVal;
    const isValidAmount = maxAmount >= amount && amount >= minAmount;

    return (
        <div className="flex flex-col items-start gap-[24px] w-full pt-[16px]">
            <div className="flex flex-col items-start gap-[20px] w-full px-[16px]">
                <div className="flex items-start gap-[20px] w-full">
                    <img
                        src={card.productImage}
                        alt=""
                        className="rounded-[8px] aspect-[300/189.5] object-cover w-full max-w-[300px]"
                    />
                    <div className="flex flex-col items-start gap-[15px] w-full">
                        <div className="flex flex-col items-start gap-[8px] w-full">
                            <p className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px]">
                                {card.brandName}
                            </p>
                            <div className="flex items-start gap-[8px]">
                                <p className="text-[#B4B4B4] text-[14px] font-medium leading-[17px]">
                                    Purchase Limit:
                                </p>
                                <p className="text-[#E2FD70] text-[14px] font-semibold leading-[17px]">
                                    ${minAmount} to ${maxAmount}
                                </p>
                            </div>
                        </div>
                        <hr className="w-full border-[#ffffff1a]" />
                        <div className="flex flex-col items-start gap-[12px] w-full">
                            <div className="flex items-start gap-[8px]">
                                <img
                                    src="/images/prepaid/exchange-rate.svg"
                                    alt=""
                                    className="w-[20px]"
                                />
                                <div className="flex items-start gap-[4px]">
                                    <p className="text-[#B4B4B4] text-[14px] font-normal leading-[17px]">
                                        Exchange Rate:
                                    </p>
                                    <p className="text-[#CCC] text-[14px] font-medium leading-[17px]">
                                        1 USDT = 0.97 USD
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-[8px]">
                                <img
                                    src="/images/prepaid/discount.svg"
                                    alt=""
                                    className="w-[20px]"
                                />
                                <div className="flex items-start gap-[4px]">
                                    <p className="text-[#B4B4B4] text-[14px] font-normal leading-[17px]">
                                        Conversation Fee:
                                    </p>
                                    <p className="text-[#CCC] text-[14px] font-medium leading-[17px]">
                                        {card.discount}%
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-[8px]">
                                <img
                                    src="/images/prepaid/validity.svg"
                                    alt=""
                                    className="w-[20px]"
                                />
                                <div className="flex items-start gap-[4px]">
                                    <p className="text-[#B4B4B4] text-[14px] font-normal leading-[17px]">
                                        Validity:
                                    </p>
                                    <p className="text-[#CCC] text-[14px] font-medium leading-[17px]">
                                        {card.expiryAndValidity
                                            ? expiryAndValidity
                                            : "Undefined"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[24px] w-full">
                    <div className="flex items-center justify-center gap-[8px] py-[11px] rounded-[6px] border border-solid border-[#e266661a] bg-[#e266661a] w-full">
                        <p className="text-[#B4B4B4] text-[18px] font-medium leading-[22px]">
                            Payment Method:
                        </p>
                        <div className="flex items-center gap-[10px]">
                            <p className="text-[#ffffffe6] text-[18px] font-semibold leading-[22px]">
                                Metamask
                            </p>
                            <img
                                src="images/prepaid/metamask.svg"
                                alt=""
                                className="w-[28px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[12px] w-full">
                        <p className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px]">
                            More Details
                        </p>
                        <div className="text-[#9C9C9C] text-[14px] font-medium leading-[17px] h-[120px] overflow-y-scroll">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: card.productDescription,
                                }}
                            ></div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: card.productDescription,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start gap-[8px] w-full px-[16px] pt-[16.682px] pb-[16.318px] border-t border-solid border-[#ffffff1a] bg-[#ffffff0d] rounded-b-[12px]">
                <p className="text-[#9C9C9C] text-[14px] font-medium leading-[17px]">
                    Enter the amount you want to purchase
                </p>
                <div className="flex items-center justify-between w-full py-[3px] pl-[16px] pr-[2px] h-[42px] rounded-[4px] border border-solid border-[#ffffff0d] bg-[#ffffff0d]">
                    <input
                        value={amount}
                        onChange={changeAmountHandler}
                        type="number"
                        placeholder="Enter Amount"
                        className="bg-transparent !px-0 !border-0 text-[#E4E4E4] text-[16px] w-[80%]"
                    />
                    <Button
                        onClick={goToPrepaidInputsHandler}
                        disabled={!isValidAmount}
                        type="buyNow"
                    />
                </div>
            </div>
        </div>
    );
}
