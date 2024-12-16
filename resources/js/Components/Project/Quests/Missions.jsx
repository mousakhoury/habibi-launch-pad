import React from "react";
import Quests from "./Quests";
import QuestLeaderboard from "./QuestLeaderboard";
import { useState } from "react";
import useGetAccount from "@/Hooks/useGetAccount";

export default function Missions({ accounts }) {
    const [isLeaderboard, setIsLeaderboard] = useState(false);
    const { matchedAccount } = useGetAccount({ accounts });

    const openLeaderboardHandler = () => {
        setIsLeaderboard(true);
    };

    const closeLeaderboardHandler = () => {
        setIsLeaderboard(false);
    };

    if (!matchedAccount) {
        return <div>There are no Missions available</div>;
    }

    return (
        <>
            {isLeaderboard ? (
                <QuestLeaderboard
                    allAccounts={accounts}
                    closeLeaderboardHandler={closeLeaderboardHandler}
                />
            ) : (
                <Quests
                    accounts={accounts}
                    openLeaderboardHandler={openLeaderboardHandler}
                />
            )}
        </>
    );
}
