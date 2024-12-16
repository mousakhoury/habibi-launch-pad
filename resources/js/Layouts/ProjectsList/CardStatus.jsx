import React from "react";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useProjectStatus from "@/Hooks/useProjectStatus";

export default function CardStatus({ project }) {
    const { poolDate, isFinished, isWithdrawn, percentageRaised } =
        useGetPoolData({ project });
    const statusText = useProjectStatus(project.starting_date, isFinished);

    return (
        <div
            className={`${
                statusText === "Active"
                    ? "bg-[#57D37D]"
                    : statusText === "Completed"
                    ? "bg-[#E26666]"
                    : "bg-[#D3CE57]"
            } px-[12px] py-[6px] rounded-[1000px] absolute top-[10px] left-[10px] `}
        >
            <p
                className={`${
                    statusText === "Active"
                        ? "text-[#051C0C]"
                        : statusText === "Completed"
                        ? "text-[#1C0505]"
                        : "text-[#2C2B12]"
                }  text-[12px] lg:text-[14px] font-medium leading-[15px] lg:leading-[17px]`}
            >
                {statusText}
            </p>
        </div>
    );
}
