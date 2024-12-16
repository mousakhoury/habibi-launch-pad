import React, { useState } from "react";
import PrepaidPopupData from "./PrepaidPopupData";
import PrepaidInputs from "./PrepaidInputs";
import PrepaidValidation from "./PrepaidValidation";
import { v4 as uuidv4 } from "uuid";

export default function PrepaidPopup({
    card,
    closeSelectedCard,
    setLName,
    lName,
    setFName,
    fName,
    setEmail,
    email,
    setAmount,
    amount,
    openCheckoutHandler,
    setIsCheckout,
    setOrderId,
    setChainId,
}) {
    const [selectedPopup, setSelectedPopup] = useState("data");
    const [randomNumber, setRandomNumber] = useState(null);

    const changeAmountHandler = (e) => {
        setAmount(e.target.value);
    };

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    };

    const changeFNameHandler = (e) => {
        setFName(e.target.value);
    };

    const changeLNameHandler = (e) => {
        setLName(e.target.value);
    };

    const goToPrepaidInputsHandler = () => {
        setSelectedPopup("inputs");
        localStorage.setItem("amount", amount);
    };

    const backToDataHandler = () => {
        setSelectedPopup("data");
    };

    const goToPrepaidValidationHandler = () => {
        setSelectedPopup("validation");
        const Number = Math.floor(Math.random() * 900000) + 100000;
        // const Number = 123456;

        setRandomNumber(Number.toString());

        localStorage.setItem("email", email);
        localStorage.setItem("fName", fName);
        localStorage.setItem("lName", lName);

        // Use fetch or axios to send the email
        fetch("/send-number", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({
                randomNumber: Number.toString(),
                email: email,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data.message));
    };

    const backToInputsHandler = () => {
        setSelectedPopup("inputs");
    };

    const generateRandomOrderId = () => {
        const newOrderId = uuidv4();
        setOrderId(newOrderId);
        localStorage.setItem("orderId", newOrderId);
    };

    const generateRandomNumber = () => {
        let randomNumber = "";
        for (let i = 0; i < 10; i++) {
            randomNumber += Math.floor(Math.random() * 10);
        }
        setChainId(randomNumber);
        localStorage.setItem("chainId", randomNumber);
    };

    const completeHandler = () => {
        setSelectedPopup("complete");
        generateRandomOrderId();
        generateRandomNumber();

        setTimeout(() => {
            openCheckoutHandler();
        }, 3000);
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-[100vh] bg-[#121212ba] z-[50]"
                // onClick={closeSelectedCard}
                onClick={closeSelectedCard}
            />

            {selectedPopup === "complete" ? (
                <div className="flex flex-col items-center gap-[32px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[480px] rounded-[12px] border border-solid border-[#323232] bg-[#1B1B1B] z-[51] px-[81px] py-[84px]">
                    <img
                        src="/images/prepaid/congrats.svg"
                        alt=""
                        className="w-[120px]"
                    />
                    <div className="flex flex-col items-center gap-[12px]">
                        <p className="text-[#E4E4E4] text-[32px] font-semibold">
                            Congratulation!
                        </p>
                        <p className="text-[#9C9C9C] text-[18px] text-center font-medium">
                            Your email was verified and saved successfully.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[648px] rounded-[12px] border border-solid border-[#323232] bg-[#1B1B1B] z-[51]">
                    {selectedPopup === "data" && (
                        <PrepaidPopupData
                            changeAmountHandler={changeAmountHandler}
                            amount={amount}
                            card={card}
                            goToPrepaidInputsHandler={goToPrepaidInputsHandler}
                        />
                    )}

                    {selectedPopup === "inputs" && (
                        <PrepaidInputs
                            email={email}
                            changeEmailHandler={changeEmailHandler}
                            fName={fName}
                            changeFNameHandler={changeFNameHandler}
                            lName={lName}
                            changeLNameHandler={changeLNameHandler}
                            backToDataHandler={backToDataHandler}
                            goToPrepaidValidationHandler={
                                goToPrepaidValidationHandler
                            }
                        />
                    )}

                    {selectedPopup === "validation" && (
                        <PrepaidValidation
                            backToInputsHandler={backToInputsHandler}
                            randomNumber={randomNumber}
                            completeHandler={completeHandler}
                        />
                    )}
                </div>
            )}
        </>
    );
}
