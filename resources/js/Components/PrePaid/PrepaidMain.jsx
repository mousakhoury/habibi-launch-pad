import React, { useContext, useMemo, useState } from "react";
import { Web3Context } from "@/Store/Web3Context";
import { BlockchainContext } from "@/Store/BlockchainContext";
import CustomSelect from "@/Components/PrePaid/CustomSelect";
import CardsList from "@/Components/PrePaid/CardsList";
import PrepaidSwiper from "./PrepaidSwiper";
import useIsMobile from "@/Hooks/useIsMobile";

export default function PrepaidMain({
    countries,
    selectedCard,
    setSelectedCard,
    brands,
    images,
}) {
    const { web3 } = useContext(Web3Context);
    const { GiftCardAddress, giftCardABI } = useContext(BlockchainContext);
    const [selectedTab, setSelectedTab] = useState("All Cards");
    const isMobile = useIsMobile();

    const tabs = ["All Cards", "Prepaid Cards", "Gift Cards"];

    const prepaidBrands = brands.filter((brand) =>
        brand.brandName.includes("Prepaid")
    );

    const giftCardsBrands = brands.filter(
        (brand) => !brand.brandName.includes("Prepaid")
    );

    const selectTabHandler = (tab) => {
        setSelectedTab(tab);
    };

    const prepaidCards = [
        {
            title: "Visa® Virtual Prepaid Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/Visa Card.png",
            location: "Saudi Arabia",
            cardId: 0,
        },
        {
            title: "Mastercard® Virtual Prepaid Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/Master Card.png",
            location: "Saudi Arabia",
            cardId: 1,
        },
        {
            title: "Amex® Virtual Prepaid Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/Amex Card.png",
            location: "United Arab Emirates",
            cardId: 2,
        },
        {
            title: "Union Pay® Virtual Prepaid Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/Union pay Card.png",
            location: "United Arab Emirates",
            cardId: 3,
        },
    ];

    const giftCards = [
        {
            title: "Amazon Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/amazon.png",
            location: "Saudi Arabia",
            cardId: 4,
        },
        {
            title: "Adidas Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/adidas.png",
            location: "Saudi Arabia",
            cardId: 5,
        },
        {
            title: "McDonald’s Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/mcdonalds.png",
            location: "United Arab Emirates",
            cardId: 6,
        },
        {
            title: "Puma Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/puma.png",
            location: "United Arab Emirates",
            cardId: 7,
        },
        {
            title: "Starbucks Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/startbucks.png",
            location: "Saudi Arabia",
            cardId: 8,
        },
        {
            title: "Apple Pay Gift Card USD",
            limit: "$10 to $1000",
            image: "images/prepaid/apple.png",
            location: "United Arab Emirates",
            cardId: 9,
        },
    ];

    const getTotalPurchasesDatas = async () => {
        try {
            let giftCardInstance = new web3.eth.Contract(
                giftCardABI,
                GiftCardAddress
            ); // from config.js file

            let totalDatas = await giftCardInstance.methods
                .totalPurchases()
                .call();
            return totalDatas;
        } catch (err) {
            console.error(err);
        }
    };

    useMemo(async () => {
        if (!web3) return;
        // console.log(await getTotalPurchasesDatas());
    }, [web3]);

    return (
        <div className="flex flex-col items-start gap-[40px] w-full">
            <PrepaidSwiper images={images} />
            <div className="flex flex-col items-start gap-[30px] w-full">
                <div className="flex  gap-[20px] items-start justify-between w-full">
                    <h1 className="text-[#FCFCFC] text-[20px] lg:text-[32px] font-semibold">
                        All Cards
                    </h1>
                    <div className="flex flex-col lg:flex-row items-start gap-[16px]">
                        {!isMobile && (
                            <ul className="prepaid-tabs">
                                {tabs.map((tab) => (
                                    <li
                                        key={tab}
                                        onClick={() => selectTabHandler(tab)}
                                        className={
                                            selectedTab === tab ? "active" : ""
                                        }
                                    >
                                        {tab}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <CustomSelect
                            options={countries}
                            placeholder="Select Country"
                        />
                    </div>
                </div>

                {isMobile && (
                    <ul className="prepaid-tabs m-auto">
                        {tabs.map((tab) => (
                            <li
                                key={tab}
                                onClick={() => selectTabHandler(tab)}
                                className={selectedTab === tab ? "active" : ""}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedTab === "All Cards" && (
                    <>
                        <CardsList
                            title="Prepaid Cards"
                            cards={prepaidBrands}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                        />
                        <CardsList
                            title="Gift Cards"
                            cards={giftCardsBrands}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                        />
                    </>
                )}
                {selectedTab === "Prepaid Cards" && (
                    <CardsList
                        title="Prepaid Cards"
                        cards={prepaidBrands}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                    />
                )}

                {selectedTab === "Gift Cards" && (
                    <CardsList
                        title="Gift Cards"
                        cards={giftCardsBrands}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                    />
                )}
            </div>
        </div>
    );
}
