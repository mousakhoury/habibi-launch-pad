import useCopy from "@/Hooks/useCopy";
import React from "react";

export default function PaymentQR() {
    const [isCopied, copyToClipboard] = useCopy();
    return (
        <div className="flex flex-col items-start gap-[30px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[648px] rounded-[8px] border border-solid border-[#3D3D3D] bg-[#252525] p-[20px] pb-[40px] z-[51]">
            <p className="text-[#FCFCFC] text-[20px] font-semibold">
                Scan this QR code to pay
            </p>
            <div className="flex flex-col items-center gap-[30px] w-full">
                <div className="flex flex-col items-center gap-[24px] w-full">
                    <img
                        src="images/prepaid/qr-code.png"
                        alt=""
                        className="w-[300px] rounded-[12px]"
                    />

                    <div className="flex items-center justify-center gap-[12px] py-[6px] pl-[25px] pr-[22px] rounded-[100px] border border-solid border-[#ffffff26] bg-[#303030]">
                        <p className="text-[#9C9C9C] text-[14px] font-medium">
                            0xE605368295C0C36EFF65540e79FCA2bFF3acfD2b
                        </p>
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
                                    copyToClipboard(
                                        "0xE605368295C0C36EFF65540e79FCA2bFF3acfD2b"
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
                <p className="text-[#9C9C9C] text-[14px] text-center font-medium max-w-[392px]">
                    This QR code is linked with our Metamask payment method.
                    After you scan it with your Metamask, the payment will be
                    automatically complete.
                </p>
            </div>
        </div>
    );
}
