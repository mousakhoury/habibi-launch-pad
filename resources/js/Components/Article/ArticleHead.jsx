import React from "react";

export default function ArticleHead({ article }) {
    const copyPageUrlToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("URL copied to clipboard!"); // Optional: Provide feedback to the user
        } catch (err) {
            console.error("Failed to copy: ", err); // Handle possible errors
        }
    };

    function formatDate(dateString) {
        const options = { day: "2-digit", month: "long", year: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", options);
    }

    return (
        <div className="flex flex-col items-start gap-[24px] w-full">
            <div className="flex flex-col items-start gap-[20px] lg:gap-[32px] w-full">
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-[12px] flex-wrap ">
                        {article.category.map((cat) => (
                            <div
                                key={cat.name}
                                className="px-[8px] lg:px-[12px] py-[4px] lg:py-[6px] rounded-[100px] border border-solid border-[#3D3D3D]"
                            >
                                <p className="text-[#848484] text-[12px] lg:text-[16px] font-medium leading-[15px] lg:leading-[20px]">
                                    {cat.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div
                        onClick={copyPageUrlToClipboard}
                        className="share-article cursor-pointer"
                    >
                        <img
                            src="/images/article/share.svg"
                            alt=""
                            className="h-[32px] unhover"
                        />
                        <img
                            src="/images/article/share-hover.svg"
                            alt=""
                            className="h-[32px] hover"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[12px] lg:gap-[24px] w-full">
                    <h1 className="text-[#FCFCFC] text-[22px] lg:text-[32px] font-semibold max-w-[648px] leading-[27px] lg:leading-[39px]">
                        {article.title}
                    </h1>
                    <div className="flex items-start gap-[12px] lg:gap-[16px] w-full flex-wrap">
                        <div className="flex items-center gap-[12px]">
                            <img
                                src={`/storage/${article.user.image}`}
                                className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px] rounded-[1000px] object-cover"
                                alt=""
                            />
                            <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-medium">
                                {article.user.name}
                            </p>
                        </div>
                        <div className="w-[1px] h-[32px] bg-[#3D3D3D]" />
                        <div className="flex items-center gap-[12px]">
                            <img
                                src="/images/article/date.svg"
                                className="w-[24px] lg:w-[32px] rounded-[1000px]"
                                alt=""
                            />
                            <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-medium">
                                {formatDate(article.created_at)}
                            </p>
                        </div>
                        <div className="w-[1px] h-[32px] bg-[#3D3D3D]" />
                        <div className="flex items-center gap-[12px]">
                            <img
                                src="/images/article/time.svg"
                                className="w-[24px] lg:w-[32px] rounded-[1000px]"
                                alt=""
                            />
                            <p className="text-[#B4B4B4] text-[12px] lg:text-[16px] font-medium">
                                {article.time} Minutes Read
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src={`/storage/${article.image}`}
                className="w-full aspect-[648/364.5] rounded-[6px]"
                alt=""
            />
        </div>
    );
}
