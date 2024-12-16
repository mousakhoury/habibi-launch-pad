import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "../UI/Button";
import { Web3Context } from "@/Store/Web3Context";
import DisconnectButton from "./DisconnectButton";
import useStakedAmount from "@/Hooks/useStakedAmount";
import useGetTier from "@/Hooks/useGetTier";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function ConnectionButton() {
    const { account, balance, connectMetamask, disconnectMetamask } =
        useContext(Web3Context);

    const [showDisconnect, setShowDisconnect] = useState(false);

    const stakedAmount = useStakedAmount();
    const tier = useGetTier();

    const formatAccount = (account) => {
        return `${account.substring(0, 3)}....${account.substring(
            account.length - 3
        )}`;
    };

    const showDisconnectHandler = () => {
        setShowDisconnect(true);
    };

    const disconnectHandler = () => {
        disconnectMetamask();
        setShowDisconnect(false);
        window.location.reload();
    };

    // Inside ConnectionButton.js component

    const connectWallet = () => {
        connectMetamask();
    };

    useEffect(() => {
        if (account) {
            postDataToBackend(account, stakedAmount);
        }
    }, [account, stakedAmount]);

    const postDataToBackend = async (account, stakedAmount) => {
        try {
            // Check if the account already exists in the database
            const checkResponse = await axios.get(`/api/accounts/${account}`);

            // If the account does not exist, proceed to POST the new account data
            if (!checkResponse.data.exists) {
                const postResponse = await axios.post("/api/accounts", {
                    address: account,
                    staked_amount: stakedAmount,
                });
                console.log(postResponse.data.message);
                // Handle successful response
            }
        } catch (error) {
            if (error.response) {
                // Handle errors returned from the backend
                if (error.response.status === 422) {
                    // Validation error
                    const errors = error.response.data.errors;
                    console.error("Validation errors:", errors);
                } else if (error.response.status === 404) {
                    // Account does not exist, which means it is safe to create a new one
                    // You can call the POST method here if needed
                } else {
                    // Other types of response errors
                    console.error("Error response:", error.response);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Error request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
            }
        }
    };

    return (
        <>
            {account ? (
                <div className="flex items-center p-[4px] gap-[10px] rounded-[6px] border border-solid border-[#252525] bg-[#1B1B1B] w-full max-w-[282px]">
                    <div className="w-full flex items-start justify-between">
                        <div className="flex items-center gap-[10px]">
                            <img src="/images/wallet/user.svg" alt="" />
                            <p className="text-[#ccc] text-[16px] font-normal leading-[-0.075px] ">
                                {formatAccount(account)}
                            </p>
                        </div>
                        <div className="flex items-start gap-[6px] px-[12px] py-[10px] leading-[20px] rounded-[4px] bg-[#252525] ">
                            <p className="text-[#FCFCFC] text-[16px] font-medium">
                                BNB:
                            </p>
                            <p className="text-[#E4E4E4] text-[16px] font-normal">
                                {parseFloat(balance).toFixed(3)}
                            </p>
                        </div>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={showDisconnectHandler}
                    >
                        <img src="/images/wallet/disconnect.svg" alt="" />
                    </div>
                </div>
            ) : (
                <Button onClick={connectWallet} type="connect" />
            )}

            {showDisconnect && (
                <DisconnectButton
                    disconnect={disconnectHandler}
                    setShowDisconnect={setShowDisconnect}
                />
            )}
        </>
    );
}
