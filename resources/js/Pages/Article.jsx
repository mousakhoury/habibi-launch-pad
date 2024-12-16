import React, { useEffect, useRef, useState } from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head, Link } from "@inertiajs/react";
import ArticleHead from "@/Components/Article/ArticleHead";
import ArticleBody from "@/Components/Article/ArticleBody";
import ArticleCard from "@/Layouts/Article/ArticleCard";
import ArticleUseful from "@/Components/Article/ArticleUseful";

export default function Article({ article, newArticles, type }) {
    const [isUseful, setIsUseFull] = useState(true);
    const isUsefulHandler = () => {
        setIsUseFull(false);
    };

    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template>
                    <Head title={article.title} />
                    <div className="flex flex-col items-start gap-[16px] lg:gap-[30px] w-full">
                        <Link
                            className="flex items-center gap-[12px]"
                            href="/academy"
                        >
                            <img
                                src="/images/project/link-arrow.svg"
                                alt=""
                                className="w-[20px]"
                            />
                            <p className="text-[#CCC] text-[12px] lg:text-[14px] font-medium">
                                Back
                            </p>
                        </Link>

                        <div className="flex items-start justify-between w-full relative">
                            <div className="flex flex-col items-start gap-[30px] w-full max-w-[872px] ">
                                <ArticleHead article={article} />
                                <ArticleBody article={article} />

                                {type !== "News" && (
                                    <>
                                        {isUseful && (
                                            <ArticleUseful
                                                isUsefulHandler={
                                                    isUsefulHandler
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="relative">
                                <div className="flex flex-col items-start gap-[24px] w-full max-w-[312px] sticky top-0">
                                    <p className="text-[#FCFCFC] text-[32px] font-semibold">
                                        Latest {type}
                                    </p>
                                    <div className="flex flex-col items-start gap-[24px] w-full">
                                        {newArticles.map((article) => (
                                            <ArticleCard
                                                key={article.id}
                                                article={article}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
