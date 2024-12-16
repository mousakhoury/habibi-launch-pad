import Button from "@/Layouts/UI/Button";
import React from "react";

export default function ArticleUseful({ isUsefulHandler }) {
    return (
        <div className="w-full mt-[30px] py-[48px] rounded-[12px] border border-solid border-[#252525] bg-[#121212] flex flex-col items-center justify-center gap-[24px]">
            <p className="text-[#E4E4E4] text-[32px] font-semibold text-center max-w-[482px]">
                Did you find the <br /> article informative and useful?
            </p>
            <div className="flex items-start gap-[24px]">
                <Button onClick={isUsefulHandler} type="useful" />
                <Button onClick={isUsefulHandler} type="notUseful" />
            </div>
        </div>
    );
}
