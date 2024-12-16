import React from "react";
import ProjectAbout from "./ProjectAbout";
import ProjectDealInfo from "./ProjectDealInfo";

export default function ProjectInfo({ project }) {
    const links = [
        {
            name: "Website",
            url: project.website,
            image: "website.svg",
        },
        {
            name: "Telegram",
            url: project.telegrem,
            image: "telegram.svg",
        },
        {
            name: "Twitter",
            url: project.twitter,
            image: "twitter.svg",
        },
    ];

    return (
        <div className="flex flex-col items-start gap-[24px] px-[11px] lg:px-0">
            <ProjectAbout project={project} />
            <ProjectDealInfo project={project} />
            <div className="flex items-start gap-[24px]">
                {links.map((link) => (
                    <a key={link.name} href={link.url} target="_blank">
                        <div className="flex items-center gap-[5px] lg:gap-[12px]">
                            <img
                                src={`/images/project/${link.image}`}
                                alt=""
                                className="w-[20px] lg:w-[24px]"
                            />
                            <p className="text-[#E4E4E4] text-[12px] lg:text-[14px] font-medium">
                                {link.name}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
