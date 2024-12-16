import React, { useEffect, useRef, useState } from "react";
import SizeChanger from "./SizeChanger";

export default function ArticleBody({ article }) {
    const [progress, setProgress] = useState(0);
    const [articleHeight, setArticleHeight] = useState(0);

    const articleBodyRef = useRef(null);
    const [sizeClass, setSizeClass] = useState("small");

    const handleScroll = () => {
        const articleBody = articleBodyRef.current;
        if (articleBody) {
            const rect = articleBody.getBoundingClientRect();
            const height = rect.height;

            setArticleHeight(height);

            // console.log("Article body height:", height);

            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const articleBodyTop = articleBody.offsetTop;
            const articleBodyHeight = height;

            let scrollDistance = scrollTop - articleBodyTop;
            scrollDistance = Math.max(0, scrollDistance);

            let scrollProgress = (scrollDistance / articleBodyHeight) * 100;

            scrollProgress = Math.max(0, Math.min(100, scrollProgress));

            setProgress(scrollProgress);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="flex items-start w-full justify-between relative">
                <div
                    ref={articleBodyRef}
                    className={`article-body ${sizeClass}`}
                    dangerouslySetInnerHTML={{
                        __html: article.body,
                    }}
                ></div>

                <div className="w-[6px] rounded-[100px] h-[80vh] sticky top-[10px] bg-[#1B1B1B]">
                    <div
                        className=" progress-line w-full rounded-[100px] bg-[#E2FD70] relative"
                        style={{ height: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <SizeChanger sizeClass={sizeClass} setSizeClass={setSizeClass} />
        </>
    );
}
