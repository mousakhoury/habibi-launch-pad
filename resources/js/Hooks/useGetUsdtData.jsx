import { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

const useGetUsdtData = (pool_id) => {
    const [usdtAllowance, setUsdtAllowance] = useState("0");
    const [usdtBalance, setUsdtBalance] = useState("0");
    const [userAlloc, setUserAlloc] = useState("0");

    const { stakeABI, launchPadABI, LaunchPadAddress, ERC20ABI, FusdtAddress } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const getUsdtBalance = async (userAddress) => {
        try {
            let tokenInstance = new web3.eth.Contract(ERC20ABI, FusdtAddress);
            let balance = await tokenInstance.methods
                .balanceOf(userAddress)
                .call();
            let balanceEther = web3.utils.fromWei(balance, "ether");
            return balanceEther;
        } catch (err) {
            console.error("Failed to get USDT balance:", err);
            return 0;
        }
    };

    const getUsdtAllowance = async (userAddress) => {
        try {
            let tokenInstance = new web3.eth.Contract(ERC20ABI, FusdtAddress);
            let allowance = await tokenInstance.methods
                .allowance(userAddress, LaunchPadAddress)
                .call();
            let allowanceEther = web3.utils.fromWei(allowance, "ether");
            return allowanceEther;
        } catch (err) {
            console.error(err);
            return 0;
        }
    };

    const getUserAllocForPool = async (userAddress, poolId) => {
        if (
            !web3 ||
            !LaunchPadAddress ||
            !launchPadABI ||
            !userAddress ||
            !poolId
        ) {
            console.error("getUserAllocForPool: Missing required parameters.");
            return "0"; // Return a default value to avoid breaking the conversion function
        }
        try {
            let launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );
            let alloc = await launchpadInstance.methods
                .getUserAllocForPool(userAddress, poolId)
                .call();
            let allocEther = web3.utils.fromWei(alloc, "ether");
            return allocEther;
        } catch (err) {
            console.error("Error in fetching user allocation:", err);
            return "0"; // Return a default value to avoid breaking the conversion function
        }
    };

    const refreshAllocationAndBalance = async () => {
        try {
            const newAllocRaw = await getUserAllocForPool(account, pool_id);
            const newBalanceRaw = await getUsdtBalance(account);

            // Check if the values are not undefined before trying to convert them
            const newAlloc =
                newAllocRaw !== undefined
                    ? parseFloat(newAllocRaw).toFixed(0)
                    : "0";
            const newBalance =
                newBalanceRaw !== undefined
                    ? parseFloat(newBalanceRaw).toFixed(0)
                    : "0";

            // Update state with the new values
            setUserAlloc(newAlloc);
            setUsdtBalance(newBalance);
        } catch (error) {
            console.error("Failed to refresh allocation and balance:", error);
        }
    };

    useEffect(() => {
        if (usdtAllowance > 0) {
            refreshAllocationAndBalance();
        }
    }, [usdtAllowance]);

    useEffect(() => {
        if (account && web3) {
            getUsdtBalance(account).then((balanceEther) =>
                setUsdtBalance(parseFloat(balanceEther).toFixed(0))
            );
            getUsdtAllowance(account).then((allowanceEther) =>
                setUsdtAllowance(parseFloat(allowanceEther))
            );

            getUserAllocForPool(account, pool_id).then((allocEther) =>
                setUserAlloc(parseFloat(allocEther))
            );
        }
    }, [account, web3]);

    return {
        usdtAllowance,
        usdtBalance,
        userAlloc,
        setUsdtAllowance,
        getUsdtAllowance,
    };
};

export default useGetUsdtData;
