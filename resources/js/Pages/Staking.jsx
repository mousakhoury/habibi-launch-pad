import React from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import StakingElements from "@/Components/Staking/StakingElements";
import { PriceProvider } from "@/Store/PriceContext";
import StakingForm from "@/Components/Staking/StakingForm";
import StakeHistory from "@/Components/Staking/StakeHistory";
import Tier from "@/Layouts/Tier/Tier";
import useIsMobile from "@/Hooks/useIsMobile";
import { Head } from "@inertiajs/react";

export default function Staking({ histories, accounts }) {
    const isMobile = useIsMobile();

    return (
        <BlockchainProvider>
            <Web3Provider>
                <PriceProvider>
                    <Template accounts={accounts}>
                        <Head title="Staking" />
                        <div className="flex flex-col items-start gap-[24px] w-full">
                            <StakingElements />
                            <div className="flex items-start gap-[24px] w-full p-[6px] rounded-[12px] border border-solid border-[#1B1B1B] bg-[#121212]">
                                <div className="flex flex-col items-start w-full gap-[24px]">
                                    <StakingForm
                                        histories={histories}
                                        accounts={accounts}
                                    />
                                    {isMobile && <Tier />}
                                    <StakeHistory histories={histories} />
                                </div>
                                {!isMobile && <Tier />}
                            </div>
                        </div>
                    </Template>
                </PriceProvider>
            </Web3Provider>
        </BlockchainProvider>
    );
}
