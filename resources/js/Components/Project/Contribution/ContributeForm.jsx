import React from "react";
import ContributionInfo from "./ContributionInfo";
import ContributeInputs from "./ContributeInputs";

export default function ContributeForm({ project, phase }) {
    return (
        <div className="flex flex-col items-start gap-[20px] p-[6px] rounded-[4px] bg-[#222] w-full">
            <ContributionInfo project={project} phase={phase} />
            <ContributeInputs project={project} phase={phase} />
        </div>
    );
}
