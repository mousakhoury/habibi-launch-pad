import useTimeLineFormater from "@/Hooks/Contribute/useTimeLineFormater";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useHasDatePassed from "@/Hooks/useHasDatePassed";
import React from "react";

export default function ContributeTimeLine({ project }) {
    const isRegister = useHasDatePassed(project.register_starting_date);
    const isFirstRound = useHasDatePassed(project.starting_date);
    const isSecondRound = useHasDatePassed(project.fcfs_starting_date);
    const isThirdRound = useHasDatePassed(project.fcfs2_starting_date);
    const { isFinished } = useGetPoolData({ project });

    return (
        <div className="px-[16px] flex flex-col items-start">
            {/* <div className="flex items-start gap-[16px]">
                <div className="relative h-[121px] z-[1]">
                    <img
                        src={
                            isRegister
                                ? "/images/contribute/timeline-pass.svg"
                                : "/images/contribute/timeline-not-pass.svg"
                        }
                        alt=""
                        className="w-[24px]"
                    />
                    <div
                        className={`absolute top-0 h-full left-[50%] translate-x-[-50%] w-[2px] z-[-1] ${
                            isRegister ? "bg-[#E2FD70]" : "bg-[#3D3D3D]"
                        } `}
                    />
                </div>
                <div className="flex flex-col items-start gap-[10px]">
                    <p className="text-[#FCFCFC] text-[20px] font-medium">
                        Registration Time
                    </p>
                    <div className="flex flex-col items-start gap-[8px]">
                        <p className="text-[#848484] text-[14px] font-normal">
                            from{" "}
                            {useTimeLineFormater(
                                project.register_starting_date
                            )}
                        </p>
                        <p className="text-[#848484] text-[14px] font-normal">
                            to {useTimeLineFormater(project.register_deadline)}
                        </p>
                    </div>
                </div>
            </div> */}
            <div className="flex items-start gap-[16px]">
                <div className="relative h-[380px] z-[1] ">
                    <img
                        src={
                            isFirstRound
                                ? "/images/contribute/timeline-pass.svg"
                                : "/images/contribute/timeline-not-pass.svg"
                        }
                        alt=""
                        className="w-[24px]"
                    />
                    <div
                        className={`absolute top-0 h-full left-[50%] translate-x-[-50%] w-[2px] z-[-1] ${
                            isThirdRound ? "bg-[#E2FD70]" : "bg-[#3D3D3D]"
                        } `}
                    />
                </div>
                <div className="flex flex-col items-start gap-[24px]">
                    <p className="text-[#FCFCFC] text-[20px] font-medium">
                        Contribution
                    </p>
                    <div className="flex flex-col items-start">
                        <div className="flex items-start gap-[16px]">
                            <div className="relative h-[104px] z-[1] ">
                                <img
                                    src={
                                        isFirstRound
                                            ? "/images/contribute/timeline-pass.svg"
                                            : "/images/contribute/timeline-not-pass.svg"
                                    }
                                    alt=""
                                    className="w-[20px]"
                                />
                                <div
                                    className={`absolute top-0 h-full left-[50%] translate-x-[-50%] w-[2px] z-[-1] ${
                                        isFirstRound
                                            ? "bg-[#E2FD70]"
                                            : "bg-[#3D3D3D]"
                                    } `}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[10px]">
                                <p className="text-[#FCFCFC] text-[18px] font-medium">
                                    Round 1 ( Guaranteed )
                                </p>
                                <div className="flex flex-col items-start gap-[8px]">
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        from{" "}
                                        {useTimeLineFormater(
                                            project.starting_date
                                        )}
                                    </p>
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        to{" "}
                                        {useTimeLineFormater(
                                            project.first_round_deadline
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[16px]">
                            <div className="relative h-[104px] z-[1] ">
                                <img
                                    src={
                                        isSecondRound
                                            ? "/images/contribute/timeline-pass.svg"
                                            : "/images/contribute/timeline-not-pass.svg"
                                    }
                                    alt=""
                                    className="w-[20px]"
                                />
                                <div
                                    className={`absolute top-0 h-full left-[50%] translate-x-[-50%] w-[2px] z-[-1] ${
                                        isSecondRound
                                            ? "bg-[#E2FD70]"
                                            : "bg-[#3D3D3D]"
                                    } `}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[10px]">
                                <p className="text-[#FCFCFC] text-[18px] font-medium">
                                    Round 2 ( FCFS 1)
                                </p>
                                <div className="flex flex-col items-start gap-[8px]">
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        from{" "}
                                        {useTimeLineFormater(
                                            project.fcfs_starting_date
                                        )}
                                    </p>
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        to{" "}
                                        {useTimeLineFormater(
                                            project.fcfs_deadline_date
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-[16px]">
                            <div className="relative  ">
                                <img
                                    src={
                                        isThirdRound
                                            ? "/images/contribute/timeline-pass.svg"
                                            : "/images/contribute/timeline-not-pass.svg"
                                    }
                                    alt=""
                                    className="w-[20px]"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[10px]">
                                <p className="text-[#FCFCFC] text-[18px] font-medium">
                                    Round 3 ( FCFS 2)
                                </p>
                                <div className="flex flex-col items-start gap-[8px]">
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        from{" "}
                                        {useTimeLineFormater(
                                            project.fcfs2_starting_date
                                        )}
                                    </p>
                                    <p className="text-[#848484] text-[14px] font-normal">
                                        to{" "}
                                        {useTimeLineFormater(project.deadline)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-[16px]">
                <div className="relative  ">
                    <img
                        src={
                            isFinished
                                ? "/images/contribute/timeline-pass.svg"
                                : "/images/contribute/timeline-not-pass.svg"
                        }
                        alt=""
                        className="w-[24px]"
                    />
                </div>
                <div className="flex flex-col items-start gap-[10px]">
                    <p className="text-[#FCFCFC] text-[20px] font-medium">
                        Closed
                    </p>
                </div>
            </div>
        </div>
    );
}
