import {
    Bar
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function FinancialOverviewChart({ metrics }) {

    const data = {
        labels: [
            "Revenue",
            "Net Income",
            "Cash Flow",
            "Debt",
        ],

        datasets: [
            {
                data: [
                    metrics?.revenue?.value ?? 0,
                    metrics?.net_income?.value ?? 0,
                    metrics?.cash_flow?.value ?? 0,
                    metrics?.debt?.value ?? 0,
                ],

                backgroundColor: [
                    "#22c55e",
                    "#3b82f6",
                    "#a855f7",
                    "#ef4444",
                ],

                borderRadius: 12,

                barPercentage: 0.55,
                
                categoryPercentage: 0.65,
            },
        ],
    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        animation: {
            duration: 1200,
            easing: "easeOutQuart",
        },

        plugins: {

            legend: {
                display: false,
            },

            tooltip: {

                callbacks: {

                    label(context) {

                        const value = context.raw;
                    
                        if (value >= 1e12)
                            return `$${(value / 1e12).toFixed(2)}T`;
                    
                        if (value >= 1e9)
                            return `$${(value / 1e9).toFixed(2)}B`;
                    
                        if (value >= 1e6)
                            return `$${(value / 1e6).toFixed(2)}M`;
                    
                        return `$${value}`;
                    },
                },
            },
        },

        scales: {

            x: {

                ticks: {

                    color: "#cbd5e1",
                },

                grid: {
                    drawBorder: false,
                    color: "rgba(255,255,255,0.05)"
                }
            },

            y: {

                ticks: {

                    color: "#cbd5e1",

                    callback(value) {
                        if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
                        if (value >= 1e9) return `$${(value / 1e9).toFixed(0)}B`;
                        if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
                        return value;
                    }
                },

                grid: {
                    drawBorder: false,
                    color: "rgba(255,255,255,0.05)"
                }
            },
        },
    };

    return (

        <div
            className="
                mt-8
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-6
            "
        >

            <h2 className="text-xl font-bold text-white">

                Financial Overview

            </h2>

            <p className="mt-2 text-slate-400">

                Compare key financial metrics

            </p>

            <div className="mt-6 h-96">

                <Bar
                    data={data}
                    options={options}
                />

            </div>

        </div>

    );

}

export default FinancialOverviewChart;