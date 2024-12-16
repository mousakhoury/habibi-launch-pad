import React from "react";
import { Link, usePage } from "@inertiajs/react";
import styles from "./HeaderItems.module.css";

export default function HeaderItems() {
    const { url } = usePage();
    const getLinkClass = (path) => {
        return url === path ? styles.activeLink : "";
    };

    const links = [
        {
            name: "Dashboard",
            path: "/",
            image: "/images/header/dashboard.svg",
            hover: "/images/header/dashboard-hover.svg",
            active: "/images/header/dashboard-active.svg",
        },
        {
            name: "Account",
            path: "/account",
            image: "/images/header/account.svg",
            hover: "/images/header/account-hover.svg",
            active: "/images/header/account-active.svg",
        },
        {
            name: "Staking",
            path: "/staking",
            image: "/images/header/staking.svg",
            hover: "/images/header/staking-hover.svg",
            active: "/images/header/staking-active.svg",
        },
        {
            name: "Projects",
            path: "/projects",
            image: "/images/header/all-projects.svg",
            hover: "/images/header/all-projects-hover.svg",
            active: "/images/header/all-projects-active.svg",
        },
        {
            name: "Academy",
            path: "/academy",
            image: "/images/header/academy.svg",
            hover: "/images/header/academy-hover.svg",
            active: "/images/header/academy-active.svg",
        },
        {
            name: "Prepaid Cards",
            path: "/prepaid-cards",
            image: "/images/header/credit-cart.svg",
            hover: "/images/header/credit-cart-hover.svg",
            active: "/images/header/credit-cart-active.svg",
        },
    ];
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[30px] lg:gap-0 justify-between w-full max-w-[838px] h-full">
            {links.map((link) => (
                <Link
                    key={link.name}
                    className={`${styles.header_link} ${getLinkClass(
                        link.path
                    )}`}
                    href={link.path}
                >
                    <div className={styles.img}>
                        <img src={link.image} className={styles.image} alt="" />
                        <img src={link.hover} className={styles.hover} alt="" />
                        <img
                            src={link.active}
                            className={styles.active}
                            alt=""
                        />
                    </div>

                    <p>{link.name} </p>
                </Link>
            ))}
        </div>
    );
}
