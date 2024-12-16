import React from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head } from "@inertiajs/react";
import { Tab, Tabs } from "@/Layouts/Tabs/Tabs";
import ProjectsList from "@/Layouts/ProjectsList/ProjectsList";

export default function AllProjects({ projects, accounts }) {
    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title="All Projects" />
                    <Tabs>
                        <Tab label="All Projects">
                            <ProjectsList
                                projects={projects}
                                type="allProjects"
                            />
                        </Tab>
                        <Tab label="Active">
                            <ProjectsList projects={projects} type="active" />
                        </Tab>
                        <Tab label="Upcoming">
                            <ProjectsList projects={projects} type="upcoming" />
                        </Tab>
                        <Tab label="Completed">
                            <ProjectsList
                                projects={projects}
                                type="completed"
                            />
                        </Tab>
                    </Tabs>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
