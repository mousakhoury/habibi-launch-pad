import React from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head } from "@inertiajs/react";
import Tier from "@/Layouts/Tier/Tier";
import AccountInfo from "@/Components/Account/AccountInfo";
import AccountHistory from "@/Components/Account/AccountHistory";
import useIsMobile from "@/Hooks/useIsMobile";

export default function Account({ projects, accounts }) {
    const isMobile = useIsMobile();
    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title="Account" />
                    <div className="flex items-start gap-[24px]">
                        <div className="flex flex-col items-start gap-[24px] w-full">
                            <AccountInfo />
                            {isMobile && <Tier />}
                            <AccountHistory projects={projects} />
                        </div>
                        {!isMobile && <Tier />}
                    </div>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
