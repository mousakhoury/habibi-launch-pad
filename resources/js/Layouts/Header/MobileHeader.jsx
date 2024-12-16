import React, { useState, useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";
import ConnectionButton from "./ConnectionButton";
import MobileMenu from "./MobileMenu";

export default function MobileHeader() {
    const { account } = useContext(Web3Context);
    const [isOpen, setIsOpen] = useState(false);

    const openMenuHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative z-50">
            <div
                className={`px-[16px] py-[14px] w-full flex items-center justify-between h-[60px] ${
                    !isOpen && "border-b border-solid border-[#252525]"
                } `}
            >
                <img
                    src="/images/header/logo.svg"
                    alt=""
                    className="w-[59.429px]"
                />
                <div className="flex items-center gap-[18px]">
                    {!account && <ConnectionButton />}
                    <img
                        src={`/images/header/${
                            isOpen ? "close-menu.svg" : "humburger-menu.svg"
                        }`}
                        alt=""
                        className="cursor-pointer"
                        onClick={openMenuHandler}
                    />
                </div>
            </div>

            <MobileMenu isOpen={isOpen} />
        </div>
    );
}
