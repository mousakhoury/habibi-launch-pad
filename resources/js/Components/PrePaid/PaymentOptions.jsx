import Button from "@/Layouts/UI/Button";
import React, { useState } from "react";
import PaymentQR from "./PaymentQR";

export default function PaymentOptions({ closeOPtionsHandler }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [openQR, setOpenQR] = useState(false);

    const options = [
        {
            type: "metamask",
            title: "Pay with wallet",
            subTitle: "Simplify Payments with Metamask Wallet Transaction",
            image: "images/prepaid/metamask-option.svg",
        },
        {
            type: "scan",
            title: "Scan QR code",
            subTitle: "Scan Metamask QR Code to Pay Effortlessly",
            image: "images/prepaid/scan--option.svg",
        },
    ];

    const selectOptionHandler = (option) => {
        setSelectedOption(option);
    };

    const doOptionHandler = () => {
        if (selectedOption === "metamask") {
            closeOPtionsHandler();
        } else if (selectedOption === "scan") {
            setOpenQR(true);
        }
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-[100vh] bg-[#121212e6] z-[50]"
                onClick={closeOPtionsHandler}
            />

            {openQR ? (
                <PaymentQR />
            ) : (
                <div className="flex flex-col items-start gap-[30px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[656px] rounded-[8px] border border-solid border-[#3D3D3D] bg-[#252525] p-[20px] z-[51]">
                    <div className="flex flex-col items-start gap-[20px] w-full">
                        <p className="text-[#FCFCFC] text-[20px] font-semibold">
                            Select your Metamask Payment Option
                        </p>
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            {options.map((option) => (
                                <div
                                    key={option.type}
                                    onClick={() => {
                                        selectOptionHandler(option.type);
                                    }}
                                    className={`flex items-center gap-[20px] w-full p-[5px] rounded-[8px] border border-solid border-[#3D3D3D] hover:bg-[#1a1a1aa3] cursor-pointer ${
                                        selectedOption === option.type &&
                                        "bg-[#1a1a1aa3]"
                                    }`}
                                >
                                    <img
                                        src={option.image}
                                        alt=""
                                        className="w-[70px]"
                                    />
                                    <div className="flex flex-col items-start gap-[6px]">
                                        <p className="text-[#E4E4E4] text-[20px] font-semibold">
                                            {option.title}
                                        </p>
                                        <p className="text-[#9C9C9C] text-[14px] font-medium">
                                            {option.subTitle}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={doOptionHandler}
                        disabled={!selectedOption}
                        type="next"
                    />
                </div>
            )}
        </>
    );
}
