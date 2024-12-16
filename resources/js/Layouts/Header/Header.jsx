import React, { useState, useEffect, useContext } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { Web3Context } from "@/Store/Web3Context";
import Congratulations from "@/Components/Staking/Congratulations";

export default function Header({ accounts }) {
    const { web3, account } = useContext(Web3Context);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [accountData, setAccountData] = useState([]);
    const [showCongratulations, setShowCongratulations] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (account && accounts) {
            const matchedAccount = accounts.find(
                (acc) => acc.address === account
            );
            setAccountData(matchedAccount);
            if (accountData) {
                setShowCongratulations(
                    accountData.isSpecial == "1" && accountData.isSpotted == "0"
                );
            }
        }
    }, [account, accounts, accountData]);

    const closeCongrats = () => {
        setShowCongratulations(false);
    };

    return (
        <header className="w-full ">
            {isDesktop ? <DesktopHeader /> : <MobileHeader />}
            {showCongratulations && (
                <Congratulations
                    accountData={accountData}
                    setAccountData={setAccountData}
                    closeCongrats={closeCongrats}
                />
            )}
        </header>
    );
}
