function AISummary({ insights }) {

    const outlook = insights?.outlook;

    const color =
        outlook?.rating === "Positive"
            ? "text-green-400"
            : outlook?.rating === "Cautious"
                ? "text-red-400"
                : "text-yellow-400";

    return (

        <div className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-8
        ">

            <h2 className="
                text-2xl
                font-bold
            ">

                AI Summary

            </h2>

            {

                outlook && (

                    <div className="
                        mt-6
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-800/60
                        p-5
                    ">

                        <p className="text-sm text-slate-400">

                            Overall Financial Outlook

                        </p>

                        <h3
                            className={`
                                mt-2
                                text-2xl
                                font-bold
                                ${color}
                            `}
                        >

                            {outlook.rating}

                        </h3>

                        <p className="mt-2 text-slate-300">

                            Confidence: {outlook.confidence}%

                        </p>

                    </div>

                )

            }

            <p className="
                mt-8
                leading-8
                text-slate-300
            ">

                {
                    insights?.summary ||

                    "Generating AI insights..."
                }

            </p>

        </div>

    );

}

export default AISummary;