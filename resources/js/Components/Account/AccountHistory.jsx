import useGetUserInvestment from "@/Hooks/Account/useGetUserInvestment";
import useDateFormater from "@/Hooks/useDateFormater";
import { useState } from "react";
import SelectedProject from "./SelectedProject";

export default function AccountHistory({ projects }) {
    const { filteredInvestments, isLoading, error } = useGetUserInvestment({
        projects,
    });
    const [openSelectedProject, setOpenSelectedProject] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const selectProjectHandler = (project) => {
        setOpenSelectedProject(true);
        setSelectedProject(project);
    };

    const closeSelectedHandler = () => {
        setOpenSelectedProject(false);
    };

    return (
        <div className="flex flex-col items-start gap-[24px] rounded-[8px] py-[16px]  border border-solid border-[#252525] bg-[#1B1B1B] w-full">
            <p className="text-[#FCFCFC] text-[20px] lg:text-[24px] font-semibold pl-[16px] ">
                Investment History
            </p>
            {filteredInvestments.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-[6px] w-full h-[186px]">
                    <p className="text-[#CCC] text-[20px] font-semibold">
                        Investment History Not Found
                    </p>
                    <p className="text-[#848484] text-[14px] font-normal">
                        Connect your wallet to see your investment History
                    </p>
                </div>
            ) : (
                <div className="w-full overflow-x-scroll lg:overflow-x-auto">
                    <table className="w-[872px] lg:w-full">
                        <thead className="bg-[#252525] h-[57px] border-y border-solid border-[#3D3D3D]">
                            <tr className="text-[#E4E4E4] text-[14px] font-semibold text-left">
                                <th className="w-[157px] pl-[24px]">
                                    Project Name
                                </th>
                                <th className="w-[104px]">Token</th>
                                <th className="w-[133px]">Token Price</th>
                                <th className="w-[159px]">Invested Amount</th>
                                <th className="w-[199px]">Lookup</th>
                                <th className="w-[120px] pr-[24px]">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvestments
                                .filter((project) => project.invest !== "N/A")
                                .map((project, index) => (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            selectProjectHandler(project)
                                        }
                                        className="h-[60px] text-[#848484] text-[14px] font-medium text-left border-b border-solid border-[#252525] bg-[#1B1B1B] hover:bg-[#2B2B2B] cursor-pointer"
                                    >
                                        <td className="w-[157px] pl-[24px]">
                                            {project.name}
                                        </td>
                                        <td className="w-[104px]">
                                            {project.sub_name}
                                        </td>
                                        <td className="w-[133px]">
                                            {" "}
                                            ${project.price}
                                        </td>
                                        <td className="w-[159px]">
                                            ${project.invest}
                                        </td>
                                        <td className="w-[199px]">
                                            <p className="w-[162px]">
                                                {project.vesting}
                                            </p>
                                        </td>
                                        <td className="w-[120px] pr-[24px]">
                                            <p className="w-[98px]">
                                                {useDateFormater(
                                                    project.starting_date
                                                )}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {openSelectedProject && (
                        <SelectedProject
                            project={selectedProject}
                            closeSelectedHandler={closeSelectedHandler}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
