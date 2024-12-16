import { useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import useStakedAmount from "../useStakedAmount";

const useStakingUnstaking = ({
    amount,
    stakeOrUnstake,
    isApproved,
    setIsLoading,
    checkAllowance,
    setShowSuccess,
}) => {
    const { StakeAddress, stakeABI, FtokAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const currentAmount = useStakedAmount();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Convert the amount to wei as a string for the transaction
        const amountToProcess = web3.utils.toWei(amount || "0", "ether");
        let transactionHash = "";

        try {
            if (stakeOrUnstake === "stake") {
                // Check for web3, account, and amount
                if (!web3 || !account || !amount) {
                    throw new Error(
                        "Web3, account, or amount not set for staking."
                    );
                }

                // Check for approval before staking
                await checkAllowance();
                if (!isApproved) {
                    throw new Error("Insufficient allowance for staking.");
                }

                // Interact with the smart contract for staking
                const stakingInstance = new web3.eth.Contract(
                    stakeABI,
                    StakeAddress
                );

                // Set gas price to 4 Gwei in Wei
                const gasPrice = web3.utils.toWei("4", "gwei");
                const options = { gasPrice: gasPrice };

                const receipt = await stakingInstance.methods
                    .stake(amountToProcess)
                    .send({ from: account, gasPrice: gasPrice, gas: 300000 });

                transactionHash = receipt.transactionHash;
                // Here you can add logic to update state after successful staking if needed
            } else if (stakeOrUnstake === "unstake") {
                // Check for web3, account, and amount
                if (!web3 || !account || !amount) {
                    console.error(
                        "Web3, account, or amount not set for unstaking."
                    );
                }

                // Interact with the smart contract for unstaking
                const stakingInstance = new web3.eth.Contract(
                    stakeABI,
                    StakeAddress
                );

                // Set gas price to 4 Gwei in Wei
                const gasPrice = web3.utils.toWei("4", "gwei");
                const options = { gasPrice: gasPrice };

                const receipt = await stakingInstance.methods
                    .unStake(amountToProcess)
                    .send({
                        from: account,
                        gasPrice: gasPrice,
                        gas: 300000,
                    });

                transactionHash = receipt.transactionHash;
                // Here you can add logic to update state after successful unstaking if needed
            } else {
                throw new Error("Invalid action.");
            }
        } catch (error) {
            console.error(`${stakeOrUnstake} error:`, error);
            setIsLoading(false);
            return;
        }

        // Send transaction data to the backend
        if (transactionHash) {
            try {
                // Get CSRF token from the meta tag
                const csrfToken = document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content");

                // POST request to the server with the transaction data
                const response = await fetch("/user-stakes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({
                        address: account,
                        status: stakeOrUnstake,
                        amount: amount, // Assuming 'amount' is already in the correct format
                        transaction_hash: transactionHash,
                    }),
                });

                const data = await response.json();
                if (data.success) {
                    // Handle success - you might want to update state or redirect
                    console.log("Data saved successfully:", data);

                    const updatedStakedAmount =
                        stakeOrUnstake === "stake"
                            ? (
                                  parseFloat(currentAmount) + parseFloat(amount)
                              ).toString()
                            : (
                                  parseFloat(currentAmount) - parseFloat(amount)
                              ).toString();

                    // Send the updated staked_amount to the backend
                    await updateStakedAmountInBackend(
                        account,
                        updatedStakedAmount
                    );
                    setShowSuccess(true);

                    if (
                        parseFloat(currentAmount) + parseFloat(amount) ===
                        5000000000
                    ) {
                        setTimeout(() => {
                            location.reload();
                        }, 10);
                    } else {
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    }
                } else {
                    // Handle any errors returned from the server
                    console.error("Error saving data:", data);
                }
            } catch (error) {
                // Handle any network errors
                console.error("Network error:", error);
            }
        } else {
            // Handle case where transaction hash is not available
            console.error("Transaction hash is not available.");
        }

        setIsLoading(false); // Reset loading state
    };

    return submitHandler;
};

const updateStakedAmountInBackend = async (
    accountAddress,
    updatedStakedAmount
) => {
    // Get CSRF token from the meta tag
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // POST request to the server with the updated staked_amount
    const response = await fetch("/api/update-staked-amount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
            address: accountAddress,
            staked_amount: updatedStakedAmount,
        }),
    });

    const data = await response.json();
    if (data.success) {
        console.log("Staked amount updated successfully:", data);
    } else {
        console.error("Error updating staked amount:", data);
    }
};

export default useStakingUnstaking;
