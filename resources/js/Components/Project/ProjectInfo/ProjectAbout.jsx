import React from "react";

export default function ProjectAbout({ project }) {
    return (
        <div className="flex flex-col items-start gap-[12px] lg:gap-[16px]">
            <h4 className="text-[#FCFCFC] text-[16px] lg:text-[20px] font-semibold">
                About {project.name}
            </h4>
            <div
                className="project-about"
                dangerouslySetInnerHTML={{ __html: project.about }}
            ></div>
        </div>
    );
}
