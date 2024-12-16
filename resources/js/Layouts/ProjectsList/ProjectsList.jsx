import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "@/Store/Web3Context";
import useGetPoolData from "@/Hooks/useGetPoolData";
import useHasDatePassed from "@/Hooks/useHasDatePassed";
import useStakedAmount from "@/Hooks/useStakedAmount";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ projects, type }) {
    const { web3, account } = useContext(Web3Context);
    const [upcomingProjects, setUpcomingProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);

    const stakedAmount = useStakedAmount();

    const updatedProjects = projects.map((project) => {
        const { isFinished } = useGetPoolData({ project });
        const hasStarted = useHasDatePassed(project.starting_date);

        return {
            ...project,
            isFinished: project.pool_id ? isFinished : false,
            hasStarted: hasStarted,
        };
    });

    const categorizedProjects = updatedProjects.filter((project) => {
        if (project.type === "Master" && stakedAmount < 10000000000)
            return false;
        if (
            project.type === "Diamond" &&
            (stakedAmount < 5000000000 || stakedAmount >= 10000000000)
        )
            return false;
        if (project.is_published === "0") return false;

        return true;
    });

    // console.log(categorizedProjects);

    const upcoming = categorizedProjects.filter(
        (project) => !project.hasStarted
    );
    const active = categorizedProjects.filter(
        (project) => project.hasStarted && !project.isFinished
    );
    const completed = categorizedProjects.filter(
        (project) => project.isFinished
    );

    return (
        <div className="flex flex-col items-start gap-[20px] lg:gap-[24px] w-full">
            <h1 className="text-white text-[20px] lg:text-[32px] font-semibold">
                {type === "allProjects" && "All Projects"}
                {type === "active" && "Active"}
                {type === "upcoming" && "Upcoming"}
                {type === "completed" && "Completed"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px] lg:gap-[24px] w-full">
                {type === "allProjects" && (
                    <>
                        {categorizedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                )}
                {type === "active" && (
                    <>
                        {active.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                )}
                {type === "upcoming" && (
                    <>
                        {upcoming.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                )}
                {type === "completed" && (
                    <>
                        {completed.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
