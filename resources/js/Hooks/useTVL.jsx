import { useState, useEffect, useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";

const useTVL = (StakeAddress) => {
    const { FtokAddress, ERC20ABI } = useContext(BlockchainContext);
    const { web3 } = useContext(Web3Context);
    const [totalLockedTokens, setTotalLockedTokens] = useState(0);

    const getTVL = async () => {
        // if (!web3 || !StakeAddress) {
        //     console.error(
        //         "Web3 instance or staking contract address not available."
        //     );
        //     return;
        // }

        try {
            const tokenInstance = new web3.eth.Contract(ERC20ABI, FtokAddress);
            const totalLockedBalanceWei = await tokenInstance.methods
                .balanceOf(StakeAddress)
                .call();

            // Convert the balance from Wei to Ether
            const totalLockedBalance = web3.utils.fromWei(
                totalLockedBalanceWei,
                "ether"
            );
            const roundedTotalLockedTokens = Math.round(
                parseFloat(totalLockedBalance)
            );
            setTotalLockedTokens(roundedTotalLockedTokens); // Update the state with the rounded total locked tokens
        } catch (err) {
            // console.error("Error getting the total locked tokens:", err);
            setTotalLockedTokens(0); // Reset the state on error
        }
    };

    useEffect(() => {
        if (StakeAddress) {
            getTVL();
        }
    }, [StakeAddress, web3]); // Re-run when StakeAddress or web3 changes

    return totalLockedTokens;
};

export default useTVL;
