import { useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import useGetUsdtData from "../useGetUsdtData";
import { Inertia } from "@inertiajs/inertia";

export default function useInvest(poolId, investmentAmount, setShowSuccess) {
    const { LaunchPadAddress, launchPadABI, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const { usdtAllowance } = useGetUsdtData(poolId);

    const investInProject = async (poolId, amount) => {
        try {
            const launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );

            // Dynamically fetch the current gas price
            const currentGasPrice = await web3.eth.getGasPrice();
            // Convert the current gas price to a BigInt
            const currentGasPriceBigInt = BigInt(currentGasPrice);
            // Calculate the increased gas price by adding 20%
            const increasedGasPriceBigInt =
                (currentGasPriceBigInt * BigInt(103)) / BigInt(100);
            // Convert the increased gas price to a hex string for the transaction
            const increasedGasPriceHex =
                "0x" + increasedGasPriceBigInt.toString(16);

            // Send the transaction using the web3.eth.Contract methods
            launchpadInstance.methods
                .investInPool(poolId, amount)
                .send({
                    from: account,
                    gasPrice: increasedGasPriceHex,
                    // gas: 300000,
                })
                .on("transactionHash", (hash) => {
                    // Handle the transaction hash event
                    console.log("Transaction Hash:", hash);
                })
                .once("confirmation", (confirmationNumber, receipt) => {
                    // Handle the transaction confirmation event
                    console.log("Confirmation Number:", confirmationNumber);
                    console.log("here");
                    setShowSuccess(true);
                    setTimeout(() => {
                        Inertia.reload();
                    }, 2000);
                })
                .on("receipt", (receipt) => {
                    // Handle the transaction receipt event
                    console.log("Receipt:", receipt);
                })
                .on("error", (error) => {
                    // Handle the error event
                    console.error("Investment Error:", error);
                    alert(
                        "Investment failed. Please try again or check your wallet."
                    );
                });
        } catch (err) {
            // Catch any errors not caught by the event emitter
            console.error("Error in investInProject:", err);
        }
    };

    const handleInvestmentSubmit = async (e) => {
        e.preventDefault();
        if (!investmentAmount || !web3 || !account) return;

        // Check for allowance before making the investment
        if (usdtAllowance < parseFloat(investmentAmount)) {
            alert(
                "Not enough allowance for the transaction. Please approve more tokens."
            );
            return;
        }

        const amount = web3.utils.toWei(investmentAmount.toString(), "ether");

        // No need to wait for the promise here since we handle everything with event emitters
        investInProject(poolId, amount);
    };

    return handleInvestmentSubmit;
}
