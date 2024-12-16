import { useMemo } from "react";

// Custom hook for formatting date
const useTimeLineFormater = (isoDateString) => {
    const formattedDate = useMemo(() => {
        const date = new Date(isoDateString);

        // Options for the time part
        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        // Options for the date part
        const dateOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };

        // Locale 'en-US' to get AM/PM time format
        const timePart = new Intl.DateTimeFormat("en-US", timeOptions).format(
            date
        );
        // Replace commas to get clean separation of time and meridiem
        const formattedTime = timePart.replace(",", "").toUpperCase();

        // Locale 'de-DE' for German date format
        const datePart = new Intl.DateTimeFormat("de-DE", dateOptions).format(
            date
        );

        return `${formattedTime}, ${datePart}`;
    }, [isoDateString]);

    return formattedDate;
};

export default useTimeLineFormater;
