import React from "react";
import TokenomicsInfo from "./TokenomicsInfo";
import TokenomicsChart from "./TokenomicsChart";

export default function Tokenomics({ project }) {
    console.log(project.chart);
    return (
        <div className="flex flex-col items-center gap-[38px] px-[11px] lg:px-0">
            <TokenomicsInfo project={project} />
            <TokenomicsChart chart={project.chart} />
        </div>
    );
}
