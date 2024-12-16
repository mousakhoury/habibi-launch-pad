import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import styles from "./TokenomicsChart.module.css";

export default function TokenomicsChart({ chart }) {
    // const chartArray = JSON.parse(chart);
    const chartData = chart;
    const [activeSegment, setActiveSegment] = useState(0); // Start with the first segment selected

    const data = {
        labels: chartData.map((item) => item.name),
        datasets: [
            {
                data: chartData.map((item) => parseFloat(item.percentage)),
                backgroundColor: chartData.map((item) => item.color),
                hoverOffset: 4,
            },
        ],
    };
    const options = {
        responsive: true,
        cutout: "75%",
        plugins: {
            legend: {
                display: false, // Turn off the default legend
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
        },
        onClick: (event, elements, chart) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setActiveSegment(index);
            } else {
                setActiveSegment(null);
            }
        },
    };

    // Calculate the percentage for the initial active segment
    const calculatePercentage = (value, total) => {
        return ((value / total) * 100).toFixed(2) + "%";
    };

    // Calculate total for percentage calculation
    const total = data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

    // Get the percentage for the active segment
    const activeSegmentPercentage =
        activeSegment !== null
            ? calculatePercentage(data.datasets[0].data[activeSegment], total)
            : "";

    // Custom legend items rendered from the chart data with percentages
    const legendItems = data.labels.map((label, index) => {
        const value = data.datasets[0].data[index];
        const percentage = calculatePercentage(value, total);
        return (
            <li key={label} className={styles.legend_item}>
                <span
                    className={styles.legend_color_box}
                    style={{
                        backgroundColor:
                            data.datasets[0].backgroundColor[index],
                    }}
                ></span>
                <p className="w-full">
                    {label} <b>({percentage})</b>
                </p>
            </li>
        );
    });

    return (
        <div className={styles.mtd_charts}>
            <div className={styles.chart_container}>
                <Doughnut data={data} options={options} />
                {activeSegment !== null && (
                    <div className={styles.center_percentage}>
                        <p>{data.labels[activeSegment]}</p>

                        <span>{activeSegmentPercentage}</span>
                    </div>
                )}
            </div>
            <ul className={styles.chart_legend}>{legendItems}</ul>
        </div>
    );
}
