import { useState, useEffect, useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";

const useUnstakeCooldown = ({ histories }) => {
    const [countdown, setCountdown] = useState(null);
    const { account } = useContext(Web3Context);

    const lastStakeEntry = histories
        .slice()
        .reverse()
        .find((entry) => entry.status === "stake" && entry.address === account);

    // console.log(lastStakeEntry);

    useEffect(() => {
        if (lastStakeEntry) {
            const stakeTimestamp = new Date(
                lastStakeEntry.created_at
            ).getTime();
            // const endTime = stakeTimestamp + 90 * 24 * 60 * 60 * 1000;
            const endTime = stakeTimestamp + 15 * 60 * 1000;

            const updateCountdown = () => {
                const currentTime = new Date().getTime();
                const remainingTime = endTime - currentTime;

                if (remainingTime > 0) {
                    // Convert remaining time from milliseconds to days, hours, minutes, and seconds
                    const days = Math.floor(
                        remainingTime / (1000 * 60 * 60 * 24)
                    )
                        .toString()
                        .padStart(2, "0");
                    const hours = Math.floor(
                        (remainingTime % (1000 * 60 * 60 * 24)) /
                            (1000 * 60 * 60)
                    )
                        .toString()
                        .padStart(2, "0");
                    const minutes = Math.floor(
                        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
                    )
                        .toString()
                        .padStart(2, "0");
                    const seconds = Math.floor(
                        (remainingTime % (1000 * 60)) / 1000
                    )
                        .toString()
                        .padStart(2, "0");

                    // Format the countdown string with leading zeros
                    const formattedCountdown = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

                    // Update the countdown state
                    setCountdown(formattedCountdown);
                } else {
                    setCountdown(null); // Countdown has ended
                }
            };

            const intervalId = setInterval(updateCountdown, 1000);
            updateCountdown(); // Initialize the countdown

            return () => {
                clearInterval(intervalId); // Cleanup the interval
            };
        } else {
            setCountdown(null); // No 'stake' entry found
        }
    }, [histories, account]);

    return countdown;
};

export default useUnstakeCooldown;
