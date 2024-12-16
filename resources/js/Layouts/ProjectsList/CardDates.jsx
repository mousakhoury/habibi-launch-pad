import React, { useState, useEffect } from "react";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useHasDatePassed from "@/Hooks/useHasDatePassed";
import useCountdown from "@/Hooks/useCountdown";

export default function CardDates({ project }) {
    const [countdownDate, setCountdownDate] = useState(null);

    const isRegister = useHasDatePassed(project.register_starting_date);
    const isRegisterEnded = useHasDatePassed(project.register_deadline);
    const isActive = useHasDatePassed(project.starting_date);
    const { isFinished } = useGetPoolData({ project });

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    }

    // This effect updates the countdown date based on the condition
    useEffect(() => {
        if (!project.starting_date) {
            setCountdownDate(null);
        } else if (!isActive) {
            setCountdownDate(project.starting_date);
        } else if (!isFinished) {
            setCountdownDate(project.deadline);
        }
    }, [isRegister, isRegisterEnded, isActive, isFinished, project]);

    // Call the useCountdown hook with the updated countdownDate
    const countdown = useCountdown(countdownDate);

    // Logic to determine the status text

    const statusText = isFinished
        ? "Closed On:"
        : project.starting_date
        ? isActive
            ? "Participating Ends In:"
            : "Participating Starts In:"
        : "TBA:";

    // const statusText = isRegister
    //     ? isRegisterEnded
    //         ? isActive
    //             ? isFinished
    //                 ? "Closed On:"
    //                 : "Participating Ends In:"
    //             : "Participating Starts In:"
    //         : "Registration Ends In:"
    //     : "TBA";

    return (
        <div className="flex items-center justify-between w-full">
            <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-normal">
                {statusText}
            </p>
            <div className="flex items-center gap-[10px] text-[12px] lg:text-[16px] font-medium">
                {isFinished ? (
                    <p className="text-[#E4E4E4]">
                        {formatDate(project.deadline)}
                    </p>
                ) : (
                    <p className="text-[#E26666]">{countdown}</p>
                )}
            </div>
        </div>
    );
}
