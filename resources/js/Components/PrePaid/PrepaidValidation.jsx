import Button from "@/Layouts/UI/Button";
import DigitalInput from "@/Layouts/UI/DigitalInput";
import React, { useState } from "react";

export default function PrepaidValidation({
    backToInputsHandler,
    completeHandler,
    randomNumber,
}) {
    const [numberValue, setNumberValue] = useState(null);

    return (
        <div className="flex flex-col items-start gap-[30px] w-full px-[16px] py-[20px]">
            <div className="flex flex-col items-start gap-[24px] w-full">
                <div className="flex flex-col items-start gap-[8px] w-full">
                    <p className="text-[#FCFCFC] text-[20px] font-semibold leading-[25px]">
                        Verify your email address
                    </p>
                    <p className="text-[#9C9C9C] text-[14px] font-medium leading-[18px]">
                        An 6 digit OTP code has been sent to your email, enter
                        the verification code here to verify your mail address
                        and continue purchasing.
                    </p>
                </div>
                <DigitalInput setNumberValue={setNumberValue} />
            </div>
            <div className="flex items-start gap-[16px] w-full">
                <Button onClick={backToInputsHandler} type="prepaidCancel" />
                <Button
                    onClick={completeHandler}
                    disabled={numberValue !== randomNumber}
                    type="prepaidDone"
                />
            </div>
        </div>
    );
}
