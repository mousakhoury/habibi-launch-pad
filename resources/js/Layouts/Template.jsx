import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Template(props) {
    return (
        <>
            <Header accounts={props.accounts} />
            <div className="w-full max-w-[1280px] xl:max-w-[1440px] mx-auto pt-[24px] lg:pt-[24px] pb-[60px] lg:pb-[100px] px-[16px] lg:px-[40px] xl:px-[60px]">
                {props.children}
            </div>
            <Footer />
        </>
    );
}
