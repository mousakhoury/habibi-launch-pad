import { useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

const useStakingApprove = ({ setIsLoading, setIsApproved, amount }) => {
    const { StakeAddress, FtokAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const handleApprove = async () => {
        setIsLoading(true);
        const tokenInstance = new web3.eth.Contract(ERC20ABI, FtokAddress);

        try {
            const gasPrice = web3.utils.toWei("4", "gwei");
            await tokenInstance.methods
                .approve(StakeAddress, web3.utils.toWei(amount, "ether"))
                .send({ from: account, gasPrice: gasPrice })
                .on("transactionHash", (hash) => {
                    console.log("Transaction Hash:", hash);
                })
                .once("confirmation", (confirmationNumber, receipt) => {
                    console.log("Confirmation Number:", confirmationNumber);
                    setIsApproved(true);
                })
                .on("error", (error) => {
                    console.error("Approval Error:", error);
                });
        } catch (error) {
            console.error("Approval error:", error);
        }
        setIsLoading(false);
    };

    return handleApprove;
};

export default useStakingApprove;
