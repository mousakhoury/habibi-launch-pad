import { useState, useEffect } from "react";

const useCountdown = (targetDate) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const formatTime = (time) => (time < 10 ? `0${time}` : time);

    const countdown = `${formatTime(timeLeft.days || 0)}d : ${formatTime(
        timeLeft.hours || 0
    )}h : ${formatTime(timeLeft.minutes || 0)}m : ${formatTime(
        timeLeft.seconds || 0
    )}s`;

    return countdown;
};

export default useCountdown;
