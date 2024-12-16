import Template from "@/Layouts/Template";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Web3Provider } from "@/Store/Web3Context";

import React from "react";

export default function AdminDashboard({ projects, accounts }) {
    return (
        <Web3Provider>
            <BlockchainProvider>
                <Template accounts={accounts}>
                    <div className="grid w-full gap-[30px] grid-cols-3 p-[30px]">
                        {projects.map((project) => (
                            <div className="flex flex-col items-center justify-center border-2 border-solid border-[#d8d3cd] p-[24px] rounded-[12px] gap-[20px]">
                                <img
                                    src={`/storage/${project.main_image}`}
                                    alt=""
                                    className="w-full aspect-[16/9] object-cover rounded-[8px] "
                                />
                                <p className="text-[24px] text-[#d2d2d2] font-bold ">
                                    {project.name}
                                </p>
                                <a href={`/admin-dashboard/${project.slug}`}>
                                    <button className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] ">
                                        <p className="text-[16px] text-[#fff]  ">
                                            Edit
                                        </p>
                                    </button>
                                </a>
                            </div>
                        ))}
                    </div>
                </Template>
            </BlockchainProvider>
        </Web3Provider>
    );
}
