import React from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head } from "@inertiajs/react";
import ArticleCard from "@/Layouts/Article/ArticleCard";

export default function Academy({ articles, accounts }) {
    const categorizedArticles = articles.filter((article) => {
        if (article.is_published === "0") return false;

        return true;
    });

    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title="Academy" />
                    <div className="flex flex-col items-start gap-[24px] w-full">
                        <h1 className="text-white text-[32px] font-semibold">
                            Latest Articles
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[24px] w-full">
                            {categorizedArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>
                    </div>
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
