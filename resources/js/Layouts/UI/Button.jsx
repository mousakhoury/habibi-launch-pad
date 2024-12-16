import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Button.module.css";

export default function ({ type, onClick, disabled, text }) {
    return (
        <>
            {type === "connect" && (
                <button onClick={onClick} className={styles.connect_button}>
                    <p>Connect</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}
            {type === "disconnect" && (
                <button onClick={onClick} className={styles.disconnect_button}>
                    <p>Disconnect Wallet </p>
                </button>
            )}

            {type === "leanMore" && (
                <button className={styles.learn_more_button}>
                    <p>Learn More</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "project" && (
                <button className={styles.project_button}>
                    <p>{text}</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "approve" && (
                <div
                    onClick={!disabled ? onClick : undefined}
                    className={`${styles.approve_button} ${
                        disabled && styles.disabled
                    } `}
                >
                    <p>Approve</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </div>
            )}

            {type === "stake" && (
                <button
                    type="submit"
                    disabled={disabled}
                    className={styles.stake_button}
                >
                    <p>Stake</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "unstake" && (
                <button
                    type="submit"
                    disabled={disabled}
                    className={styles.unstake_button}
                >
                    <p>Unstake</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "contribute" && (
                <button
                    type="submit"
                    disabled={disabled}
                    className={styles.contribute_button}
                >
                    <p>contribute</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "telegram" && (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={styles.join_telegram}
                >
                    {disabled ? (
                        <img
                            src="/images/staking/telegram-disabled.svg"
                            alt=""
                        />
                    ) : (
                        <>
                            <img
                                src="/images/staking/telegram-unhover.svg"
                                className={styles.unhover}
                                alt=""
                            />
                            <img
                                src="/images/staking/telegram-hover.svg"
                                className={styles.hover}
                                alt=""
                            />
                        </>
                    )}

                    <p>Join Tier 5 Telegram Group</p>
                </button>
            )}

            {type === "useful" && (
                <button onClick={onClick} className={styles.useful_button}>
                    <img src="/images/article/useful.svg" alt="" />
                    <p>Yes</p>
                </button>
            )}

            {type === "notUseful" && (
                <button onClick={onClick} className={styles.notUseful_button}>
                    <img src="/images/article/not-useful.svg" alt="" />
                    <p>No</p>
                </button>
            )}

            {type === "buyNow" && (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={styles.buyNow_button}
                >
                    <p>Buy Now</p>
                    <img
                        className={styles.disabled}
                        src="/images/prepaid/buy-now-arrow.svg"
                        alt=""
                    />
                    <img
                        className={styles.active}
                        src="/images/prepaid/buy-now-arrow-active.svg"
                        alt=""
                    />
                </button>
            )}

            {type === "prepaidCancel" && (
                <button
                    onClick={onClick}
                    className={styles.prepaidCancel_button}
                >
                    <p>Cancel</p>
                </button>
            )}

            {type === "prepaidDone" && (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={styles.prepaidDone_button}
                >
                    <p>Done</p>
                </button>
            )}

            {type === "approveGift" && (
                <button
                    onClick={!disabled ? onClick : undefined}
                    disabled={disabled}
                    className={`${styles.confirmPay_button} ${
                        disabled && styles.disabled
                    } `}
                >
                    <p>Approve</p>
                </button>
            )}

            {type === "confirmPay" && (
                <button
                    onClick={!disabled ? onClick : undefined}
                    disabled={disabled}
                    className={`${styles.confirmPay_button} ${
                        disabled && styles.disabled
                    } `}
                >
                    <p>Pay</p>
                    <img
                        c
                        src="/images/prepaid/metamask.svg"
                        alt=""
                        className="h-[20px]"
                    />
                </button>
            )}

            {type === "next" && (
                <button
                    disabled={disabled}
                    onClick={onClick}
                    className={styles.next_button}
                >
                    <p>Next</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}

            {type === "leaderBoard" && (
                <button onClick={onClick} className={styles.leaderBoard_button}>
                    <img
                        className={styles.main}
                        src="/images/project/leaderboard-main.svg"
                        alt=""
                    />
                    <img
                        className={styles.hover}
                        src="/images/project/leaderboard-hover.svg"
                        alt=""
                    />
                    <p>View Leaderboard</p>
                </button>
            )}

            {type === "completeNow" && (
                <button onClick={onClick} className={styles.completeNow_button}>
                    <p>Complete Now</p>
                    <p className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                </button>
            )}
        </>
    );
}
