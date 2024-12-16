import { useState } from "react";

import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head, Link, usePage } from "@inertiajs/react";
import ProjectMain from "@/Components/Project/ProjectMain";
import ProjectData from "@/Components/Project/ProjectData";
import PoolInfo from "@/Components/Project/PoolInfo";
import MissionsAvailable from "@/Components/Project/MissionsAvailable";

export default function Project({ project, accounts }) {
    const [activeTab, setActiveTab] = useState("Project Info");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const openMissionsTab = () => {
        setActiveTab("Missions");
    };
    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title={project.name} />
                    <div className="flex flex-col items-start gap-[16px] lg:gap-[30px] w-full">
                        <Link
                            className="flex items-center gap-[12px]"
                            href="/projects"
                        >
                            <img
                                src="/images/project/link-arrow.svg"
                                alt=""
                                className="w-[20px]"
                            />
                            <p className="text-[#CCC] text-[12px] lg:text-[14px] font-medium">
                                Back to Projects
                            </p>
                        </Link>
                        <div className="flex items-start gap-[24px] w-full flex-wrap-reverse lg:flex-nowrap">
                            <div className="flex flex-col items-start gap-[16px] lg:gap-[24px] p-0 lg:p-[6px] rounded-[12px] border-0 lg:border border-solid border-[#1B1B1B] bg-transparent lg:bg-[#121212] w-full">
                                <ProjectMain project={project} />
                                <ProjectData
                                    project={project}
                                    accounts={accounts}
                                    activeTab={activeTab}
                                    handleTabChange={handleTabChange}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-[24px] w-full max-w-full lg:max-w-[423px]">
                                <MissionsAvailable
                                    accounts={accounts}
                                    openMissionsTab={openMissionsTab}
                                />
                                <PoolInfo project={project} />
                            </div>
                        </div>
                    </div>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
