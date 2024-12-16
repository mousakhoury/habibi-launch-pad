import React from "react";
import PoolProgressLine from "./PoolProgressLine";
import ContributionStatus from "./ContributionStatus";
import ContributeTimeLine from "./Contribution/ContributeTimeLine";
import useIsMobile from "@/Hooks/useIsMobile";

export default function PoolInfo({ project }) {
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-col items-start gap-[24px] p-[8px] pb-[24px] rounded-[8px] border border-solid border-[#252525] bg-[#1B1B1B] w-full">
            <ContributionStatus project={project} />
            <PoolProgressLine project={project} />
            {!isMobile && <ContributeTimeLine project={project} />}
        </div>
    );
}
