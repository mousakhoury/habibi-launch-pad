import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(
        localStorage.getItem("account") || ""
    );
    const [balance, setBalance] = useState("0");
    const chainIdRequired = 97; // For Binance Smart Chain Mainnet

    useEffect(() => {
        async function loadWeb3AndAccount() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const savedAccount = localStorage.getItem("account");
                if (savedAccount) {
                    try {
                        // Check if the saved account is still authorized
                        const accounts = await web3Instance.eth.getAccounts();
                        if (accounts.includes(savedAccount)) {
                            // Check if the correct network chainId is connected
                            const currentChainId =
                                await web3Instance.eth.getChainId();
                            if (Number(currentChainId) === chainIdRequired) {
                                setAccount(savedAccount);
                                await updateBalance(web3Instance, savedAccount);
                            } else {
                                console.error("Incorrect chain ID.");
                                localStorage.removeItem("account"); // Clear account if chain ID is not correct
                            }
                        } else {
                            console.error(
                                "Saved account not found among authorized accounts."
                            );
                            localStorage.removeItem("account"); // Clear account if it's not authorized
                        }
                    } catch (error) {
                        console.error("Error loading saved account:", error);
                        localStorage.removeItem("account"); // Clear account on error
                    }
                }
            } else {
                alert("Please install MetaMask!");
            }
        }

        loadWeb3AndAccount();
    }, []);

    // Inside your Web3Context provider

    const connectMetamask = async () => {
        if (web3 && window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const accounts = await web3.eth.getAccounts();
                if (Number(await web3.eth.getChainId()) !== chainIdRequired) {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [
                            { chainId: `0x${chainIdRequired.toString(16)}` },
                        ],
                    });
                }

                setAccount(accounts[0]); // This should update the React state
                localStorage.setItem("account", accounts[0]);
                await updateBalance(web3, accounts[0]);

                // After successful connection and account update, call the onSuccess callback
                // if (typeof onSuccess === "function") {
                //     onSuccess(accounts[0]);
                // }
            } catch (err) {
                console.error(err);
                // Handle any errors that occur during the connection process
            }
        } else {
            alert("MetaMask is not installed!");
        }
    };

    const updateBalance = async (web3Instance, account) => {
        const balanceWei = await web3Instance.eth.getBalance(account);
        const balanceBNB = web3Instance.utils.fromWei(balanceWei, "ether");
        setBalance(balanceBNB);
    };

    const getWeb3 = async () => {
        if (window.ethereum) {
            let provider = new Web3.providers.HttpProvider(window.ethereum);
            return new Web3(provider);
        } else {
            // there is no metamask on browser, nothing can be do
            return null;
        }
    };

    const disconnectMetamask = () => {
        setAccount("");
        localStorage.removeItem("account");
    };

    return (
        <Web3Context.Provider
            value={{
                web3,
                account,
                setAccount,
                balance,
                connectMetamask,
                disconnectMetamask,
                getWeb3,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};
