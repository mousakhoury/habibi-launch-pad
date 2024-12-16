import React, { useEffect, useState } from "react";
import PrepaidCard from "./PrepaidCard";
import PrepaidPopup from "./PrepaidPopup";

export default function CardsList({
    title,
    cards,
    selectedCard,
    setSelectedCard,
}) {
    const selectCardHandler = (card) => {
        setSelectedCard(card);
        localStorage.setItem("selectedCard", JSON.stringify(card));
    };

    useEffect(() => {
        // Disable scrolling when the popup is open
        if (selectedCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Clean up function to reset overflow when the component is unmounted
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedCard]);

    return (
        <>
            {cards.length != 0 && (
                <div className="flex flex-col items-start gap-[20px] w-full">
                    <p className="text-[#CCC] text-[16px] lg:text-[24px] font-medium">
                        {title}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px] lg:gap-[24px] w-full">
                        {cards.map((card) => (
                            <PrepaidCard
                                key={card.productId}
                                onClick={() => {
                                    selectCardHandler(card);
                                }}
                                card={card}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
