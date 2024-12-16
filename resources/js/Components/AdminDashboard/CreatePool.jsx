import React, { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import { ethers } from "ethers";
import Web3 from "web3";

import styles from "./CreatePool.module.css";

export default function CreatePool({ project }) {
    const {
        LaunchPadAddress,
        launchPadABI,
        StakeV1,
        StakeAddress,
        stakeV1ABI,
        stakeABI,
        LaunchPadV1,
        launchPadV1ABI,
    } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);

    const [poolDate, setPoolData] = useState([]);

    const [snapShot, setSnapShot] = useState(0n);
    const [isFinished, setIsFinished] = useState(0n);
    const [isWithdrawn, setIsWithdrawn] = useState(false);
    const [whiteList, setWhiteList] = useState([]);
    const [tier1Alloc, setTier1Alloc] = useState();
    const [tier2Alloc, setTier2Alloc] = useState();
    const [tier3Alloc, setTier3Alloc] = useState();
    const [tier4Alloc, setTier4Alloc] = useState();
    const [tier5Alloc, setTier5Alloc] = useState();
    const [tier6Alloc, setTier6Alloc] = useState();
    const [tier7Alloc, setTier7Alloc] = useState();

    const startingDate = new Date(project.starting_date);
    const firstRoundDeadline = new Date(project.first_round_deadline);
    const FcfsStartingDate = new Date(project.fcfs_starting_date);
    const FcfsDeadlineDate = new Date(project.fcfs_deadline_date);
    const Fcfs2StartingDate = new Date(project.fcfs2_starting_date);

    // Calculate the difference in milliseconds and convert to seconds
    const round1Duration = (firstRoundDeadline - startingDate) / 1000;
    const pauseDuration = (FcfsStartingDate - firstRoundDeadline) / 1000;

    const Fcfs1Duration = (FcfsDeadlineDate - FcfsStartingDate) / 1000;

    const setTier1Handler = (e) => {
        setTier1Alloc(e.target.value);
    };
    const setTier2Handler = (e) => {
        setTier2Alloc(e.target.value);
    };
    const setTier3Handler = (e) => {
        setTier3Alloc(e.target.value);
    };
    const setTier4Handler = (e) => {
        setTier4Alloc(e.target.value);
    };
    const setTier5Handler = (e) => {
        setTier5Alloc(e.target.value);
    };
    const setTier6Handler = (e) => {
        setTier6Alloc(e.target.value);
    };

    const setTier7Handler = (e) => {
        setTier7Alloc(e.target.value);
        console.log(allTiersAllocs);
    };

    const allTiersAllocs = [
        "0",
        tier1Alloc,
        tier2Alloc,
        tier3Alloc,
        tier4Alloc,
        tier5Alloc,
        tier6Alloc,
        tier7Alloc,
    ];

    useEffect(() => {
        if (project.white_list) {
            const usersArray = project.white_list;
            setWhiteList(usersArray.map((item) => item.address));
        }
    }, [project.white_list, setWhiteList]);

    const createPool = async (
        poolName,
        amountTarget,
        fcfs1MaxAmount,
        fcfs2MaxAmount,
        startingDate
    ) => {
        try {
            // Infura WebSocket endpoint
            const infuraWs =
                "wss://go.getblock.io/ef5150863364439fbde08018478cfd7e"; // Replace with your actual project ID
            // Creating a new provider using ethers with the Infura WebSocket
            const infuraProvider = new ethers.WebSocketProvider(infuraWs);

            let launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            ); // Using Web3 with the user's provider, for sending transactions.

            let encoded = launchpadInstance.methods
                .createPool(
                    poolName,
                    amountTarget,
                    fcfs1MaxAmount,
                    fcfs2MaxAmount,
                    startingDate
                )
                .encodeABI();

            let tx = {
                from: account, // the user address we get from connect() and stored locally
                to: LaunchPadAddress,
                data: encoded,
            };

            // Send the transaction using the user's provider, not Infura.
            let txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [tx],
            });

            // Here you will find Public rpc  for bsc:
            // https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes

            const testnetRpc =
                "https://data-seed-prebsc-2-s1.binance.org:8545/";
            const mainnetRpc = "https://bsc-dataseed1.binance.org/";

            const provider = new ethers.JsonRpcProvider(testnetRpc);

            // Listen for the PoolCreated event using the Infura provider
            const LaunchpadEthersInstance = new ethers.Contract(
                LaunchPadAddress,
                launchPadABI,
                provider
            );
            // Now you can use LaunchpadEthersInstance to listen to events
            LaunchpadEthersInstance.on(
                "PoolCreated",
                (poolName, poolId, amountTarget, startingDate, event) => {
                    event.removeListener();
                    let pool_id = parseFloat(poolId);
                    updateProjectWithPoolId(project.id, pool_id);
                    return poolId;
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    const createPoolHandler = async () => {
        const poolName = project.name; // Or however you get the name for the pool
        const amountTarget = web3.utils.toWei(
            project.amount_target.toString(),
            "ether"
        );
        const fcfs1MaxAmount = web3.utils.toWei(
            project.fcfs1_amount.toString(),
            "ether"
        );
        const fcfs2MaxAmount = web3.utils.toWei(
            project.fcfs2_amount.toString(),
            "ether"
        );
        const startingDate = Math.floor(
            new Date(project.starting_date).getTime() / 1000
        ); // Convert to Unix timestamp

        await createPool(
            poolName,
            amountTarget,
            fcfs1MaxAmount,
            fcfs2MaxAmount,
            startingDate
        );
    };

    const updateProjectWithPoolId = async (projectId, poolId) => {
        // Convert BigInt to string for serialization
        const poolIdString = poolId.toString();

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        // Implement the logic to update the project with the poolId.
        // This should be an API call to your backend.
        const response = await fetch(`/projects/${projectId}/update-pool-id`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ pool_id: poolIdString }),
        });

        if (!response.ok) {
            throw new Error("Failed to update project with pool ID");
        }

        const updatedProject = await response.json();
        console.log("Project updated successfully:", updatedProject);
        location.reload();
    };

    const getPoolDatas = async (poolId) => {
        try {
            let launchpadContract = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            ); // from config.js file

            // If poolId is not a large number, you can directly pass it as a string
            const poolIdString = poolId.toString();

            let datas = await launchpadContract.methods
                .getPoolDatas(poolId)
                .call();

            return {
                snapShotNb: datas.snapShotNb, // if return 0, it means that the sale can't began => admin must call snapShotPool(poolId)
                amountTarget: datas.amountTarget, // big number 1E18 the amount max the project want to raise inthis pool
                amountRaised: datas.amountRaised, //  big number 1E18 the amount already raised, should display a % amountTarget/amountRaised*100
                startingDate: datas.startingDate, // The timestamp in second the launchpad begin
                isFinished: datas.isFinished, // bool if the pool is closed
                fundWithdrawn: datas.fundWithdrawn, // bool false if found are still in the launchpad contract, true if already Widthdraw
                poolName: datas.poolName, // string name of the pool, should be the project name
            };
        } catch (err) {
            console.error("Error in getPoolDatas:", err);
            return null; // Return null or appropriate error handling
        }
    };

    useEffect(() => {
        // Function to fetch pool data
        const fetchData = async () => {
            if (!web3) {
                console.error("web3 is not available.");
                return;
            }
            if (!project || !project.pool_id) {
                console.error("Project data is not available.");
                return;
            }
            try {
                const data = await getPoolDatas(project.pool_id);

                if (data) {
                    // console.log("Pool Data:", data);
                    const amountTargetEther = web3.utils.fromWei(
                        data.amountTarget,
                        "ether"
                    );
                    const amountRaisedEther = web3.utils.fromWei(
                        data.amountRaised,
                        "ether"
                    );
                    const percentage =
                        (parseFloat(amountRaisedEther) /
                            parseFloat(amountTargetEther)) *
                        100;
                    setPoolData(data);
                    setSnapShot(data.snapShotNb);
                    setIsFinished(data.isFinished);
                    setIsWithdrawn(data.fundWithdrawn);
                } else {
                    console.error("No data returned from getPoolDatas");
                }
            } catch (err) {
                console.error("Error fetching pool data:", err);
            }
        };

        // Call fetchData if web3 and project.pool_id are available
        if (web3 && project && project.pool_id) {
            fetchData();
        }
    }, [web3, project]);

    const closePool = async (poolId) => {
        try {
            let launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );

            // Send the transaction using the web3.eth.Contract methods
            launchpadInstance.methods
                .closePool(poolId)
                .send({ from: account })
                .on("transactionHash", (hash) => {
                    // Handle the transaction hash event
                    console.log("Transaction Hash:", hash);
                })
                .once("confirmation", (confirmationNumber, receipt) => {
                    // Handle the transaction confirmation event
                    console.log("Confirmation Number:", confirmationNumber);
                    location.reload();
                })
                .on("receipt", (receipt) => {
                    // Handle the transaction receipt event
                    console.log("Receipt:", receipt);
                })
                .on("error", (error) => {
                    // Handle the error event
                    console.error("Close Pool Error:", error);
                    alert(
                        "Closing the pool failed. Please try again or check your wallet."
                    );
                });
        } catch (err) {
            // Catch any errors not caught by the event emitter
            console.error("Error in closePool:", err);
        }
    };

    const closePoolHandler = () => {
        closePool(project.pool_id);
    };

    const withdrawPoolFund = async (poolId) => {
        try {
            let launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );

            // Initiating the transaction and setting up event handlers
            launchpadInstance.methods
                .withdrawPoolFund(poolId)
                .send({ from: account })
                .on("transactionHash", (hash) => {
                    // Handle receiving the transaction hash
                    console.log("Transaction Hash:", hash);
                })
                .once("confirmation", (confirmationNumber, receipt) => {
                    // Handle transaction confirmation
                    console.log("Confirmation Number:", confirmationNumber);
                    // Here, implement any state updates or UI changes to reflect the successful withdrawal
                    alert("Withdrawal successful."); // Notify the user
                    location.reload(); // Or update the UI as needed
                })
                .on("receipt", (receipt) => {
                    // Handle the transaction receipt
                    console.log("Receipt:", receipt);
                })
                .on("error", (error) => {
                    // Handle errors during the transaction
                    console.error("Withdrawal Error:", error);
                    alert(
                        "Withdrawal failed. Please try again or check your wallet."
                    ); // Notify the user of the failure
                });
        } catch (err) {
            // Handle any errors not caught by the event handlers
            console.error("Error in withdrawPoolFund:", err);
        }
    };

    const withdrawHandler = () => {
        withdrawPoolFund(project.pool_id);
    };

    let extractInvestors = async () => {
        const endPointTestnet =
            "https://data-seed-prebsc-1-s1.binance.org:8545/";
        const endPointBSC = `https://bsc-dataseed.binance.org/`;
        try {
            let web3 = new Web3(endPointBSC);
            let stakeV1 = new web3.eth.Contract(stakeABI, StakeV1);

            let stakers = [];

            let stakerNb = await stakeV1.methods.getStakerNumber().call();
            console.log("Stakers nb : ", stakerNb);

            for (let i = 0; i < stakerNb; i++) {
                let stakerAddress = await stakeV1.methods
                    .getStakerAtIndex(i)
                    .call();

                if (!stakers.some((user) => user.address === stakerAddress)) {
                    let user = {
                        address: stakerAddress,
                        invest: 0, // This will be updated later from launchPad
                    };
                    // Initially adding all stakers, will filter out later if invest is 0
                    stakers.push(user);
                }
            }

            let stakeV2 = new web3.eth.Contract(stakeABI, StakeAddress);
            stakerNb = await stakeV2.methods.getStakerNumber().call();

            for (let i = 0; i < stakerNb; i++) {
                let stakerAddress = await stakeV2.methods
                    .getStakerAtIndex(i)
                    .call();
                if (!stakers.some((user) => user.address === stakerAddress)) {
                    let user = {
                        address: stakerAddress,
                        invest: 0, // This will be updated later from launchPad
                    };
                    stakers.push(user);
                }
            }

            let launchPad = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );

            for (let i = 0; i < stakers.length; i++) {
                let invest = await launchPad.methods
                    .getUserInvestForPool(stakers[i].address, project.pool_id)
                    .call();
                stakers[i].invest = invest;
            }

            // Filter out stakers with invest === "0" (or "0n" if invest is returned as a BigInt)
            stakers = stakers.filter(
                (staker) => staker.invest !== "0" && staker.invest !== "0n"
            );

            return stakers;
        } catch (err) {
            console.error("An error occurred: ", err);
            return [];
        }
    };

    // Convert fetched data to CSV and trigger download
    const downloadInvestorsCSV = async () => {
        const investors = await extractInvestors();
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Address,Invest\n"; // Column headers
        investors.forEach(({ address, invest }) => {
            csvContent += `${address},${invest}\n`; // Each row
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
            "download",
            `investors_data_pool_${project.pool_id}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const addWlAddressesHandler = () => {
        const addWlAddresses = async (users, poolId) => {
            try {
                let launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                let encoded = launchpadInstance.methods
                    .wlAddressesToPool(users, poolId)
                    .encodeABI();

                let tx = {
                    from: account,
                    to: LaunchPadAddress,
                    data: encoded,
                };

                await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [tx],
                });
            } catch (err) {
                console.error(err);
            }
        };
        addWlAddresses(whiteList, project.pool_id);
    };

    const setTiersAllocs = async () => {
        try {
            let launchpadInstance = new web3.eth.Contract(
                launchPadABI,
                LaunchPadAddress
            );

            let encoded = launchpadInstance.methods
                .setTiersAllocs(allTiersAllocs)
                .encodeABI();

            let tx = {
                from: account,
                to: LaunchPadAddress,
                data: encoded,
            };

            await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [tx],
            });
        } catch (err) {
            console.error(err);
        }
    };

    const setRoundDurationHandler = () => {
        const setRoundDuration = async (_round1Duration) => {
            try {
                let launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                let encoded = launchpadInstance.methods
                    .setRoundDuration(_round1Duration)
                    .encodeABI();

                let tx = {
                    from: account,
                    to: LaunchPadAddress,
                    data: encoded,
                };

                await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [tx],
                });
            } catch (err) {
                console.error(err);
            }
        };

        setRoundDuration(round1Duration);
    };

    const setPauseDurationHandler = () => {
        const setPauseDuration = async (_pauseDuration) => {
            try {
                let launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                let encoded = launchpadInstance.methods
                    .setPauseDuration(_pauseDuration)
                    .encodeABI();

                let tx = {
                    from: account,
                    to: LaunchPadAddress,
                    data: encoded,
                };

                await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [tx],
                });
            } catch (err) {
                console.error(err);
            }
        };

        setPauseDuration(pauseDuration);
    };

    const setFcfs1DurationHandler = () => {
        const setFcfs1Duration = async (_fcfsDuration) => {
            try {
                let launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                let encoded = launchpadInstance.methods
                    .setFcfs1Duration(_fcfsDuration)
                    .encodeABI();

                let tx = {
                    from: account,
                    to: LaunchPadAddress,
                    data: encoded,
                };

                await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: [tx],
                });
            } catch (err) {
                console.error(err);
            }
        };

        setFcfs1Duration(Fcfs1Duration);
    };

    return (
        <>
            <div className="flex  items-center justify-between gap-[10px] w-full">
                {project.pool_id === null ? (
                    <button
                        className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                        onClick={createPoolHandler}
                    >
                        <p className="text-[16px] text-[#fff]  ">Create Pool</p>
                    </button>
                ) : null}

                {isFinished ? (
                    <>
                        {!isWithdrawn && (
                            <>
                                <button
                                    className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                                    onClick={withdrawHandler}
                                >
                                    <p className="text-[16px] text-[#fff]  ">
                                        Widthdraw
                                    </p>
                                </button>
                            </>
                        )}
                        <button
                            className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                            onClick={downloadInvestorsCSV}
                        >
                            <p className="text-[16px] text-[#fff]  ">
                                Extract Investors
                            </p>
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                        onClick={closePoolHandler}
                    >
                        <p className="text-[16px] text-[#fff]  ">Close Pool</p>
                    </button>
                )}

                <button
                    className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                    onClick={addWlAddressesHandler}
                >
                    <p className="text-[16px] text-[#fff]  ">Add White List</p>
                </button>
            </div>

            <div className="flex  items-center justify-between gap-[10px] w-full">
                <button
                    className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                    onClick={setRoundDurationHandler}
                >
                    <p className="text-[16px] text-[#fff]  ">
                        Set First Round Duration
                    </p>
                </button>
                <button
                    className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                    onClick={setPauseDurationHandler}
                >
                    <p className="text-[16px] text-[#fff]  ">
                        Set Pause Duration
                    </p>
                </button>

                <button
                    className="bg-[#828085] rounded-[8000px] py-[12px] px-[35px] "
                    onClick={setFcfs1DurationHandler}
                >
                    <p className="text-[16px] text-[#fff]  ">
                        Set FCFS 1 Duration
                    </p>
                </button>
            </div>

            <div className="flex flex-col items-center justify-between gap-[10px] w-full">
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 1"
                        onChange={setTier1Handler}
                        value={tier1Alloc}
                    />
                </div>
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 2"
                        onChange={setTier2Handler}
                        value={tier2Alloc}
                    />
                </div>
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 3"
                        onChange={setTier3Handler}
                        value={tier3Alloc}
                    />
                </div>
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 4"
                        onChange={setTier4Handler}
                        value={tier4Alloc}
                    />
                </div>
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 5"
                        onChange={setTier5Handler}
                        value={tier5Alloc}
                    />
                </div>
                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set Tier 6"
                        onChange={setTier6Handler}
                        value={tier6Alloc}
                    />
                </div>

                <div className="w-full p-[12px] rounded-[6.4px] bg-[#d5d0cb] flex items-center">
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Set WL Tier"
                        onChange={setTier7Handler}
                        value={tier7Alloc}
                    />
                </div>

                <button
                    className="bg-[#2c2a2f] rounded-[5px] py-[10px] px-[35px] "
                    onClick={setTiersAllocs}
                >
                    <p className="text-[16px] text-[#fff]  ">Submit</p>
                </button>
            </div>
        </>
    );
}
