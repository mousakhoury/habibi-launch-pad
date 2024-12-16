import React from "react";
import styles from "./QuestPopup.module.css";
import Button from "@/Layouts/UI/Button";

export default function QuestMainPopup({
    userQuest,
    statusTag,
    image,
    isLocked,
    closeQuestHandler,
    nextPageHandler,
}) {
    return (
        <div className="rounded-[12px] border border-solid border-[#323232] bg-[#1B1B1B] p-[16px] w-full max-w-[648px] flex flex-col items-start relative">
            <div
                className="flex items-center gap-[6px] p-[1px] pr-[10px] rounded-[8px]"
                style={{
                    background: statusTag.background,
                }}
            >
                <img src={statusTag.image} alt="" />
                <p
                    className="text-[14px] font-semibold leading-[17px]"
                    style={{
                        color: statusTag.color,
                    }}
                >
                    {statusTag.text}
                </p>
            </div>
            <div className="flex flex-col items-center gap-[40px] w-full">
                <img src={image} alt="" className="w-[160px]" />

                <div className="flex flex-col items-center gap-[24px] w-full max-w-[539px]">
                    <div className="flex flex-col items-center gap-[8px] w-full">
                        <p className="text-white text-[28px] font-semibold">
                            {userQuest.quest.title}
                        </p>
                        <div
                            className="text-[#B4B4B4] text-[14px] font-medium leading-[18.2px] text-center"
                            dangerouslySetInnerHTML={{
                                __html: userQuest.quest.details,
                            }}
                        ></div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-[6px] p-[1px] pr-[10px] rounded-[8px] bg-[#303030] shadow-sm-r shadow-[#ffffff4f] ">
                            <img
                                src="/images/project/people_completed.svg"
                                alt=""
                            />
                            <p className="text-[#E4E4E4] text-[14px] font-semibold leading-[17px]">
                                {userQuest.quest.people_completed} People
                                Completed
                            </p>
                        </div>
                        <div className="flex items-center gap-[6px] p-[1px] pr-[10px] rounded-[8px] bg-[#303030] shadow-sm-r shadow-[#e2fd7096] ">
                            <img
                                src="/images/project/crown-points.svg"
                                alt=""
                            />
                            <p className="text-[#E2FD70] text-[14px] font-semibold leading-[17px]">
                                {userQuest.quest.xp} Points
                            </p>
                        </div>
                    </div>
                </div>

                {userQuest.is_completed && !isLocked && (
                    <div className={styles.completed}>
                        <p>Completed</p>
                        <img src="/images/project/check-circle.svg" alt="" />
                    </div>
                )}
                {!userQuest.is_completed && !isLocked && (
                    <Button onClick={nextPageHandler} type="completeNow" />
                )}
                {!userQuest.is_completed && isLocked && (
                    <div className={styles.locked}>
                        <p>Mission Locked</p>
                        <img src="/images/project/mission-locked.svg" alt="" />
                    </div>
                )}
            </div>

            <img
                onClick={closeQuestHandler}
                src="/images/project/close-popup.svg"
                alt=""
                className="absolute top-[-12px] right-[-12px] cursor-pointer"
            />
        </div>
    );
}
