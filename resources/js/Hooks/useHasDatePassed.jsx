import { useState, useEffect } from "react";

const useHasDatePassed = (targetDate) => {
    // Helper function to determine if the target date has passed
    const checkDatePassed = () => {
        if (!targetDate) return false; // If targetDate is null, return false
        const now = new Date();
        const target = new Date(targetDate);
        return now >= target; // Using greater than or equal for the comparison
    };

    // Initialize state with the check
    const [hasPassed, setHasPassed] = useState(checkDatePassed());

    useEffect(() => {
        // If the date has already passed or targetDate is null, we don't need to set up a timer
        if (hasPassed || !targetDate) return;

        const target = new Date(targetDate);
        const now = new Date();
        const difference = target - now;

        // If we're already past the target date, update state immediately
        if (difference <= 0) {
            setHasPassed(true);
            return;
        }

        // Otherwise, set a timeout to update the state at the exact target time
        const timer = setTimeout(() => {
            setHasPassed(true);
        }, difference);

        // Clear the timer on cleanup
        return () => clearTimeout(timer);
    }, [targetDate, hasPassed]); // Include hasPassed in the dependency array

    // Return the current state
    return hasPassed;
};

export default useHasDatePassed;
