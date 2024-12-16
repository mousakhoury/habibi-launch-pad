import useCountdown from "@/Hooks/useCountdown";
import useRegisterToPool from "@/Hooks/useRegisterToPool";
import React from "react";

export default function Registration({ project, setIsRegistered }) {
    const countdown = useCountdown(project.register_deadline);
    const registerToPoolHandler = useRegisterToPool(
        project.pool_id,
        setIsRegistered
    );

    return (
        <div className="w-full h-full min-h-[197px] flex flex-col items-center justify-center rounded-[4px] bg-[#272E29]">
            <div className="flex flex-col items-center justify-center p-[24px] w-full">
                <img
                    src="/images/project/register.svg"
                    alt=""
                    className="h-[60px] mb-[16px]"
                />

                <h4 className="text-[#DCFFE7] text-[20px] text-center font-semibold max-w-[350px] tracking-normal">
                    Register for participating in this Project.
                </h4>

                <button
                    onClick={registerToPoolHandler}
                    className="flex items-center gap-[12px] px-[12px] py-[11px] rounded-[6px] mt-[24px]"
                    style={{
                        background:
                            "linear-gradient(90deg, #57D37D 0%, #E0FC70 100%)",
                    }}
                >
                    <img
                        src="/images/project/register-button.svg"
                        alt=""
                        className="w-[20px]"
                    />
                    <p className="text-[#0D0D0D] text-[16px] font-semibold">
                        Register Your Wallet
                    </p>
                </button>
            </div>

            <div className="flex flex-col items-center justify-center p-[6px] w-full">
                <div className="px-[5px] py-[10px] rounded-[3px] w-full flex flex-col items-center justify-center gap-[6px] bg-[#28342C]">
                    <p className="text-[#92AE9B] text-[14px] text-center font-medium tracking-normal">
                        Registration time Left
                    </p>
                    <p className="text-[#57D37D] text-[18px] text-center font-semibold tracking-normal">
                        {countdown}
                    </p>
                </div>
            </div>
        </div>
    );
}
