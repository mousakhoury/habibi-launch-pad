import React from "react";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useHasDatePassed from "@/Hooks/useHasDatePassed";

export default function CardPhase({ project }) {
    const isRegister = useHasDatePassed(project.register_starting_date);
    const isActive = useHasDatePassed(project.starting_date);
    const { isFinished } = useGetPoolData({ project });

    return (
        <div className="px-[12px] py-[8px] rounded-[8px] border border-solid border-[#252525] text-[14px] lg:text-[16px] font-medium leading-[20px]">
            {isFinished ? (
                <>
                    <p className="text-[#E26666]">Finished</p>
                </>
            ) : (
                <>
                    {project.starting_date ? (
                        <>
                            {isActive ? (
                                <p className="text-[#57D37D]">Pool is Opened</p>
                            ) : (
                                <p className="text-[#57D37D]">starting soon</p>
                            )}
                        </>
                    ) : (
                        <p className="text-[#B4B4B4]">TBA</p>
                    )}
                </>
            )}
        </div>
    );
}
