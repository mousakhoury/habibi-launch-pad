import React from "react";

export default function useProjectStatus(startingDate, isFinished) {
    const currentDate = new Date();

    const startDate = startingDate ? new Date(startingDate) : null;

    if (isFinished) {
        return "Completed";
    } else if (!startDate) {
        return "TBA";
    } else if (currentDate < startDate) {
        return "Upcoming";
    } else {
        return "Active";
    }
}
