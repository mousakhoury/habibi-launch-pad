import { useMemo } from "react";

const useNumberComma = (number) => {
    const formattedNumber = useMemo(() => {
        const num = Number(number);
        if (!isNaN(num)) {
            return num.toLocaleString();
        }
        return number;
    }, [number]);

    return formattedNumber;
};

export default useNumberComma;
