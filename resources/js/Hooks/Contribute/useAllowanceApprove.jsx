import { useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import useGetUsdtData from "../useGetUsdtData";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function useAllowanceApprove(
    pool_id,
    userAlloc,
    setUsdtAllowance,
    getUsdtAllowance,
    amount
) {
    const { LaunchPadAddress, FusdtAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const approveLaunchpadContract = async () => {
        try {
            let tokenInstance = new web3.eth.Contract(ERC20ABI, FusdtAddress);
            let encoded = tokenInstance.methods
                .approve(LaunchPadAddress, web3.utils.toWei(amount, "ether"))
                .encodeABI();

            const gasPrice = web3.utils.toWei("4", "gwei");

            let tx = {
                from: account,
                to: FusdtAddress,
                data: encoded,
                gasPrice: gasPrice,
                gas: 300000, // The hardcoded gas limit should be estimated if possible
            };

            return web3.eth
                .sendTransaction(tx)
                .on("transactionHash", function (hash) {
                    console.log("Transaction Hash:", hash);
                })
                .on("confirmation", function (confirmationNumber, receipt) {
                    // console.log("Confirmation Number:", confirmationNumber);
                    // Instead of location.reload(), update state or props here
                    // ...
                    if (confirmationNumber === 12) {
                        console.log("Transaction confirmed", receipt);
                    }
                })
                .on("receipt", function (receipt) {
                    console.log("Receipt:", receipt);
                    router.reload();
                })
                .on("error", console.error);
        } catch (err) {
            console.error("Error in approveLaunchpadContract:", err);
            throw err; // Re-throw the error so you can catch it in handleApprove
        }
    };

    const handleApprove = async () => {
        try {
            await approveLaunchpadContract();
            const newAllowance = await getUsdtAllowance(account);
            setUsdtAllowance(parseFloat(newAllowance).toFixed(0));
        } catch (error) {
            console.error("Error in handleApprove:", error);
            alert("Approval failed. Please try again or check your wallet.");
        }
    };

    return handleApprove;
}
