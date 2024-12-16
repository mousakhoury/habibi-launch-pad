import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

// Define your contract details and ABI
const pancakeSwapAbi = [
    {
        inputs: [
            { internalType: "uint256", name: "amountIn", type: "uint256" },
            { internalType: "address[]", name: "path", type: "address[]" },
        ],
        name: "getAmountsOut",
        outputs: [
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const tokenAbi = [
    {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];
const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // BNB
const HabibiTokenAddress = "0x61221f03E788F1BB8669e9C60549555b5a38d765"; // Habibi
const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"; //USDT
let pancakeSwapContract =
    "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();

export const PriceContext = createContext({});

export const PriceProvider = ({ children }) => {
    const web3 = new Web3("https://bsc-dataseed.binance.org/"); // BSC Mainnet RPC URL
    const [habibiPriceInUSD, setHabibiPriceInUSD] = useState(0);

    async function calcHabibiPriceInBNB() {
        try {
            let router = new web3.eth.Contract(
                pancakeSwapAbi,
                pancakeSwapContract
            );
            let amountsOut = await router.methods
                .getAmountsOut(web3.utils.toWei("1", "ether"), [
                    BNBTokenAddress,
                    HabibiTokenAddress,
                ])
                .call();
            return amountsOut[1]; // This returns the amount of Habibi you get for 1 BNB
        } catch (error) {
            console.error("calcHabibiPrice error:", error);
            return "0";
        }
    }

    // Function to calculate the price of BNB in terms of USDT
    async function calcBNBPriceInUSD() {
        try {
            let router = new web3.eth.Contract(
                pancakeSwapAbi,
                pancakeSwapContract
            );
            let amountsOut = await router.methods
                .getAmountsOut(web3.utils.toWei("1", "ether"), [
                    BNBTokenAddress,
                    USDTokenAddress,
                ])
                .call();
            return amountsOut[1]; // This returns the amount of USDT you get for 1 BNB
        } catch (error) {
            console.error("calcBNBPrice error:", error);
            return "0";
        }
    }

    // Function to calculate the price of 1 Habibi in terms of USDT
    async function fetchHabibiPriceInUSD() {
        try {
            const habibiAmountInWei = await calcHabibiPriceInBNB(); // Amount of Habibi per 1 BNB in Wei
            const bnbPriceUSDInWei = await calcBNBPriceInUSD(); // Price of 1 BNB in USDT in Wei

            if (!habibiAmountInWei || !bnbPriceUSDInWei) {
                throw new Error(
                    "One of the contract calls returned an undefined or null value"
                );
            }

            // Convert Wei to the numerical values
            const habibiAmount = web3.utils.fromWei(habibiAmountInWei, "ether");
            const bnbPriceUSD = web3.utils.fromWei(bnbPriceUSDInWei, "ether");

            const habibiPriceUSD = Number(bnbPriceUSD) / Number(habibiAmount);
            setHabibiPriceInUSD(habibiPriceUSD.toFixed(8));
        } catch (error) {
            console.error("fetchHabibiPriceInUSD error:", error);
            setHabibiPriceInUSD(0); // Set some default state or handle the error as appropriate
        }
    }

    useEffect(() => {
        fetchHabibiPriceInUSD();
    }, []); // Empty array ensures this effect runs only once
    return (
        <PriceContext.Provider
            value={{ habibiPriceInUSD, refreshPrice: fetchHabibiPriceInUSD }}
        >
            {children}
        </PriceContext.Provider>
    );
};
