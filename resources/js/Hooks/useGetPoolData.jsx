import { useState, useEffect, useContext, useCallback } from "react";
import { BlockchainContext } from "@/Store/BlockchainContext";
import { Web3Context } from "@/Store/Web3Context";
import useHasDatePassed from "./useHasDatePassed";

export default function useGetPoolData({ project }) {
    const { launchPadABI, LaunchPadAddress } = useContext(BlockchainContext);
    const { web3, account } = useContext(Web3Context);
    const [isLoading, setIsLoading] = useState(true);
    const [poolDate, setPoolData] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isWithdrawn, setIsWithdrawn] = useState(false);
    const [percentageRaised, setPercentageRaised] = useState("0");
    const [amountRaised, setAmountRaised] = useState("0");
    const isDeadline = useHasDatePassed(project.deadline);

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
                fundWithdrawn: datas.fundWithdrawn, // bool false if found are still in the launchpad contract, true if already withdraed
                poolName: datas.poolName, // string name of the pool, should be the project name
            };
        } catch (err) {
            console.error("Error in getPoolDatas:", err);
            return null; // Return null or appropriate error handling
        }
    };

    const fetchData = useCallback(async () => {
        if (!web3) {
            console.error("web3 is not available.");
            return;
        }
        if (!project || !project.pool_id) {
            console.error("Project data is not available.");
            return;
        }

        setIsLoading(true);
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
                setPercentageRaised(percentage.toFixed(2));
                setAmountRaised(amountRaisedEther);
                setPoolData(data);
                setIsFinished(data.isFinished);
                setIsWithdrawn(data.fundWithdrawn);
            } else {
                console.error("No data returned from getPoolDatas");
            }
        } catch (err) {
            console.error("Error fetching pool data:", err);
        } finally {
            setIsLoading(false); // End loading regardless of success or error
        }
    }, [web3, project, getPoolDatas, account, isDeadline]);

    useEffect(() => {
        if (!web3 || !account || !project || !project.pool_id) {
            setIsFinished(isDeadline);
            setIsLoading(false); // Not loading since no fetch will occur
        } else {
            fetchData();
        }
    }, [web3, project, account, isDeadline]);

    return {
        poolDate,
        isFinished,
        isWithdrawn,
        amountRaised,
        percentageRaised,
    };
}
