import React, { useState } from "react";
import { Tab, Tabs } from "@/Layouts/Tabs/Tabs";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import Tokenomics from "./Tokenomics/Tokenomics";
import Missions from "./Quests/Missions";
import useGetAccount from "@/Hooks/useGetAccount";

export default function ProjectData({
    project,
    accounts,
    activeTab,
    handleTabChange,
}) {
    const { matchedAccount } = useGetAccount({ accounts });

    return (
        <div className="rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B] p-[16px] px-[5px] lg:px-[16px] w-full">
            <Tabs initialActiveTab={activeTab} onTabChange={handleTabChange}>
                <Tab label="Project Info">
                    <ProjectInfo project={project} />
                </Tab>
                <Tab label="Tokenomics">
                    <Tokenomics project={project} />
                </Tab>
                <Tab label="Claim">This is the Claim tab.</Tab>
                <Tab label="Missions">
                    <Missions accounts={accounts} />
                </Tab>
            </Tabs>
        </div>
    );
}
