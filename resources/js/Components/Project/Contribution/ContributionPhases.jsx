import React from "react";
import { useContributionTexts } from "@/Hooks/Contribute/useContributionTexts";
import { useContributionColor } from "@/Hooks/Contribute/useContributionColor";
import useCountdown from "@/Hooks/useCountdown";

export default function ContributionPhases({ type, color, deadline = null }) {
    const { heading, subText, buttonLike, timeText } =
        useContributionTexts(type);

    const style = useContributionColor(color);
    const countdown = useCountdown(deadline);

    return (
        <div
            className="w-full h-full min-h-[197px] flex flex-col items-center justify-center rounded-[4px]"
            style={{ background: style.background }}
        >
            <div className="flex flex-col items-center justify-center p-[24px] w-full">
                {type === "registerNotStarted" ? (
                    <img
                        src="/images/project/waiting.svg"
                        alt=""
                        className="h-[60px] mb-[16px]"
                    />
                ) : (
                    <img
                        src={style.image}
                        alt=""
                        className="h-[60px] mb-[16px]"
                    />
                )}
                <h4
                    className="text-[20px] text-center font-semibold max-w-[350px] tracking-normal"
                    style={{ color: style.headingColor }}
                >
                    {heading}
                </h4>

                {subText && (
                    <>
                        {buttonLike ? (
                            <div
                                className="flex items-center gap-[12px] px-[12px] py-[11px] rounded-[6px] border border-solid mt-[24px]"
                                style={{ borderColor: style.buttonLinkBorder }}
                            >
                                <img
                                    src={style.buttonLikeImage}
                                    alt=""
                                    className="w-[24px]"
                                />
                                <p
                                    className="text-[16px] font-medium"
                                    style={{
                                        color: style.buttonLinkColor,
                                    }}
                                >
                                    {subText}
                                </p>
                            </div>
                        ) : (
                            <p
                                className="text-[14px] text-center font-medium max-w-[350px] tracking-normal mt-[8px]"
                                style={{
                                    color: style.subTextColor,
                                    maxWidth:
                                        type === "walletNotRegistered" &&
                                        "244px",
                                }}
                            >
                                {subText}
                            </p>
                        )}
                    </>
                )}
            </div>

            {timeText && (
                <div className="flex flex-col items-center justify-center p-[6px] w-full">
                    <div
                        className="px-[5px] py-[10px] rounded-[3px] w-full flex flex-col items-center justify-center gap-[6px]"
                        style={{ background: style.timerBg }}
                    >
                        <p
                            className="text-[14px] text-center font-medium tracking-normal"
                            style={{ color: style.timerTextColor }}
                        >
                            {timeText}
                        </p>
                        {deadline && (
                            <p
                                className="text-[18px] text-center font-semibold tracking-normal"
                                style={{ color: style.timerColor }}
                            >
                                {countdown}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
