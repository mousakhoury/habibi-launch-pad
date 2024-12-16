import { useMemo } from "react";

const useNumberWithSpaces = (number) => {
    const formattedNumber = useMemo(() => {
        const numberStr = number.toString();
        const withSpaces = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return withSpaces;
    }, [number]);

    return formattedNumber;
};

export default useNumberWithSpaces;
