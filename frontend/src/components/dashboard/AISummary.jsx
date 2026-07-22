import { BrainCircuit, ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

function AISummary({ insights }) {

    const outlook = insights?.outlook;

    const status =
        outlook?.rating === "Positive"
            ? {
                  icon: ShieldCheck,
                  text: "Positive",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                  border: "border-emerald-500/20"
              }
            : outlook?.rating === "Cautious"
            ? {
                  icon: ShieldAlert,
                  text: "Cautious",
                  color: "text-red-400",
                  bg: "bg-red-500/10",
                  border: "border-red-500/20"
              }
            : {
                  icon: AlertTriangle,
                  text: "Neutral",
                  color: "text-yellow-400",
                  bg: "bg-yellow-500/10",
                  border: "border-yellow-500/20"
              };

    const StatusIcon = status.icon;

    return (

        <div
            className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-8
                transition-all
                duration-300
                hover:border-orange-500/40
                hover:shadow-xl
                hover:shadow-orange-500/10
            "
        >

            {/* Header */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-orange-500/10
                    "
                >
                    <BrainCircuit
                        className="text-orange-500"
                        size={24}
                    />
                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        AI Financial Analysis

                    </h2>

                    <p className="mt-1 text-sm text-slate-400">

                        AI-generated analysis based on extracted financial metrics

                    </p>

                </div>

            </div>

            {/* Body */}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left */}

                <div
                    className={`
                        flex
                        flex-col
                        justify-between
                        rounded-2xl
                        border
                        p-8
                        min-h-[260px]
                        ${status.bg}
                        ${status.border}
                    `}
                >

                    <div className="flex justify-center">

                        <StatusIcon
                            size={34}
                            className={status.color}
                        />

                    </div>

                    <h3
                        className={`
                            mt-4
                            text-center
                            text-2xl
                            font-bold
                            ${status.color}
                        `}
                    >

                        {status.text}

                    </h3>

                    <div className="mt-8">

                    <p className="text-xs uppercase tracking-widest text-slate-400">
                        Confidence
                    </p>

                    <p className="mt-1 text-5xl font-extrabold text-white">

                            {outlook?.confidence ?? "--"}%

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div
                    className="
                        lg:col-span-2
                        self-start
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-800/40
                        p-6
                    "
                >

                    <p
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-widest
                            text-slate-500
                        "
                    >
                        Executive Summary
                    </p>

                    <p
                        className="
                            mt-4
                            text-base
                            leading-8
                            max-w-3xl
                            text-slate-300
                        "
                    >

                        {
                            insights?.summary ||
                            "Generating AI financial analysis..."
                        }

                    </p>

                </div>

            </div>

        </div>

    );

}

export default AISummary;