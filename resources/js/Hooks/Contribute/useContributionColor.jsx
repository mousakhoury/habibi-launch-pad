import { useMemo } from "react";

export const useContributionColor = (color) => {
    const typeColor = useMemo(
        () => ({
            yellow: {
                image: "/images/project/contribute-pause.svg",
                background: "#25241E",
                headingColor: "#FFFDD7",
                subTextColor: null,
                buttonLinkColor: "#D3CE57",
                buttonLinkBorder: "#4F4D31",
                buttonLikeImage: "/images/project/timer.svg",
                timerBg: "#2C2B20",
                timerTextColor: "#9C997A",
                timerColor: "#D3CE57",
            },
            red: {
                image: "/images/project/contribute-refusal.svg",
                background: "#2E2828",
                headingColor: "#FFD8D8",
                subTextColor: "#977A7A",
                buttonLinkColor: null,
                buttonLinkBorder: null,
                buttonLikeImage: null,
                timerBg: "#393333",
                timerTextColor: "#B78484",
                timerColor: null,
            },
            green: {
                image: "/images/project/contribute-pass.svg ",
                background: "#272E29",
                headingColor: "#DCFFE7",
                subTextColor: null,
                buttonLinkColor: "#57D37D",
                buttonLinkBorder: "#2E4736",
                buttonLikeImage: "/images/project/check-circle.svg",
                timerBg: "#28342C",
                timerTextColor: "#92AE9B",
                timerColor: "#57D37D",
            },
        }),
        []
    );

    // Get the text object for the given type, or return a default object if not found
    const colorForType = typeColor[color] || {
        image: "/images/project/contribute-refusal.svg",
        background: "#2E2828",
        headingColor: "#FFD8D8",
        subTextColor: "#977A7A",
        buttonLinkColor: null,
        buttonLinkBorder: null,
        buttonLikeImage: null,
        timerBg: "#393333",
        timerTextColor: "#B78484",
        timerColor: null,
    };

    return colorForType;
};
