import {
    DollarSign,
    TrendingUp,
    Wallet,
    Landmark,
    Percent,
    FlaskConical
} from "lucide-react";

const KPI_CONFIG = {
    "Revenue": {
        icon: DollarSign,
        subtitle: "Total Company Revenue",
        border: "hover:border-emerald-500",
        iconColor: "text-emerald-400",
        badge: "bg-emerald-500/15 text-emerald-300"
    },

    "Net Income": {
        icon: TrendingUp,
        subtitle: "Company Profitability",
        border: "hover:border-sky-500",
        iconColor: "text-sky-400",
        badge: "bg-sky-500/15 text-sky-300"
    },

    "Cash Flow": {
        icon: Wallet,
        subtitle: "Operating Cash Generated",
        border: "hover:border-violet-500",
        iconColor: "text-violet-400",
        badge: "bg-violet-500/15 text-violet-300"
    },

    "Debt": {
        icon: Landmark,
        subtitle: "Outstanding Obligations",
        border: "hover:border-red-500",
        iconColor: "text-red-400",
        badge: "bg-red-500/15 text-red-300"
    },

    "Operating Margin": {
        icon: Percent,
        subtitle: "Operating Efficiency",
        border: "hover:border-amber-500",
        iconColor: "text-amber-400",
        badge: "bg-amber-500/15 text-amber-300"
    },

    "R&D Expense": {
        icon: FlaskConical,
        subtitle: "Innovation Investment",
        border: "hover:border-cyan-500",
        iconColor: "text-cyan-400",
        badge: "bg-cyan-500/15 text-cyan-300"
    }
};

function KPICard({
    title,
    value
}) {

    const item = KPI_CONFIG[title];

    const Icon = item?.icon || DollarSign;

    return (

        <div
            className={`
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                ${item?.border || "hover:border-orange-500"}
            `}
        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className={`
                            rounded-xl
                            bg-slate-800
                            p-3
                            ${item?.iconColor || "text-orange-400"}
                        `}
                    >

                        <Icon size={20} />

                    </div>

                    <div>

                        <p className="text-sm font-semibold text-slate-400">

                            {title}

                        </p>

                    </div>

                </div>

                {/* <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${item?.badge || "bg-orange-500/15 text-orange-300"}
                    `}
                >

                    Financial

                </span> */}

            </div>

            {/* Value */}

            <h2
                className="
                    mt-8
                    text-3xl
                    font-bold
                    text-white
                    break-words
                "
            >

                {value || "N/A"}

            </h2>

            {/* Subtitle */}

            <p
                className="
                    mt-2
                    text-sm
                    text-slate-500
                "
            >

                {item?.subtitle}

            </p>

            {/* Accent Line */}

            <div className="mt-6 h-1 rounded-full bg-slate-800 overflow-hidden">

                <div
                    className={`
                        h-full
                        w-full
                        rounded-full
                        ${
                            title === "Revenue"
                                ? "bg-emerald-400"
                                : title === "Net Income"
                                ? "bg-sky-400"
                                : title === "Cash Flow"
                                ? "bg-violet-400"
                                : title === "Debt"
                                ? "bg-red-400"
                                : title === "Operating Margin"
                                ? "bg-amber-400"
                                : "bg-cyan-400"
                        }
                    `}
                />

            </div>

        </div>

    );

}

export default KPICard;