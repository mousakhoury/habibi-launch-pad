import React, { useState, useEffect } from "react";
import useStakedAmount from "./useStakedAmount";

export default function useGetTier() {
    const [tier, setTier] = useState("no tier");
    const stakedAmount = useStakedAmount();

    useEffect(() => {
        // Convert staked amount to a number for comparison
        const amount = Number(stakedAmount);

        if (amount > 10000000000) {
            setTier("Master");
        } else if (amount > 5000000000) {
            setTier("Diamond");
        } else if (amount > 1000000000) {
            setTier("Platinum");
        } else if (amount > 200000000) {
            setTier("Gold");
        } else if (amount > 50000000) {
            setTier("Silver");
        } else if (amount > 10000000) {
            setTier("Bronze");
        } else {
            setTier("no tier");
        }
    }, [stakedAmount]); // This useEffect depends on `stakedAmount`

    return tier;
}
