import React from "react";
import { Link } from "@inertiajs/react";

export default function ArticleCard({ article }) {
    return (
        <div className="flex flex-col items-start w-full gap-[20.13px] p-[5px] rounded-[8px] border border-solid border-[#1B1B1B] hover:border-[#3D3D3D] bg-[#121212] hover:bg-[#252525]">
            <div>
                <img
                    src={`/storage/${article.image}`}
                    className="w-full aspect-[302/169.875] rounded-[4.377px] object-cover"
                    alt=""
                />
            </div>
            <div className="px-[11px] flex flex-col items-start gap-[20px] w-full">
                <Link
                    href={`/academy/${article.slug}`}
                    className="text-white text-[18px] font-medium leading-[22px]"
                >
                    {article.title}
                </Link>
                <div className="flex items-start gap-[12px] flex-wrap ">
                    {article.category.map((cat) => (
                        <div
                            key={cat.name}
                            className="px-[8px] py-[4px] rounded-[100px] border border-solid border-[#3D3D3D]"
                        >
                            <p className="text-[#848484] text-[14px] font-medium leading-[17px]">
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex items-start gap-[6px] pt-[15.125px] pb-[14.875px] border-t border-solid border-[#252525] w-full">
                    <p className="text-[#848484] text-[16px] font-medium">
                        by:
                    </p>
                    <p className="text-[#E4E4E4] text-[16px] font-semibold">
                        {article.user.name}
                    </p>
                </div>
            </div>
        </div>
    );
}
