import React from "react";
import CardStatus from "./CardStatus";
import CardPhase from "./CardPhase";
import useNumberComma from "@/Hooks/useNumberComma";
import CardDates from "./CardDates";
import useGetPoolData from "@/Hooks/useGetPoolData";
import Button from "../UI/Button";
import useHasDatePassed from "@/Hooks/useHasDatePassed";
import { Link } from "@inertiajs/react";

export default function ProjectCard({ project }) {
    const { isFinished, amountRaised, percentageRaised } = useGetPoolData({
        project,
    });

    const isRegister = useHasDatePassed(project.register_starting_date);
    const isRegisterEnded = useHasDatePassed(project.register_deadline);
    const isActive = useHasDatePassed(project.starting_date);

    const buttonText = isFinished
        ? "View Details"
        : project.starting_date
        ? isActive
            ? "contribute now"
            : "More Details"
        : "More Details";

    // const buttonText = isRegister
    //     ? isRegisterEnded
    //         ? isActive
    //             ? isFinished
    //                 ? "View Details"
    //                 : "Participate"
    //             : "More Details"
    //         : "Register Now"
    //     : "More Details";

    const networkIcons = {
        BSC: "/images/network/bsc-icon.svg",
        Polygon: "/images/network/polygon-logo.svg",
        ETH: "/images/network/ethereum-icon.svg",
        Solana: "/images/network/solana-icon.svg",
    };

    const projectInfo = [
        {
            name: "Fundraising Chain:",
            value: project.fundraising_chain,
            image: networkIcons[project.fundraising_chain],
        },
        {
            name: "Distribution Chain:",
            value: project.distribution_chain,
            image: networkIcons[project.distribution_chain],
        },
        {
            name: "Swap Ratio:",
            value: `1 USDT = ${Number((1 / project.price).toFixed(5))} ${" "} ${
                project.sub_name
            }`,
            image: null,
        },
        {
            name: "Amount Target:",
            value: `${useNumberComma(project.amount_target)} USDT`,
            image: null,
        },
    ];

    return (
        <div className="flex flex-col items-start gap-[16px] w-full p-[5px] pb-[16px] lg:pb-[20px] rounded-[8px] border border-solid border-[#1B1B1B] bg-[#121212]">
            <div className="w-full relative">
                <img
                    src={`/storage/${project.logo}`}
                    alt=""
                    className="w-full aspect-[333/200]  lg:aspect-[414/232.875] rounded-[6px] object-cover"
                />
                <CardStatus project={project} />
            </div>
            <div className="flex flex-col items-start gap-[24px] lg:gap-[29px] w-full px-[15px]">
                <div className="flex flex-col items-start gap-[24px] w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start gap-[2px]">
                            <p className="text-[#FCFCFC] text-[18px] lg:text-[24px] font-semibold">
                                {project.name}
                            </p>
                            <p className="text-[#848484] text-[12px] lg:text-[14px] font-normal">
                                {project.sub_name}
                            </p>
                        </div>
                        <CardPhase project={project} />
                    </div>
                    <div className="flex flex-col items-start gap-[16px] w-full">
                        {projectInfo.map((info) => (
                            <div
                                key={info.name}
                                className="flex items-center justify-between w-full"
                            >
                                <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-normal">
                                    {info.name}
                                </p>
                                <div className="flex items-center gap-[10px]">
                                    <p className="text-[#E4E4E4] text-[12px] lg:text-[16px] font-medium">
                                        {info.value}
                                    </p>
                                    {info.image && (
                                        <img
                                            src={info.image}
                                            alt=""
                                            className="w-[20px]"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        <CardDates project={project} />
                        <div className="flex items-center justify-between w-full">
                            <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-normal">
                                Raise Progress:
                            </p>
                            <div className="flex items-center gap-[15px]">
                                <p className="text-[#E4E4E4] text-[12px] lg:text-[16px] font-medium">
                                    {percentageRaised}%
                                </p>
                                <div className="w-[95px] lg:w-[120px] h-[6px] rounded-[100px] bg-[#252525]">
                                    <div
                                        className="h-[6px] rounded-[100px] bg-[#E2FD70]"
                                        style={{
                                            width: `${percentageRaised}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href={`/projects/${project.slug}`} className="w-full">
                    <Button type="project" text={buttonText} />
                </Link>
            </div>
        </div>
    );
}
