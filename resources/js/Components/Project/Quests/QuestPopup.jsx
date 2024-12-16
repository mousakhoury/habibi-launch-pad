import { useState } from "react";
import QuestMainPopup from "./QuestMainPopup";
import VisitQuest from "./VisitQuest";
import QuestCongratsPopup from "./QuestCongratsPopup";
import JoinTelegramQuest from "./JoinTelegramQuest";
import FollowXQuest from "./FollowXQuest";

export default function QuestPopup({
    userQuest,
    statusTag,
    image,
    isLocked,
    closeQuestHandler,
    matchedAccount,
    completeQuest,
}) {
    const [isNextPage, setIsNextPage] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const nextPageHandler = () => {
        setIsNextPage(true);
    };

    const prevPageHandler = () => {
        setIsNextPage(false);
    };

    const finishQuest = () => {
        completeQuest(matchedAccount.id, userQuest.quest_id, () => {
            setIsDone(true);
            console.log("done");
            setTimeout(() => {
                closeQuestHandler();
            }, 3000);
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-50 bg-[#121212b3] flex items-center justify-center">
            {isDone ? (
                <QuestCongratsPopup userQuest={userQuest} />
            ) : (
                <>
                    {isNextPage ? (
                        <>
                            {userQuest.quest.type === "followX" && (
                                <FollowXQuest
                                    userQuest={userQuest}
                                    prevPageHandler={prevPageHandler}
                                    finishQuest={finishQuest}
                                />
                            )}
                            {userQuest.quest.type === "joinTelegram" && (
                                <JoinTelegramQuest
                                    userQuest={userQuest}
                                    prevPageHandler={prevPageHandler}
                                    finishQuest={finishQuest}
                                />
                            )}
                            {userQuest.quest.type === "visitWebsite" && (
                                <VisitQuest
                                    userQuest={userQuest}
                                    prevPageHandler={prevPageHandler}
                                    finishQuest={finishQuest}
                                />
                            )}
                        </>
                    ) : (
                        <QuestMainPopup
                            userQuest={userQuest}
                            statusTag={statusTag}
                            image={image}
                            isLocked={isLocked}
                            closeQuestHandler={closeQuestHandler}
                            nextPageHandler={nextPageHandler}
                        />
                    )}
                </>
            )}
        </div>
    );
}
