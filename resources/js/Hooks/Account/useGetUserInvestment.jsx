import React, { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import Web3 from "web3";

export default function useGetUserInvestment({ projects }) {
    const {
        LaunchPadAddress,
        launchPadABI,
        launchPadV1ABI,
        LaunchPadV1,
        mainnetRpc,
    } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);
    const [investments, setInvestments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (account && projects && projects.length > 0) {
            setIsLoading(true);
            const fetchInvestments = async () => {
                try {
                    let web3Instance = new Web3(mainnetRpc);
                    let launchpad = new web3Instance.eth.Contract(
                        launchPadABI,
                        LaunchPadAddress
                    );
                    const investmentPromises = projects.map(async (project) => {
                        if (project.pool_id) {
                            try {
                                let userInvest = await launchpad.methods
                                    .getUserInvestForPool(
                                        account,
                                        project.pool_id
                                    )
                                    .call();

                                // Only proceed if userInvest is defined
                                if (userInvest) {
                                    const investAmount = userInvest.amount
                                        ? userInvest.amount.toString()
                                        : "0";
                                    return {
                                        ...project,
                                        invest: web3Instance.utils.fromWei(
                                            userInvest,
                                            "ether"
                                        ),
                                    };
                                } else {
                                    // Handle the case where userInvest is undefined
                                    console.error(
                                        `No investment data returned for pool ID ${project.pool_id}`
                                    );
                                    return {
                                        ...project,
                                        invest: "N/A",
                                    };
                                }
                            } catch (err) {
                                console.error(
                                    "Error fetching investor data:",
                                    err
                                );
                                return {
                                    ...project,
                                    error: err.toString(),
                                };
                            }
                        } else {
                            return { ...project, invest: "N/A" };
                        }
                    });

                    const results = await Promise.all(investmentPromises);
                    setInvestments(results);
                } catch (err) {
                    console.error("Error fetching investor data:", err);
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchInvestments();
        }
    }, [account, projects]);

    const filteredInvestments = [];

    investments.forEach((investment) => {
        if (investment.invest !== "N/A") {
            filteredInvestments.push(investment);
        }
    });

    return { filteredInvestments, isLoading, error };
}
