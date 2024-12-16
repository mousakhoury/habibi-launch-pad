import useDateFormater from "@/Hooks/useDateFormater";
import React from "react";

export default function SelectedProject({ project, closeSelectedHandler }) {
    const totalTokens = project.amount_target / project.price;
    const claimedTokens = project.claimed_percentage
        ? (totalTokens * project.claimed_percentage) / 100
        : 0;
    const remainTokens = totalTokens - claimedTokens;

    const selectedData = [
        {
            name: "Project Name:",
            value: project.name,
        },
        {
            name: "Total Tokens:",
            value: `${totalTokens} ${project.sub_name}`,
        },
        {
            name: "Claimed/ Airdropped:",
            value: `${claimedTokens} ${project.sub_name}`,
        },
        {
            name: "Remains:",
            value: `${remainTokens} ${project.sub_name}`,
        },
        {
            name: "Vesting:",
            value: project.vesting,
        },
        {
            name: "Next Claim / Airdrop on :",
            value: useDateFormater(project.next_claim_date),
        },
    ];

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 bg-[#0D0D0DD9] w-full h-screen z-10">
            <div className="flex flex-col items-start gap-[16px] pb-[16px] rounded-[12px] border border-[#323232] bg-[#1B1B1B] w-full max-w-[424px]">
                <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[13px] rounded-t-[12px] border-b border-[#3D3D3D bg-[#272727] w-full relative">
                    <p className="text-[#FCFCFC] text-[20px] font-semibold">
                        Investment Details
                    </p>
                    <img
                        src="images/account/close-button.svg"
                        alt=""
                        onClick={closeSelectedHandler}
                        className="absolute top-[-12px] right-[-12px] cursor-pointer"
                    />
                </div>
                <div className="flex flex-col items-start gap-[30px] px-[16px] w-full">
                    <div className="flex flex-col items-start gap-[16px]">
                        <img
                            src={`storage/${project.main_image}`}
                            alt=""
                            className="w-full aspect-[392/120] object-cover rounded-[6px]"
                        />
                        <div className="flex flex-col items-start gap-[20px] w-full">
                            {selectedData.map((data, index) => (
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-[#9C9C9C] text-[16px] font-medium">
                                        {data.name}
                                    </p>
                                    <p className="text-[#E4E4E4] text-[16px] font-medium">
                                        {data.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-start gap-[8px]">
                        <img
                            src="images/account/info.svg"
                            alt=""
                            className="w-[18px]"
                        />
                        <p className="text-[#555] text-[14px] font-medium">
                            Next Claim Date Change to October 12, 2024 from 28
                            September, 2024.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
