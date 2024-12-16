import React from "react";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useProjectStatus from "@/Hooks/useProjectStatus";

export default function ProjectStatus({ project }) {
    const { poolDate, isFinished, isWithdrawn, percentageRaised } =
        useGetPoolData({ project });
    const statusText = useProjectStatus(project.starting_date, isFinished);

    return (
        <div
            className={`${
                statusText === "Active"
                    ? "bg-[#57d37d1a]"
                    : statusText === "Completed"
                    ? "bg-[#e266661a]"
                    : "bg-[#d3ce571a]"
            } px-[8px] lg:px-[12px] py-[4px] lg:py-[6px] rounded-[2px] `}
        >
            <p
                className={`${
                    statusText === "Active"
                        ? "text-[#57D37D]"
                        : statusText === "Completed"
                        ? "text-[#E26666]"
                        : "text-[#D3CE57]"
                }  text-[12px] lg:text-[14px] font-medium`}
            >
                {statusText}
            </p>
        </div>
    );
}
