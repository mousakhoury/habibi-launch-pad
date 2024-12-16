import React, { useState } from "react";
import styles from "./DataInput.module.css"; // Make sure to create this CSS file

export default function DataInput({ data, setData, type, label }) {
    return (
        <div className={styles.input_container}>
            <input
                type={type}
                id={type}
                className={styles.input_field}
                value={data}
                onChange={setData}
                placeholder="" // A space is used here to trigger :placeholder-shown
            />
            <label htmlFor={type} className={styles.input_label}>
                {label}
            </label>
        </div>
    );
}
