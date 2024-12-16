import React, { useState } from "react";
import useGetAccount from "@/Hooks/useGetAccount";
import Button from "@/Layouts/UI/Button";
import QuestBar from "./QuestBar";

export default function Quests({ accounts, openLeaderboardHandler }) {
    const { matchedAccount } = useGetAccount({ accounts });
    const [quests, setQuests] = useState(matchedAccount.user_quests);
    const [points, setPoints] = useState(matchedAccount.points);

    const completeQuest = async (accountId, questId, callback) => {
        const response = await fetch(
            `/complete-quest/${accountId}/${questId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            }
        );

        if (response.ok) {
            const data = await response.json();

            // Update the quest and points in state
            setQuests((prevQuests) =>
                prevQuests.map((q) =>
                    q.quest_id === data.userQuest.quest_id ? data.userQuest : q
                )
            );
            setPoints(data.points);

            // Update the quest people_completed count
            setQuests((prevQuests) =>
                prevQuests.map((q) =>
                    q.id === data.userQuest.quest_id
                        ? { ...q, people_completed: data.people_completed }
                        : q
                )
            );

            // Execute the callback if provided
            if (callback) {
                callback();
            }
        } else {
            console.error("Error completing quest");
        }
    };

    if (!matchedAccount) {
        return <p>No account found with the matching address.</p>;
    }

    return (
        <div className="flex flex-col items-start gap-[30px] w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start gap-[8px] w-full max-w-[442px]">
                    <p className="text-[#FCFCFC] text-[24px] font-semibold leading-[30px]">
                        All Missions
                    </p>
                    <p className="text-[#9C9C9C] text-[14px] font-medium leading-[19.6px]">
                        The Habibi Launchpad Innovation Challenge contribute
                        groundbreaking ideas to the Habibi Launchpad
                    </p>
                </div>

                <Button onClick={openLeaderboardHandler} type="leaderBoard" />
            </div>
            <div className="flex flex-col items-start gap-[16px] w-full h-[459px] overflow-y-scroll overflow-x-hidden pr-[10px]">
                {quests.map((quest, index) => {
                    const isLocked =
                        index !== 0 && !quests[index - 1].is_completed;

                    return (
                        <QuestBar
                            key={index}
                            userQuest={quest}
                            isLocked={isLocked}
                            completeQuest={completeQuest}
                            matchedAccount={matchedAccount}
                        />
                    );
                })}
            </div>
        </div>
    );
}
