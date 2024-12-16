import React, { useState, useEffect } from "react";
import styles from "./Tabs.module.css";

export const Tab = ({ children }) => <>{children}</>;

export const Tabs = ({ children, initialActiveTab, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(
        initialActiveTab || children[0].props.label
    );

    useEffect(() => {
        if (initialActiveTab) {
            setActiveTab(initialActiveTab);
        }
    }, [initialActiveTab]);

    const handleClick = (label) => {
        setActiveTab(label);
        if (onTabChange) {
            onTabChange(label);
        }
    };

    return (
        <div className="flex flex-col items-center gap-[24px] w-full">
            <ul className={styles.tab_list}>
                {children.map((tab) => {
                    const label = tab.props.label;
                    return (
                        <li
                            key={label}
                            className={
                                label === activeTab ? `${styles.active}` : ""
                            }
                            onClick={() => handleClick(label)}
                        >
                            {label}
                        </li>
                    );
                })}
            </ul>
            <div className={styles.tab_content}>
                {children.map((content) => {
                    if (content.props.label !== activeTab) return undefined;
                    return <div key={content.props.label}>{content}</div>;
                })}
            </div>
        </div>
    );
};
