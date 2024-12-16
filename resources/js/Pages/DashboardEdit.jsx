import React from "react";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Web3Provider } from "@/Store/Web3Context";
import CreatePool from "@/Components/AdminDashboard/CreatePool";
import Template from "@/Layouts/Template";

export default function DashboardEdit({ project, accounts }) {
    return (
        <Web3Provider>
            <BlockchainProvider>
                <Template accounts={accounts}>
                    <div className=" p-[30px]">
                        <div className="m-auto w-[790px] flex flex-col items-center justify-center border-2 border-solid border-[#d8d3cd] p-[24px] rounded-[12px] gap-[20px]">
                            <CreatePool project={project} />
                        </div>
                    </div>
                </Template>
            </BlockchainProvider>
        </Web3Provider>
    );
}
