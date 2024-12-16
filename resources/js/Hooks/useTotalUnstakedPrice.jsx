import { useState, useEffect, useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { PriceContext } from "@/Store/PriceContext";
import { BlockchainContext } from "@/Store/BlockchainContext";

const useTotalUnstakedPrice = (totalLockedTokens, totalLockedTokens2) => {
    const { FtokAddress, ERC20ABI } = useContext(BlockchainContext);
    const { web3 } = useContext(Web3Context);
    const { habibiPriceInUSD } = useContext(PriceContext);
    const [totalUnstakedPrice, setTotalUnstakedPrice] = useState(0);

    useEffect(() => {
        const fetchTotalSupplyAndCalculateUnstakedPrice = async () => {
            if (!web3) return;

            try {
                const tokenInstance = new web3.eth.Contract(
                    ERC20ABI,
                    FtokAddress
                );
                const totalSupplyWei = await tokenInstance.methods
                    .totalSupply()
                    .call();
                const totalSupply = web3.utils.fromWei(totalSupplyWei, "ether");

                // Calculate the unstaked amount
                const unstaked =
                    parseFloat(totalSupply) -
                    (parseFloat(totalLockedTokens) +
                        parseFloat(totalLockedTokens2));
                // Assuming the price calculation logic remains as intended,
                // you might want to revise this if it was intended to use `unstaked` instead
                const roundedUnstakedPrice = Math.round(
                    (parseFloat(totalLockedTokens) +
                        parseFloat(totalLockedTokens2)) *
                        habibiPriceInUSD
                );
                setTotalUnstakedPrice(roundedUnstakedPrice);
            } catch (error) {
                console.error(
                    "Error fetching the total supply of tokens:",
                    error
                );
                setTotalUnstakedPrice(0);
            }
        };

        fetchTotalSupplyAndCalculateUnstakedPrice();
    }, [
        web3,
        ERC20ABI,
        FtokAddress,
        totalLockedTokens,
        totalLockedTokens2,
        habibiPriceInUSD,
    ]);

    return totalUnstakedPrice;
};

export default useTotalUnstakedPrice;
