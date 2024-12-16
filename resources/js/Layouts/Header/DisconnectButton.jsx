import React, { useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";
import Button from "../UI/Button";
import useGetBalance from "@/Hooks/useGetBalance";

export default function DisconnectButton({ disconnect, setShowDisconnect }) {
    const { account } = useContext(Web3Context);
    const balance = useGetBalance();

    const formatAccount = (account) => {
        return `${account.substring(0, 7)}....${account.substring(
            account.length - 7
        )}`;
    };

    const closeHandler = () => {
        setShowDisconnect(false);
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-[#0d0d0dd9] z-50"
                onClick={closeHandler}
            />
            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#1B1B1B] p-[16px] lg:p-[20px] rounded-[12px] border border-solid border-[#323232] flex flex-col items-center gap-[30px] lg:gap-[40px] z-[51] w-[90%] lg:w-auto ">
                <div className="flex flex-col items-center gap-[20px] lg:gap-[24px]">
                    <img
                        src="/images/wallet/user.svg"
                        alt=""
                        className="w-[80px]"
                    />
                    <div className="flex flex-col items-center gap-[10px] lg:gap-[12px]">
                        <p className="text-[14px] lg:text-[16px] font-medium text-[#CCC] tracking-[-0.075px] ">
                            <span className="font-semibold text-[#E2FD70]">
                                Wallet Address:{" "}
                            </span>{" "}
                            {formatAccount(account)}
                        </p>
                        <p className="text-[14px] lg:text-[16px] font-medium text-[#CCC] tracking-[-0.075px] ">
                            <span className="font-semibold text-[#E2FD70]">
                                Balance:{" "}
                            </span>{" "}
                            {balance} Habb
                        </p>
                    </div>
                </div>
                <Button onClick={disconnect} type="disconnect" />
            </div>
        </>
    );
}
