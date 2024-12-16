import React, { useState, createRef, useEffect } from "react";
import styles from "./DigitalInput.module.css";

export default function DigitalInput({ setNumberValue }) {
    const inputRefs = Array(6)
        .fill()
        .map(() => createRef());
    const [inputValues, setInputValues] = useState(Array(6).fill(""));

    useEffect(() => {
        // If all inputs have values, set the concatenated number
        if (inputValues.every((value) => value.trim() !== "")) {
            setNumberValue(inputValues.join(""));
        }
    }, [inputValues]);

    const handleChange = (index, value) => {
        const newValues = [...inputValues];
        newValues[index] = value.replace(/[^0-9]/g, "").slice(0, 1);
        setInputValues(newValues);

        if (newValues[index] && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    return (
        <div className={styles.digitalInputContainer}>
            {inputValues.map((value, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    type="tel"
                    className={styles.digitalInputSegment}
                    placeholder=" "
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === "Backspace" && index > 0) {
                            inputRefs[index - 1].current.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
}
