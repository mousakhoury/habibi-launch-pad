import React from "react";
import ProjectStatus from "./ProjectStatus";
import TokenInfo from "./TokenInfo";

export default function ProjectMain({ project }) {
    return (
        <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B] p-[16px] w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[8px] justify-between w-full mb-[8px] lg:mb-0">
                <h1 className="text-[#FCFCFC] text-[20px] lg:text-[24px] font-semibold">
                    {project.name}
                </h1>
                <ProjectStatus project={project} />
            </div>
            <img
                src={`/storage/${project.main_image}`}
                alt=""
                className="w-full aspect-[311/148] lg:aspect-[828/250] rounded-[6px] object-cover"
            />
            <TokenInfo project={project} />
        </div>
    );
}
