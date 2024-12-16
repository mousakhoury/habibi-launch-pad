import { useContext, useEffect, useState } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";

const useFetchAllowance = (approveSuccess) => {
  const { web3, account } = useContext(Web3Context);
  const { GiftCardAddress, FMTAddress, ERC20ABI } =
      useContext(BlockchainContext);
  const [allowance, setAllowance] = useState();

  useEffect(() => {
    if(!web3) return;
    async function fetchAllowance() {
      try {
        let tokenInstance = new web3.eth.Contract(ERC20ABI, FMTAddress); // from config.js file

        let _allowance = await tokenInstance.methods
            .allowance(account, GiftCardAddress)
            .call();
        setAllowance(_allowance);
      } catch(err){
        setAllowance('0');
        console.error(err);
      }
    }
    fetchAllowance();
    // let timer = setInterval(() => {
    //   fetchAllowance();
    // }, 3000)
    // return () => {
    //   clearInterval(timer)
    // }
  }, [web3, setAllowance, approveSuccess]);

  return allowance;
};

export default useFetchAllowance;