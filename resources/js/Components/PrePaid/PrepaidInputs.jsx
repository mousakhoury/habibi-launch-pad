import Button from "@/Layouts/UI/Button";
import DataInput from "@/Layouts/UI/DataInput";
import DigitalInput from "@/Layouts/UI/DigitalInput";
import React from "react";

export default function PrepaidInputs({
    email,
    changeEmailHandler,
    fName,
    changeFNameHandler,
    lName,
    changeLNameHandler,
    backToDataHandler,
    goToPrepaidValidationHandler,
}) {
    return (
        <div className="flex flex-col items-start gap-[30px] w-full px-[16px] py-[20px]">
            <div className="flex flex-col items-start gap-[24px] w-full">
                <div className="flex flex-col items-start gap-[8px] w-full">
                    <p className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px]">
                        Enter your email and name to continue purchasing
                    </p>
                    <p className="text-[#9C9C9C] text-[14px] font-medium leading-[18px]">
                        To purchase your prepaid card, you need to enter your
                        email address and your name. We will send the card
                        details to your email. For future purchase, you can save
                        your email.
                    </p>
                </div>
                <div className="flex flex-col items-start gap-[16px] w-full">
                    <div className="flex items-start gap-[12px] w-full">
                        <DataInput
                            data={fName}
                            setData={changeFNameHandler}
                            type="text"
                            label="First Name"
                        />
                        <DataInput
                            data={lName}
                            setData={changeLNameHandler}
                            type="text"
                            label="Last Name"
                        />
                    </div>
                    <DataInput
                        data={email}
                        setData={changeEmailHandler}
                        type="email"
                        label="Email"
                    />
                </div>
            </div>
            <div className="flex items-start gap-[16px] w-full">
                <Button onClick={backToDataHandler} type="prepaidCancel" />
                <Button
                    disabled={!email || !fName || !lName}
                    onClick={goToPrepaidValidationHandler}
                    type="prepaidDone"
                />
            </div>
        </div>
    );
}
