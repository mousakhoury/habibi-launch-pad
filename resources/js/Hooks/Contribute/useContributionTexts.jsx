import { useMemo } from "react";

export const useContributionTexts = (type) => {
    const typeTexts = useMemo(
        () => ({
            registerNotStarted: {
                heading:
                    "Get ready to register when  project registration begins.",
                subText: "Registration Starting Soon...",
                buttonLike: true,
                timeText: null,
            },
            // walletRegistered: {
            //     heading:
            //         "Wallet registered! Start contributing when 1st Round opens.",
            //     subText: "Registered Successfully",
            //     buttonLike: true,
            //     timeText: "1st Contribution will be available in",
            // },
            walletRegistered: {
                heading: "You are Eligible to Contribute on This Project.",
                subText: "You are Eligible",
                buttonLike: true,
                timeText: "1st Contribution will be available in",
            },
            pauseFCFS1: {
                heading: "Get ready for Round 2 (FCFS 1)",
                subText: "Round 2 coming soon",
                buttonLike: true,
                timeText: "Round 2 will be available in",
            },
            pauseFCFS2: {
                heading: "Get ready for Round 3",
                subText: "Round 3 coming soon",
                buttonLike: true,
                timeText: "Round 3 will be available in",
            },
            poolClosed: {
                heading:
                    "The pool is closed. Stay tuned for more promising projects on Habibi!",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            allocZeroRound1: {
                heading: "Your First Round Allocation was Successful!",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            allocZeroRound2: {
                heading: "Your Second Round Allocation was Successful!",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            allocZeroRound3: {
                heading: "Your Third Round Allocation was Successful!",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            walletNotRegistered: {
                heading:
                    "Wallet not registered! try your luck in the FCFS rounds.",
                subText:
                    "Registration is required to be able to participate in round 1.",
                buttonLike: false,
                timeText: null,
            },
            walletWhiteListed: {
                heading:
                    "Congratulation, wallet whitelisted! You don't need to register.",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            walletWhiteListedRegister: {
                heading:
                    "Congratulation, wallet whitelisted! You don't need to register.",
                subText: null,
                buttonLike: false,
                timeText:
                    "Registration under progress, Contribution will start soon!",
            },
            walletWhiteListedWaiting: {
                heading:
                    "Congratulation, wallet whitelisted! Start contributing when rounds opens.",
                subText: null,
                buttonLike: false,
                timeText: "Contribution will be available in",
            },
            WhiteListNextRound: {
                heading:
                    "Sorry! You are not eligible to participate in the upcoming rounds",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
            notStakedBeforeRegister: {
                heading:
                    "Sorry! You are not eligible to register on this Project.",
                subText:
                    "You need to stake minimum 10,000,000 HABB before registration ends to be able to register for this Project.",
                buttonLike: false,
                timeText: null,
            },
            notStakedDuringRegister: {
                heading:
                    "Sorry! You are not eligible to register on this Project.",
                subText:
                    "You need to stake minimum 10,000,000 HABB before registration ends to be able to register for this Project.",
                buttonLike: false,
                timeText: "Registration Already Started",
            },
            notStakedAfterRegister: {
                heading:
                    "Sorry! You are not eligible to participate on this Project.",
                subText: null,
                buttonLike: false,
                timeText: null,
            },
        }),
        []
    );

    // Get the text object for the given type, or return a default object if not found
    const textForType = typeTexts[type] || {
        heading: "Unknown type",
        subText: "No information available",
        buttonLike: false,
        timeText: null,
    };

    return textForType;
};
