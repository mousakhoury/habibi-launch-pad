import React, { useContext, useEffect, useState } from "react";
import ContributionPhases from "./Contribution/ContributionPhases";
import Registration from "./Contribution/Registration";
import useHasDatePassed from "@/Hooks/useHasDatePassed";
import useStakedAmount from "@/Hooks/useStakedAmount";
import useGetUserDataForPool from "@/Hooks/useGetUserDataForPool";
import { Web3Context } from "@/Store/Web3Context";
import useGetPoolData from "@/Hooks/useGetPoolData";
import ContributeForm from "./Contribution/ContributeForm";
import useGetUsdtData from "@/Hooks/useGetUsdtData";

export default function ContributionStatus({ project }) {
    const { account } = useContext(Web3Context);
    // const { isRegistered, setIsRegistered } = useGetUserDataForPool({
    //     project,
    // });
    const isRegistered = true;
    const isRegisterStarted = true;
    const isRegisterEnded = true;

    const { usdtBalance, userAlloc, setUsdtAllowance, getUsdtAllowance } =
        useGetUsdtData(project.pool_id);
    const [isWhiteListed, setIsWhiteListed] = useState(false);

    const stakedAmount = useStakedAmount();

    const { isFinished } = useGetPoolData({ project });
    const isStaked = stakedAmount >= 10000000;
    // const isRegisterStarted = useHasDatePassed(project.register_starting_date);
    // const isRegisterEnded = useHasDatePassed(project.register_deadline);
    const isFirstRoundStarted = useHasDatePassed(project.starting_date);
    const isFirstRoundEnded = useHasDatePassed(project.first_round_deadline);
    const isSecondRoundStarted = useHasDatePassed(project.fcfs_starting_date);
    const isSecondRoundEnded = useHasDatePassed(project.fcfs_deadline_date);
    const isThirdRoundStarted = useHasDatePassed(project.fcfs2_starting_date);
    const isAllocZero = false;

    // const isFinished = false;
    // const isStaked = false;
    // const isFirstRoundStarted = false;
    // const isFirstRoundEnded = false;
    // const isSecondRoundStarted = false;
    // const isSecondRoundEnded = false;
    // const isThirdRoundStarted = false;
    // const isAllocZero = false;

    useEffect(() => {
        if (project.white_list) {
            const usersArray = project.white_list;
            const WhiteList = usersArray.map((item) => item.address);
            setIsWhiteListed(WhiteList.includes(account));
        }
    }, [project.white_list, account]);

    return (
        <div className="w-full">
            {isFinished ? (
                <ContributionPhases type="poolClosed" color="green" />
            ) : isStaked ? (
                isRegisterStarted ? (
                    isRegistered ? (
                        isFirstRoundStarted ? (
                            isFirstRoundEnded ? (
                                isSecondRoundStarted ? (
                                    isSecondRoundEnded ? (
                                        isThirdRoundStarted ? (
                                            isAllocZero ? (
                                                <ContributionPhases
                                                    type="allocZeroRound3"
                                                    color="green"
                                                />
                                            ) : (
                                                <div>
                                                    <ContributeForm
                                                        project={project}
                                                        phase={"FCFS2"}
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            <ContributionPhases
                                                type="pauseFCFS2"
                                                color="yellow"
                                                deadline={
                                                    project.fcfs2_starting_date
                                                }
                                            />
                                        )
                                    ) : isAllocZero ? (
                                        <ContributionPhases
                                            type="allocZeroRound2"
                                            color="green"
                                        />
                                    ) : (
                                        <ContributeForm
                                            project={project}
                                            phase={"FCFS1"}
                                        />
                                    )
                                ) : (
                                    <ContributionPhases
                                        type="pauseFCFS1"
                                        color="yellow"
                                        deadline={project.fcfs_starting_date}
                                    />
                                )
                            ) : isAllocZero ? (
                                <ContributionPhases
                                    type="allocZeroRound1"
                                    color="green"
                                />
                            ) : (
                                <ContributeForm
                                    project={project}
                                    phase={"Guaranteed"}
                                />
                            )
                        ) : (
                            <ContributionPhases
                                type="walletRegistered"
                                color="green"
                                deadline={project.starting_date}
                            />
                        )
                    ) : isRegisterEnded ? (
                        isFirstRoundEnded ? (
                            isSecondRoundStarted ? (
                                isSecondRoundEnded ? (
                                    isThirdRoundStarted ? (
                                        isAllocZero ? (
                                            <ContributionPhases
                                                type="allocZeroRound3"
                                                color="green"
                                            />
                                        ) : (
                                            <ContributeForm
                                                project={project}
                                                phase={"FCFS2"}
                                            />
                                        )
                                    ) : (
                                        <ContributionPhases
                                            type="pauseFCFS2"
                                            color="yellow"
                                            deadline={
                                                project.fcfs2_starting_date
                                            }
                                        />
                                    )
                                ) : isAllocZero ? (
                                    <ContributionPhases
                                        type="allocZeroRound2"
                                        color="green"
                                    />
                                ) : (
                                    <ContributeForm
                                        project={project}
                                        phase={"FCFS1"}
                                    />
                                )
                            ) : (
                                <ContributionPhases
                                    type="pauseFCFS1"
                                    color="yellow"
                                    deadline={project.fcfs_starting_date}
                                />
                            )
                        ) : (
                            <ContributionPhases
                                type="walletNotRegistered"
                                color="red"
                            />
                        )
                    ) : (
                        // <Registration
                        //     project={project}
                        //     setIsRegistered={setIsRegistered}
                        // />

                        <div>Register</div>
                    )
                ) : (
                    <ContributionPhases
                        type="registerNotStarted"
                        color="yellow"
                    />
                )
            ) : isWhiteListed ? (
                isFirstRoundStarted ? (
                    isFirstRoundEnded ? (
                        isSecondRoundStarted ? (
                            isSecondRoundEnded ? (
                                isThirdRoundStarted ? (
                                    isAllocZero ? (
                                        <ContributionPhases
                                            type="allocZeroRound3"
                                            color="green"
                                        />
                                    ) : (
                                        <div>
                                            <ContributeForm
                                                project={project}
                                                phase={"FCFS2"}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <ContributionPhases
                                        type="pauseFCFS2"
                                        color="yellow"
                                        deadline={project.fcfs2_starting_date}
                                    />
                                )
                            ) : isAllocZero ? (
                                <ContributionPhases
                                    type="allocZeroRound2"
                                    color="green"
                                />
                            ) : (
                                <ContributeForm
                                    project={project}
                                    phase={"FCFS1"}
                                />
                            )
                        ) : (
                            <ContributionPhases
                                type="pauseFCFS1"
                                color="yellow"
                                deadline={project.fcfs_starting_date}
                            />
                        )
                    ) : isAllocZero ? (
                        <ContributionPhases
                            type="allocZeroRound1"
                            color="green"
                        />
                    ) : (
                        <ContributeForm
                            project={project}
                            phase={"Guaranteed"}
                        />
                    )
                ) : isRegisterStarted ? (
                    isRegisterEnded ? (
                        <ContributionPhases
                            type="walletWhiteListedWaiting"
                            color="green"
                            deadline={project.starting_date}
                        />
                    ) : (
                        <ContributionPhases
                            type="walletWhiteListedRegister"
                            color="green"
                        />
                    )
                ) : (
                    <ContributionPhases
                        type="walletWhiteListed"
                        color="green"
                    />
                )
            ) : isRegisterStarted ? (
                isRegisterEnded ? (
                    <ContributionPhases
                        type="notStakedAfterRegister"
                        color="red"
                    />
                ) : (
                    <ContributionPhases
                        type="notStakedDuringRegister"
                        color="red"
                    />
                )
            ) : (
                <ContributionPhases
                    type="notStakedBeforeRegister"
                    color="red"
                />
            )}
        </div>
    );
}
