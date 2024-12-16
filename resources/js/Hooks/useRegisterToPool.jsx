import { useContext, useCallback } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

export default function useRegisterToPool(poolId, setIsRegistered) {
    const { launchPadABI, LaunchPadAddress } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const registerToPoolHandler = async () => {
        const registerToPool = async (poolId) => {
            try {
                const launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                const encoded = launchpadInstance.methods
                    .registerToPool(poolId)
                    .encodeABI();

                const gasPrice = web3.utils.toWei("4", "gwei");

                // Send the transaction using the web3.eth.Contract methods
                launchpadInstance.methods
                    .registerToPool(poolId)
                    .send({ from: account, gasPrice: gasPrice })
                    .on("transactionHash", (hash) => {
                        // Handle the transaction hash event
                        console.log("Transaction Hash:", hash);
                    })
                    .once("confirmation", (confirmationNumber, receipt) => {
                        // Handle the transaction confirmation event
                        console.log("Confirmation Number:", confirmationNumber);
                        setIsRegistered(true);
                    })
                    .on("error", (error) => {
                        // Handle the error event
                        console.error("Registration Error:", error);
                    });
            } catch (err) {
                // Catch any errors not caught by the event emitter
                console.error("Error in registerToPool:", err);
            }
        };

        await registerToPool(poolId);
    };

    return registerToPoolHandler;
}
