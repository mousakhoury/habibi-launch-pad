import { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";

export default function useGetUserDataForPool({ project }) {
    const { launchPadABI, LaunchPadAddress } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);
    const [userData, setUserData] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const getUserDatasForPool = async (userAddress, poolId) => {
            if (!web3 || !userAddress || !poolId) {
                console.error("web3, userAddress, or poolId is not available.");
                return;
            }

            try {
                let launchpadInstance = new web3.eth.Contract(
                    launchPadABI,
                    LaunchPadAddress
                );

                let userDatas = await launchpadInstance.methods
                    .getUserDatasForPool(userAddress, poolId)
                    .call();
                return userDatas;
            } catch (err) {
                console.error(err);
            }
        };

        const fetchData = async () => {
            if (!project || !project.pool_id) {
                console.error("Project data is not available.");
                return;
            }
            try {
                const userDatas = await getUserDatasForPool(
                    account,
                    project.pool_id
                );

                const defaultUserData = {
                    // ...default properties
                    registered: false,
                    // ...other default properties as needed
                };

                if (userDatas) {
                    setUserData(userDatas);
                    setIsRegistered(userDatas.registered);
                } else {
                    console.error("No data returned from getUserDatasForPool");
                }
            } catch (err) {
                console.error("Error fetching user pool data:", err);
            }
        };

        if (account && web3 && project && project.pool_id) {
            fetchData();
        }
    }, [account, web3, project, launchPadABI, LaunchPadAddress]);

    return { userData, isRegistered, setIsRegistered };
}
