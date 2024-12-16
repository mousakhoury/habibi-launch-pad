import React, { useContext } from "react";
import useGetBalance from "@/Hooks/useGetBalance";
import { Web3Context } from "@/Store/Web3Context";
import useCopy from "@/Hooks/useCopy";
import useIsMobile from "@/Hooks/useIsMobile";

export default function AccountInfo() {
    const { web3, account } = useContext(Web3Context);
    const balance = useGetBalance();
    const [isCopied, copyToClipboard] = useCopy();
    const isMobile = useIsMobile();

    const formatAccount = (account) => {
        return `${account.substring(0, 10)}....${account.substring(
            account.length - 10
        )}`;
    };

    return (
        <div className="flex flex-col items-start gap-[24px] rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B] p-[16px] w-full">
            <h1 className="text-[#FCFCFC] text-[20px] lg:text-[24px] font-semibold">
                My Account
            </h1>

            {account ? (
                <div className="flex flex-col items-start gap-[12px] w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-[8px]">
                            <img
                                src="/images/account/wallet.svg"
                                alt=""
                                className="w-[20px] lg:w-[24px]"
                            />
                            <p className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-medium">
                                Wallet Address
                            </p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <p className="text-[#9C9C9C] text-[12px] lg:text-[16px] font-medium">
                                Balance
                            </p>
                            <p className="text-[#E4E4E4] text-[12px] lg:text-[16px] font-medium">
                                {balance} HABB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-[11px] pl-[14px] w-full rounded-[6px] bg-[#252525]">
                        <p className="text-[#E4E4E4] text-[14px] lg:text-[18px] font-medium">
                            {isMobile ? formatAccount(account) : account}
                        </p>
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
                                    onClick={() => copyToClipboard(account)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-[6px] w-full h-[86px]">
                    <p className="text-[#CCC] text-[20px] font-semibold">
                        Account Not Found
                    </p>
                    <p className="text-[#848484] text-[14px] font-normal">
                        Connect your wallet to see your account status
                    </p>
                </div>
            )}
        </div>
    );
}
