import React, { useState } from "react";

export default function SizeChanger({ sizeClass, setSizeClass }) {
    const [isOPen, setIsOpen] = useState(false);

    const openSizeChangerHandler = () => {
        setIsOpen(true);
    };

    const closeSizeChangerHandler = () => {
        setIsOpen(false);
    };

    const changeSizeHandler = (size) => {
        setSizeClass(size);
    };

    return (
        <div
            className={`flex flex-col items-center justify-end  gap-[20px] w-[60px] fixed bottom-[30px] right-[50px] rounded-[1000px] bg-[#252525] cursor-pointer transition-[height] duration-300 z-[50] ${
                isOPen ? "h-[229px]  p-[5px]" : "h-[60px] p-[13px]"
            }`}
        >
            {isOPen && (
                <div className="flex flex-col items-center justify-end  gap-[12px] w-full">
                    <div
                        onClick={() => changeSizeHandler("small")}
                        className={`w-[40px] h-[40px] rounded-[100px] p-[11px] ${
                            sizeClass === "small" && "bg-[#ffffff1a]"
                        } `}
                    >
                        <img src="/images/article/font-small.svg" alt="" />
                    </div>
                    <div
                        onClick={() => changeSizeHandler("medium")}
                        className={`w-[40px] h-[40px] rounded-[100px] p-[8px] ${
                            sizeClass === "medium" && "bg-[#ffffff1a]"
                        }`}
                    >
                        <img src="/images/article/font-medium.svg" alt="" />
                    </div>
                    <div
                        onClick={() => changeSizeHandler("big")}
                        className={`w-[40px] h-[40px] rounded-[100px] p-[5px] ${
                            sizeClass === "big" && "bg-[#ffffff1a]"
                        }`}
                    >
                        <img src="/images/article/font-big.svg" alt="" />
                    </div>
                </div>
            )}

            {isOPen ? (
                <div
                    className="w-[50px] h-[50px] p-[9px] flex flex-col items-center justify-center rounded-[1000px] bg-[#3D3D3D]"
                    onClick={closeSizeChangerHandler}
                >
                    <img src="/images/article/cross-square.svg" alt="" />
                </div>
            ) : (
                <img
                    src="/images/article/setting.svg"
                    alt=""
                    onClick={openSizeChangerHandler}
                />
            )}
        </div>
    );
}
