import React, { useState, useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";
import ConnectionButton from "./ConnectionButton";
import HeaderItems from "./HeaderItems";

export default function MobileMenu({ isOpen }) {
    const { account } = useContext(Web3Context);
    return (
        <div
            className={`flex flex-col items-start gap-[30px] p-[15px] pb-[40px] bg-[#0D0D0D] w-full absolute top-full left-0 border-b border-solid border-[#252525]  ${
                isOpen
                    ? ` ${
                          account ? "h-[433.4xp]" : "h-[349.8px]"
                      } opacity-100 block `
                    : "h-0 opacity-0 hidden"
            } `}
        >
            {account && <ConnectionButton />}
            <HeaderItems />
        </div>
    );
}
