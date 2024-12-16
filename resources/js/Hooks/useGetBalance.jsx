import { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

const useGetBalance = () => {
    const [userBalance, setUserBalance] = useState("");
    const { stakeABI, StakeAddress, FMTAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    useEffect(() => {
        const checkBalance = async () => {
            const tokenInstance = new web3.eth.Contract(ERC20ABI, FMTAddress);
            const balance = await tokenInstance.methods
                .balanceOf(account)
                .call();
            const balanceInEther = web3.utils.fromWei(balance, "ether");
            const formattedBalance = parseFloat(balanceInEther)
                .toFixed(0)
                .replace(/\.00$|(\.[0-9]*[1-9])0+$/, "$1");
            setUserBalance(formattedBalance);
        };

        if (account && web3) {
            checkBalance();
        }
    }, [account, web3, StakeAddress, stakeABI, FMTAddress, ERC20ABI]);

    return userBalance;
};

export default useGetBalance;
