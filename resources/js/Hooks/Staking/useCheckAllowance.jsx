import { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

const useCheckAllowance = ({ amount }) => {
    const [approved, setIsApproved] = useState(false);
    const { stakeABI, StakeAddress, FtokAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const checkAllowance = async () => {
        if (!web3 || !account || !amount) {
            setIsApproved(false);
            return;
        }

        const tokenInstance = new web3.eth.Contract(ERC20ABI, FtokAddress);
        try {
            const allowance = await tokenInstance.methods
                .allowance(account, StakeAddress)
                .call();
            const amountInWei = web3.utils.toWei(amount || "0", "ether");

            const isSufficientAllowance = allowance >= amountInWei;
            setIsApproved(isSufficientAllowance);
        } catch (error) {
            console.error("Error in check Allowance:", error);
            setIsApproved(false);
        }
    };

    useEffect(() => {
        if (account && web3) {
            checkAllowance();
        }
    }, [account, web3]);

    return { approved, checkAllowance };
};

export default useCheckAllowance;
