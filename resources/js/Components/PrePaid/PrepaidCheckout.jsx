import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";
import Button from "@/Layouts/UI/Button";
import PaymentOptions from "./PaymentOptions";
import { parseEther } from "ethers";
import useGetBalance from "@/Hooks/useGetBalance";
import useFetchAllowance from "@/Hooks/useFetchAllowance";

export default function PrepaidCheckout({
    card,
    email,
    fName,
    lName,
    amount,
    closeCheckoutHandler,
    closeSelectedCard,
    orderId,
    chainId,
}) {
    const { web3, account } = useContext(Web3Context);
    const { GiftCardAddress, giftCardABI, FMTAddress, ERC20ABI } =
        useContext(BlockchainContext);
    const [openOptions, setOpenOptions] = useState(false);
    const [doing, setDoing] = useState(false);
    const [approveSuccess, setApproveSuccess] = useState(false);
    const balance = useGetBalance();

    const allowance = useFetchAllowance(approveSuccess);

    const sendEmail = (event) => {
        if (event) event.preventDefault(); // Prevent the form from submitting through the browser

        console.log("Sending Email...");

        if (!orderId || !email) {
            alert("Order ID and email must be provided.");
            return;
        }

        const data = { orderId, email };
        axios
            .post("/purchase/email", data)
            .then((response) => {
                console.log("Server response:", response.data);
                if (response.status === 200) {
                    alert(response.data.message);
                    closeSelectedCard();
                }
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                alert("Error: " + error.message);
            });
    };

    const purchaseCard = (event) => {
        if (event) event.preventDefault(); // Prevent the form from submitting through the browser

        console.log("Purchasing a Card...");
        const data = {
            orderId: orderId,
            price: Number(amount),
            productId: card.productId,
            email: email,
            fName: fName,
            lName: lName,
        };

        axios
            .post("/api/purchase", data)
            .then((response) => {
                console.log("Server response:", response.data);
                if (response.status === 200) {
                    alert(response.data.purchaseMessage);
                    setTimeout(() => {
                        sendEmail();
                    }, 10000);
                    if (response.data.emailMessage) {
                        alert(response.data.emailMessage);
                    }
                    // Redirect or further action
                }
            })
            .catch((error) => {
                console.error("Error posting data:", error);
                alert("Failed to make purchase.");
            });
    };

    const approveGiftCardContract = async () => {
        try {
            let tokenInstance = new web3.eth.Contract(ERC20ABI, FMTAddress); // from config.js file

            let encoded = tokenInstance.methods
                .approve(GiftCardAddress, parseEther(balance.toString()))
                .encodeABI();

            let tx = {
                from: account, // the user address we get from connect() and stored localy
                to: FMTAddress,
                data: encoded,
            };

            let resultHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [tx],
            });

            if (resultHash) {
                const timer = setInterval(async () => {
                    await web3.eth
                        .getTransactionReceipt(resultHash)
                        .then(() => {
                            setApproveSuccess(true);
                            setDoing(false);
                            clearInterval(timer);
                            return true;
                        });
                }, 2000);
            }
        } catch (err) {
            setDoing(false);
            console.log(err);
        }
    };

    const purchase = async (amount, cardId, orderID) => {
        try {
            let giftCardInstance = new web3.eth.Contract(
                giftCardABI,
                GiftCardAddress
            ); // from config.js file

            // console.log(amount, cardId, orderID);
            let encoded = giftCardInstance.methods
                .purchase(amount, cardId, orderID)
                .encodeABI();

            let tx = {
                from: account, // the user address we get from connect() and stored localy
                to: GiftCardAddress,
                data: encoded,
            };

            let resultHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [tx],
            });

            if (resultHash) {
                const timer = setInterval(async () => {
                    await web3.eth
                        .getTransactionReceipt(resultHash)
                        .then(() => {
                            setDoing(false);
                            clearInterval(timer);
                            console.log("true");
                            purchaseCard();
                            return true;
                        });
                }, 2000);
            }
        } catch (err) {
            console.log(err);
            setDoing(false);
        }
    };

    const approve = async () => {
        setDoing(true);
        try {
            await approveGiftCardContract();
        } catch (e) {
            // console.log(e);
            setDoing(false);
        }
    };

    const openOPtionsHandler = async () => {
        if (!account) {
            alert("Connect wallet");
            return;
        }
        setDoing(true);
        try {
            const purchaseSuccess = await purchase(
                parseEther(amount),
                card.productId,
                chainId
            );
            if (purchaseSuccess) alert("Successfully purchased");
        } catch (e) {
            // console.log(e);
        }
        // setOpenOptions(true);
    };

    const closeOPtionsHandler = () => {
        setOpenOptions(false);
    };

    useEffect(() => {
        // Disable scrolling when the popup is open
        if (openOptions) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Clean up function to reset overflow when the component is unmounted
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [openOptions]);

    return (
        <>
            {card ? (
                <div className="flex flex-col items-start gap-[16px] lg:gap-[30px] w-full">
                    <div
                        onClick={closeCheckoutHandler}
                        className="flex items-center gap-[12px] cursor-pointer"
                    >
                        <img
                            src="/images/project/link-arrow.svg"
                            alt=""
                            className="w-[20px]"
                        />
                        <p className="text-[#CCC] text-[12px] lg:text-[14px] font-medium">
                            Back
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-[24px] w-full max-w-[872px] rounded-[12px] border border-solid border-[#252525] bg-[#1B1B1B] mx-auto pt-[16px]">
                        <div className="flex flex-col items-start gap-[24px] w-full px-[16px]">
                            <div className="flex flex-col items-start gap-[20px] w-full">
                                <div className="flex items-center gap-[16px] w-full p-[8px] rounded-[8px] bg-[#d3ce570d]">
                                    <img
                                        src="images/prepaid/order-id.svg"
                                        alt=""
                                        className="w-[54px]"
                                    />
                                    <div className="flex flex-col items-start gap-[5px] w-full">
                                        <div className="flex items-start gap-[6px]">
                                            <p className="text-[#D3CE57] text-[18px] font-medium leading-[22px]">
                                                Your Order ID:
                                            </p>
                                            <p className="text-[#CCC] text-[18px] font-semibold leading-[22px]">
                                                {orderId}-{chainId}
                                            </p>
                                        </div>
                                        <p className="text-[#B4B4B4] text-[14px] font-normal leading-[17px]">
                                            Save your order ID, You'll get the
                                            card in your email within one
                                            working day.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-[24px] w-full">
                                    <img
                                        src={card.productImage}
                                        alt=""
                                        className="w-full max-w-[408px] aspect-[408/257.472] object-cover rounded-[10.88px]"
                                    />
                                    <div className="flex flex-col items-start gap-[16px] w-full">
                                        <p className="text-[#848484] text-[14px] font-normal leading-[17px]">
                                            You are purchasing
                                        </p>
                                        <div className="flex flex-col items-start gap-[10px] w-full">
                                            <p className="text-[#FCFCFC] text-[24px] font-semibold leading-[30px]">
                                                {card.brandName}
                                            </p>
                                            <div className="flex items-start gap-[6px] leading-[17px]">
                                                <p className="text-[#B4B4B4] text-[14px] font-medium">
                                                    Billed To:
                                                </p>
                                                <p className="text-[#E2FD70] text-[14px] font-medium">
                                                    {fName} {lName}
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-[6px] leading-[17px]">
                                                <p className="text-[#B4B4B4] text-[14px] font-medium">
                                                    Email:
                                                </p>
                                                <p className="text-[#E2FD70] text-[14px] font-medium">
                                                    {email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-[12px] w-full px-[20px] py-[18px] rounded-[6px] bg-[#262626] leading-[17px]">
                                            <div className="flex flex-col items-start gap-[12px] w-full">
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-[#9C9C9C] text-[14px] font-medium">
                                                        Order Amount:
                                                    </p>
                                                    <p className="text-[#E4E4E4] text-[14px] font-semibold">
                                                        ${amount}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-[#9C9C9C] text-[14px] font-medium">
                                                        Conversation Fee:
                                                    </p>
                                                    <p className="text-[#E4E4E4] text-[14px] font-semibold">
                                                        {card.discount}%
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="border-[#ffffff1a] w-full" />
                                            <div className="flex items-center justify-between w-full">
                                                <p className="text-[#9C9C9C] text-[14px] font-medium">
                                                    Total Amount:
                                                </p>
                                                <p className="text-[#E2FD70] text-[14px] font-semibold">
                                                    $
                                                    {amount -
                                                        (card.discount *
                                                            amount) /
                                                            100}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-[8px] w-full">
                                <p className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px]">
                                    More Details
                                </p>
                                <div className="text-[#9C9C9C] text-[14px] font-medium leading-[17px]">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: card.productDescription,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-[16px] px-[16px] py-[17px] border-t border-solid border-[#ffffff0d] w-full">
                            <div className="max-w-[184px] w-full">
                                <Button
                                    onClick={closeSelectedCard}
                                    type="prepaidCancel"
                                />
                            </div>
                            {allowance >= parseEther(amount) ? (
                                <>
                                    <Button
                                        onClick={openOPtionsHandler}
                                        disabled={doing}
                                        type="confirmPay"
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        onClick={approve}
                                        disabled={doing}
                                        type="approveGift"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}

            {openOptions && (
                <PaymentOptions closeOPtionsHandler={closeOPtionsHandler} />
            )}
        </>
    );
}
