import React, { useEffect, useState } from "react";
import Template from "@/Layouts/Template";
import { Web3Provider } from "@/Store/Web3Context";
import { BlockchainProvider } from "@/Store/BlockchainProvider";
import { Head } from "@inertiajs/react";
import CustomSelect from "@/Components/PrePaid/CustomSelect";
import CardsList from "@/Components/PrePaid/CardsList";
import PrepaidMain from "@/Components/PrePaid/PrepaidMain";
import PrepaidCheckout from "@/Components/PrePaid/PrepaidCheckout";
import PrepaidPopup from "@/Components/PrePaid/PrepaidPopup";

export default function PrePaid({ countries, accounts, brands, images }) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isCheckout, setIsCheckout] = useState(false);
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [orderId, setOrderId] = useState("");
    const [chainId, setChainId] = useState("");

    useEffect(() => {
        const clearLocalStorageOnReload = (event) => {
            // Check if isCheckout is false before clearing localStorage
            if (!isCheckout) {
                localStorage.removeItem("selectedCard");
                localStorage.removeItem("email");
                localStorage.removeItem("fName");
                localStorage.removeItem("lName");
                localStorage.removeItem("amount");
                localStorage.removeItem("isCheckout");
            }
        };

        window.addEventListener("beforeunload", clearLocalStorageOnReload);

        // Return a cleanup function
        return () => {
            window.removeEventListener(
                "beforeunload",
                clearLocalStorageOnReload
            );
        };
    }, [isCheckout]); // Depend on isCheckout to ensure the

    const openCheckoutHandler = () => {
        setIsCheckout(true);
        localStorage.setItem("isCheckout", true);
    };

    const closeCheckoutHandler = () => {
        setIsCheckout(false);
        closeSelectedCard();
        localStorage.removeItem("isCheckout");
    };

    useEffect(() => {
        const savedCheckout = localStorage.getItem("isCheckout");
        if (savedCheckout) {
            setIsCheckout(savedCheckout);
        }
    });

    useEffect(() => {
        // Check if there's a selected card saved in localStorage on component mount
        const savedCard = JSON.parse(localStorage.getItem("selectedCard"));
        const savedAmount = localStorage.getItem("amount");
        const savedEmail = localStorage.getItem("email");
        const savedFName = localStorage.getItem("fName");
        const savedLName = localStorage.getItem("lName");
        const savedOrderId = localStorage.getItem("orderId");
        const savedChainId = localStorage.getItem("chainId");

        if (savedOrderId) {
            setOrderId(savedOrderId);
        }

        if (savedChainId) {
            setChainId(savedChainId);
        }

        if (savedCard) {
            setSelectedCard(savedCard);
        }
        if (savedAmount) {
            setAmount(savedAmount);
        }

        if (savedEmail) {
            setEmail(savedEmail);
        }
        if (savedFName) {
            setFName(savedFName);
        }
        if (savedLName) {
            setLName(savedLName);
        }
    }, [setSelectedCard, setAmount, setEmail, setFName, setLName]);

    const closeSelectedCard = () => {
        setSelectedCard(null);
        localStorage.removeItem("selectedCard");
        localStorage.removeItem("email");
        localStorage.removeItem("fName");
        localStorage.removeItem("lName");
        localStorage.removeItem("amount");
        localStorage.removeItem("orderId");
        localStorage.removeItem("chainId");
        localStorage.removeItem("isCheckout");
        setIsCheckout(false);
        setAmount(null);
        setEmail(null);
        setFName(null);
        setLName(null);
    };

    return (
        <BlockchainProvider>
            <Web3Provider>
                <Template accounts={accounts}>
                    <Head title="Prepaid Cards" />

                    {isCheckout ? (
                        <PrepaidCheckout
                            card={selectedCard}
                            email={email}
                            fName={fName}
                            lName={lName}
                            amount={amount}
                            closeCheckoutHandler={closeCheckoutHandler}
                            closeSelectedCard={closeSelectedCard}
                            orderId={orderId}
                            chainId={chainId}
                        />
                    ) : (
                        <>
                            <PrepaidMain
                                countries={countries}
                                selectedCard={selectedCard}
                                setSelectedCard={setSelectedCard}
                                brands={brands.brands}
                                images={images}
                            />
                            {selectedCard && (
                                <PrepaidPopup
                                    card={selectedCard}
                                    closeSelectedCard={closeSelectedCard}
                                    amount={amount}
                                    setAmount={setAmount}
                                    email={email}
                                    setEmail={setEmail}
                                    fName={fName}
                                    setFName={setFName}
                                    lName={lName}
                                    setLName={setLName}
                                    openCheckoutHandler={openCheckoutHandler}
                                    setIsCheckout={setIsCheckout}
                                    setOrderId={setOrderId}
                                    setChainId={setChainId}
                                />
                            )}
                        </>
                    )}
                </Template>
            </Web3Provider>
        </BlockchainProvider>
    );
}
