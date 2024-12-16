import React from "react";
import styles from "./MissionsAvailable.module.css";
import useGetAccount from "@/Hooks/useGetAccount";

export default function MissionsAvailable({ accounts, openMissionsTab }) {
    const { matchedAccount } = useGetAccount({ accounts });

    if (!matchedAccount) {
        return null;
    }

    // Check if all quests are completed
    const allQuestsCompleted = matchedAccount.user_quests.every(
        (quest) => quest.is_completed
    );

    return (
        <>
            {!allQuestsCompleted && (
                <div
                    className={styles.availableContainer}
                    onClick={openMissionsTab}
                >
                    <p>Missions are available now!</p>
                    <div className={styles.imageContainer}>
                        <img src="/images/project/avalible.svg" alt="" />
                        <img
                            src="/images/project/avalible-rocket.svg"
                            alt=""
                            className={styles.imageRocket}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
