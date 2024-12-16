import React, { useContext, useMemo, useState } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";

export default function PrepaidCard({ card, onClick }) {
    const { web3 } = useContext(Web3Context);
    const { GiftCardAddress, giftCardABI } = useContext(BlockchainContext);
    const [isPurchased, setIsPurchased] = useState(false);

    useMemo(async () => {
        if (!web3 || !card) return;
        try {
            let giftCardInstance = new web3.eth.Contract(
                giftCardABI,
                GiftCardAddress
            ); // from config.js file

            let userDatas = await giftCardInstance.methods
                .isPurchased(card.productId)
                .call();
            setIsPurchased(userDatas);
        } catch (err) {
            console.error(err);
        }
    }, [card, web3]);

    return (
        <div className="flex flex-col items-start gap-[16.5px] p-[6px] pb-[16px] w-full rounded-[12px] bg-[#1B1B1B]">
            <img
                src={card.productImage}
                alt=""
                className="aspect-[300/189.5] object-cover rounded-[6px] w-full"
                loading="lazy"
            />
            <div className="flex flex-col items-start gap-[8px] p-[10px] w-full">
                <p
                    onClick={onClick}
                    className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px] cursor-pointer"
                >
                    {card.brandName}
                </p>
                <div className="flex items-start gap-[8px]">
                    <p className="text-[#B4B4B4] text-[14px] font-medium leading-[17px]">
                        Purchase Limit:
                    </p>
                    <p className="text-[#E2FD70] text-[14px] font-semibold leading-[17px]">
                        ${card.valueRestrictions.minVal} to $
                        {card.valueRestrictions.maxVal}
                    </p>
                </div>
                {/* {isPurchased && (
                    <div className="bg-[rgb(56,142,60)] text-white rounded-md px-2">
                        Purchased
                    </div>
                )} */}
            </div>
        </div>
    );
}
