import { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

const useStakedAmount = () => {
    const [userStakedAmount, setUserStakedAmount] = useState("0");
    const { stakeABI, StakeAddress } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    useEffect(() => {
        const fetchStakedAmount = async () => {
            if (!account && !web3) {
                setUserStakedAmount("0");
            }

            if (account && web3 && StakeAddress && stakeABI) {
                const stakingInstance = new web3.eth.Contract(
                    stakeABI,
                    StakeAddress
                );
                try {
                    const stakedAmount = await stakingInstance.methods
                        .getUserStakedAmount(account)
                        .call();
                    const stakedAmountInEther = web3.utils.fromWei(
                        stakedAmount,
                        "ether"
                    );
                    const formattedStakedAmount = parseFloat(
                        stakedAmountInEther
                    )
                        .toFixed(0)
                        .replace(/\.00$|(\.[0-9]*[1-9])0+$/, "$1");
                    setUserStakedAmount(formattedStakedAmount);
                } catch (error) {
                    console.error(
                        "Error fetching the user's staked amount:",
                        error
                    );
                }
            }
        };

        fetchStakedAmount();
    }, [account, web3, StakeAddress, stakeABI]);

    return userStakedAmount;
};

export default useStakedAmount;
