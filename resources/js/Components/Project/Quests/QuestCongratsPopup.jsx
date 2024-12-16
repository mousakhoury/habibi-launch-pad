import React from "react";

export default function QuestCongratsPopup({ userQuest }) {
    return (
        <div className="rounded-[18px] border border-solid border-[#ffffff0d] bg-[#252525] px-[81px] py-[84px] w-full max-w-[480px] flex flex-col items-center justify-center gap-[32px]">
            <img src="/images/project/Congrats.svg" alt="" />
            <div className="flex flex-col items-center justify-center gap-[12px]">
                <p className="text-[#E4E4E4] text-[32px] font-semibold">
                    Congratulation!
                </p>
                <p className="text-[#9C9C9C] text-[18px] text-center font-medium leading-[24px] max-w-[318px]">
                    You have earned {userQuest.quest.xp} points by completing
                    the mission ({userQuest.quest.title}).
                </p>
            </div>
        </div>
    );
}
