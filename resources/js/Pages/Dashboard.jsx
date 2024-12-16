import React from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import DashboardPages from "@/Components/Dashboard/DashboardPages";
import DashboardNews from "@/Components/Dashboard/DashboardNews";
import { Head } from "@inertiajs/react";
import ProjectsList from "@/Layouts/ProjectsList/ProjectsList";

export default function Dashboard({ projects, accounts, news }) {
    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title="Dashboard" />
                    <div className="w-full flex flex-col items-start gap-[40px] lg:gap-[80px]">
                        <div className="w-full flex flex-col items-start gap-[16px]">
                            <DashboardPages />
                            <DashboardNews news={news} />
                        </div>
                        <hr className="w-full h-[1px] bg-[#252525] border-0" />
                        <ProjectsList projects={projects} type="allProjects" />
                    </div>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
