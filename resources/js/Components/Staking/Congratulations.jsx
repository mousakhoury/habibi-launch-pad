import React, { useState } from "react";
import useCopy from "@/Hooks/useCopy";
import styles from "./Congratulations.module.css";
import Button from "@/Layouts/UI/Button";

export default function Congratulations({
    accountData,
    setAccountData,
    closeCongrats,
}) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isCopied, copyToClipboard] = useCopy();

    const handleButtonClick = () => {
        console.log("here");
        window.open("https://t.me/HabbToken_bot", "_blank");
        markAsSpotted();
    };

    const markAsSpotted = async () => {
        try {
            const response = await axios.post("/api/update-status", {
                address: accountData.address, // Replace with the actual account address key
                isSpotted: 1,
            });

            // Handle the response, for example updating the local state or showing a message
            console.log(response.data.message);

            // Update local state to reflect the new status
            setAccountData((prevAccountData) => ({
                ...prevAccountData,
                isSpotted: "1",
            }));
            console.log(accountData);
        } catch (error) {
            console.error("Error updating spotted status:", error);
        }
    };

    return (
        <>
            <div className="fixed w-full h-[100vh] top-0 left-0 bg-[#121212cc] flex justify-center items-center z-[50]" />
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[10px] rounded-[12px] border border-solid border-[#323232] bg-[#1B1B1B] flex flex-col items-center gap-[10px] max-w-[648px] z-[51] scale-90">
                <div className="py-[50px] px-[30px] w-full flex items-center gap-[60px]">
                    <div className="w-[130px] px-[12px] py-[2px]">
                        <img src="/images/tier/Diamond-tier.svg" alt="" />
                    </div>
                    <div className="flex flex-col items-start gap-[8px]">
                        <p className="text-[#E4E4E4] text-[24px] font-semibold leading-[34px]">
                            Congratulations!
                            <br />
                            You Reached Tier 5.
                        </p>
                        <p className="text-[#9C9C9C] text-[16px] font-medium max-w-[338px] leading-[20px]">
                            Join in our exclusive telegram group for only who
                            are in tier 5.
                        </p>
                    </div>
                </div>
                <div className="p-[16px] rounded-[8px] border border-solid border-[#ffffff26] bg-[#272727] flex flex-col items-start w-full">
                    <p className="text-[#E4E4E4] text-[18px] font-semibold max-w-[450px] leading-[25px] mb-[24px]">
                        There are exclusive project for this tier. Get those
                        updates in our telegram Group
                    </p>
                    <ol className="flex flex-col items-start gap-[16px] w-full list-decimal pl-[12px] mb-[20px] max-w-[573px]">
                        <li className="text-[#9C9C9C] text-[14px] font-medium leading-[20px]">
                            If you unstake before receiving all your vestings
                            from any investment in the exclusive group, you will
                            forfeit the eligibility to receive the remaining
                            vestings.
                        </li>
                        <li className="text-[#9C9C9C] text-[14px] font-medium leading-[20px]">
                            If you unstake before recouping your initial
                            investment amount, you will continue to receive
                            vestings until your invested amount is fully
                            recovered. Beyond this point, you will forfeit the
                            eligibility to receive any additional vestings.
                        </li>
                        <li className="text-[#9C9C9C] text-[14px] font-medium leading-[20px]">
                            If you unstake before the project is listed, you
                            will receive a refund for the unlisted project.
                        </li>
                    </ol>
                    <div className="w-full p-[15px] pr-[18px] flex justify-between items-center rounded-[4px] border border-solid border-[#ffffff0d] bg-[#323232] mb-[26px]">
                        <div className="flex gap-[8px] items-center">
                            <p className="text-[#9C9C9C] text-[16px] font-medium">
                                Your Telegram Unique Code:
                            </p>
                            <p className="text-[#E2FD70] text-[16px] font-semibold">
                                {accountData.code}
                            </p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                            {isCopied ? (
                                <>
                                    <img
                                        src="/images/account/check_circle.svg"
                                        alt=""
                                        className="w-[18px] lg:w-[20px]"
                                    />
                                    <p className="text-[#57D37D] text-[12px] lg:text-[14px] font-medium    leading-[24px] lg:leading-[28px]">
                                        Copied!
                                    </p>
                                </>
                            ) : (
                                <img
                                    src="/images/account/copy.svg"
                                    alt=""
                                    className="w-[24px] lg:w-[28px] cursor-pointer"
                                    onClick={() =>
                                        copyToClipboard(accountData.code)
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <div className="mb-[32px]">
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                name="accept"
                                id="accept"
                                onChange={(e) =>
                                    setAcceptedTerms(e.target.checked)
                                }
                            />
                            <span className={styles.checkmark}></span>
                            <p>
                                To join on our group, you need to accept the
                                rules and conditions
                            </p>
                        </label>
                    </div>

                    <Button
                        onClick={handleButtonClick}
                        disabled={!acceptedTerms}
                        type="telegram"
                    />
                </div>

                <img
                    src="/images/staking/close-button.svg"
                    onClick={closeCongrats}
                    alt=""
                    className="w-[35px] cursor-pointer absolute top-[10px] right-[10px]"
                />
            </div>
        </>
    );
}
