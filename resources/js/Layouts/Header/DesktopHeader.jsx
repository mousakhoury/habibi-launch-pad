import React from "react";
import HeaderItems from "./HeaderItems";
import ConnectionButton from "./ConnectionButton";

export default function DesktopHeader() {
    return (
        <div className="w-full border-b border-solid border-[#252525]">
            <div className="w-full max-w-[1280px] xl:max-w-[1440px] mx-auto px-[40px] xl:px-[60px] flex flex-col items-start ">
                <div className="w-full flex items-center justify-between h-[80px] ">
                    <img src="/images/header/logo.svg" alt="" />
                    <HeaderItems />
                    <ConnectionButton />
                </div>
            </div>
        </div>
    );
}
