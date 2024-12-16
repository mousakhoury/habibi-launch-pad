import { useContext } from "react";
import { Web3Context } from "@/Store/Web3Context";

export default function useGetAccount({ accounts }) {
    const { account } = useContext(Web3Context);
    const address = account;

    const getAccountByAddress = (address) => {
        return accounts.find((acc) => acc.address === address);
    };

    const matchedAccount = getAccountByAddress(address);

    return { matchedAccount };
}
