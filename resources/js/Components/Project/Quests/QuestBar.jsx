import React, { useState, useEffect } from "react";
import QuestPopup from "./QuestPopup";

export default function QuestBar({
    userQuest,
    isLocked,
    completeQuest,
    matchedAccount,
}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [style, setStyle] = useState({});
    const [hover, setHover] = useState(false);
    const [image, setImage] = useState();
    const [hoverImage, setHoverImage] = useState();
    const [statusTag, setStatusTag] = useState({
        image: "/images/project/locked-tag.svg",
        background: "#E26666",
        color: "#260F0F",
        text: "Locked",
    });

    useEffect(() => {
        const baseStyle = {
            backgroundColor: "#252525",
            borderColor: "transparent",
        };

        const completedStyle = {
            borderColor: "#2F4837",
        };
        const completedHoverStyle = {
            backgroundColor: "#1E2520",
            borderColor: "#396B48",
        };

        const todoStyle = {};
        const todoHoverStyle = {
            backgroundColor: "#24241E",
            borderColor: "#565437",
        };

        const lockedStyle = {};
        const lockedHoverStyle = {
            backgroundColor: "#251F1F",
            borderColor: "#473535",
        };

        let newStyle = { ...baseStyle };
        let newHoverStyle = {};

        if (userQuest.is_completed && !isLocked) {
            newStyle = { ...newStyle, ...completedStyle };
            newHoverStyle = completedHoverStyle;
            setHoverImage("/images/project/completed-hover.svg");
            setStatusTag({
                image: "/images/project/completed-tag.svg",
                background: "#57D37D",
                color: "#132C1A",
                text: "Completed",
            });
        } else if (!userQuest.is_completed && !isLocked) {
            newHoverStyle = todoHoverStyle;
            setHoverImage("/images/project/todo-hover.svg");
            setStatusTag({
                image: "/images/project/todo-tag.svg",
                background: "#D3CE57",
                color: "#2E2D13",
                text: "To Do",
            });
        } else if (!userQuest.is_completed && isLocked) {
            newHoverStyle = lockedHoverStyle;
            setHoverImage("/images/project/locked-hover.svg");
            setStatusTag({
                image: "/images/project/locked-tag.svg",
                background: "#E26666",
                color: "#260F0F",
                text: "Locked",
            });
        }

        setStyle(newStyle);

        // Store hover style in a ref
        setHoverStyle(newHoverStyle);
    }, [userQuest.is_completed, isLocked]);

    const [hoverStyle, setHoverStyle] = useState({});

    useEffect(() => {
        if (userQuest.quest.type === "followX") {
            setImage("/images/project/followX.svg");
        } else if (userQuest.quest.type === "joinTelegram") {
            setImage("/images/project/joinTelegram.svg");
        } else if (userQuest.quest.type === "visitWebsite") {
            setImage("/images/project/visitWebsite.svg");
        }
    }, [userQuest.quest.type]);

    const selectQuestHandler = () => {
        setIsPopupOpen(true);
    };

    const closeQuestHandler = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div
                onClick={selectQuestHandler}
                className="group flex items-center gap-[24px] p-[6px] w-full border border-solid rounded-[8px] relative cursor-pointer"
                style={hover ? hoverStyle : style}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img src={image} alt="" className="w-[128px] h-[128px]" />
                <div className="flex flex-col items-start gap-[12px] w-full">
                    <div className="flex items-start gap-[8px] w-full">
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
                        <div className="flex items-center gap-[6px] p-[1px] pr-[10px] rounded-[8px] bg-[#303030] shadow-sm-r shadow-[#e2fd7096] ">
                            <img
                                src="/images/project/crown-points.svg"
                                alt=""
                            />
                            <p className="text-[#E2FD70] text-[14px] font-semibold leading-[17px]">
                                {userQuest.quest.xp} Points
                            </p>
                        </div>
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
                    </div>
                    <div className="flex flex-col items-start gap-[8px] w-full">
                        <p className="text-white text-[24px] font-semibold leading-[30px]">
                            {userQuest.quest.title}
                        </p>
                        <p className="text-[#B4B4B4] text-[14px] font-medium leading-[17px] max-w-[457px]">
                            Some details about the mission. Fundraising for
                            YalGamers is a campaign aimed at supporting and
                            promoting young....
                        </p>
                    </div>
                </div>
                <img
                    src={hoverImage}
                    alt=""
                    className="child  absolute top-[50%] translate-y-[-50%] duration-300 right-0 group-hover:right-[20px] opacity-0 group-hover:opacity-100"
                />
            </div>

            {isPopupOpen && (
                <QuestPopup
                    userQuest={userQuest}
                    statusTag={statusTag}
                    image={image}
                    isLocked={isLocked}
                    closeQuestHandler={closeQuestHandler}
                    matchedAccount={matchedAccount}
                    completeQuest={completeQuest}
                />
            )}
        </>
    );
    // return (
    //     <div>
    //         <p>
    //             {userQuest.quest.title} -{" "}
    //             {userQuest.is_completed ? "Completed" : "Not Completed"} -{" "}
    //             {userQuest.quest.people_completed}
    //         </p>
    //         <button
    //             onClick={() =>
    //                 completeQuest(
    //                     matchedAccount.id,
    //                     userQuest.quest_id,
    //
    //                 )
    //             }
    //             disabled={isLocked || userQuest.is_completed}
    //         >
    //             Complete Quest
    //         </button>
    //     </div>
    // );
}
