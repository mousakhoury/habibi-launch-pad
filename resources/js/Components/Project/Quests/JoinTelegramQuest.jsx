import { useState } from "react";
import Button from "@/Layouts/UI/Button";
import DataInput from "@/Layouts/UI/DataInput";

export default function JoinTelegramQuest({
    userQuest,
    prevPageHandler,
    finishQuest,
}) {
    const [isDisable, setIsDisable] = useState(true);
    const [telegram, setTelegram] = useState("");

    const enableButtonHandler = () => {
        window.open(userQuest.quest.url, "_blank");
        setIsDisable(false);
    };

    const changeTelegramHandler = (e) => {
        setTelegram(e.target.value);
    };

    return (
        <div className="rounded-[12px] border border-solid border-[#323232] bg-[#1B1B1B] p-[20px] w-full max-w-[648px] flex flex-col items-start gap-[24px]">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[12px]">
                    <img
                        src="/images/project/telegram-quest.svg"
                        alt=""
                        className="w-[30px]"
                    />
                    <p className="text-white text-[20px] font-semibold">
                        {userQuest.quest.title}
                    </p>
                </div>
                <div className="flex items-center gap-[6px] p-[1px] pr-[10px] rounded-[8px] bg-[#303030] shadow-sm-r shadow-[#e2fd7096]">
                    <img src="/images/project/crown-points.svg" alt="" />
                    <p className="text-[#E2FD70] text-[14px] font-semibold leading-[17px]">
                        {userQuest.quest.xp} Points
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-start gap-[60px] w-full">
                <p className="text-[#B4B4B4] text-[16px] font-medium">
                    To complete this mission, you need to join our telegram
                    group by clicking the lik below. After you join on our
                    group, you need to share your telegram username here for
                    verification.
                    <br />
                    <br />
                    To join on our telegram group{" "}
                    <span
                        onClick={enableButtonHandler}
                        className="text-[#E2FD70] underline cursor-pointer"
                    >
                        Click Here
                    </span>
                </p>

                <div className="flex flex-col items-start gap-[12px] w-full">
                    <p className="text-[#B4B4B4] text-[16px] font-medium">
                        Enter your telegram username
                    </p>
                    <DataInput
                        data={telegram}
                        setData={changeTelegramHandler}
                        type="text"
                        label="Enter here"
                    />
                </div>
            </div>
            <div className="flex items-center gap-[16px] w-full mt-[6px]">
                <Button onClick={prevPageHandler} type="prepaidCancel" />
                <Button
                    onClick={finishQuest}
                    disabled={isDisable || !telegram}
                    type="prepaidDone"
                />
            </div>
        </div>
    );
}
