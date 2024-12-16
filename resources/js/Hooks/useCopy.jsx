import React, { useState } from "react";

export default function useCopy() {
    const [isCopied, setIsCopied] = useState(false);

    // Function to copy text
    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            // Optionally, reset the copied status after a certain time
            setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5s
        } catch (error) {
            console.error("Failed to copy: ", error);
            setIsCopied(false);
        }
    };

    return [isCopied, copy];
}
