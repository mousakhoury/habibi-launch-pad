import React, { useState } from "react";

import styles from "./StakeUnstakeSwitcher.module.css";

export default function StakeUnstakeSwitcher({
    stakeOrUnstake,
    setStakeOrUnstake,
}) {
    const handleChange = (event) => {
        setStakeOrUnstake(event.target.value);
        // Trigger any other actions here
    };
    return (
        <div className={styles.container}>
            <input
                id="stake"
                type="radio"
                name="stakeAction"
                value="stake"
                className={styles.radioInput}
                checked={stakeOrUnstake === "stake"}
                onChange={handleChange}
            />
            <label htmlFor="stake" className={styles.radioLabel}>
                Stake
            </label>

            <input
                id="unstake"
                type="radio"
                name="stakeAction"
                value="unstake"
                className={styles.radioInput}
                checked={stakeOrUnstake === "unstake"}
                onChange={handleChange}
            />
            <label htmlFor="unstake" className={styles.radioLabel}>
                Unstake
            </label>
        </div>
    );
}
