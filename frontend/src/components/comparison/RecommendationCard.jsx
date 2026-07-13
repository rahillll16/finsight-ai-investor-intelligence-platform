function RecommendationCard({ insights }) {

    if (!insights)
        return null;

    const badgeColor = {

        "Strong Buy":
            "bg-green-600 text-white",

        "Buy":
            "bg-green-500 text-white",

        "Hold":
            "bg-yellow-500 text-black",

        "Avoid":
            "bg-red-500 text-white"

    };

    return (

        <div
            className="
                mb-8
                rounded-3xl
                border
                border-orange-500/20
                bg-slate-900
                p-8
            "
        >

            <h2
                className="
                    text-3xl
                    font-bold
                    text-orange-400
                "
            >

                <p className="mt-2 text-slate-400">
                    AI-generated recommendation based solely on the uploaded financial metrics.
                </p>

            </h2>

            <div
                className="
                    mt-8
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p className="text-slate-400">

                        Recommended Company

                    </p>

                    <h1
                        className="
                            mt-2
                            text-4xl
                            font-bold
                        "
                    >

                        {insights.winner}

                    </h1>

                </div>

                <span
                    className={`
                        rounded-full
                        px-6
                        py-3
                        text-xl
                        font-bold
                        font-semibold
                        ${badgeColor[insights.recommendation]}
                    `}
                >

                    {insights.recommendation}

                </span>

            </div>

            <div className="mt-8">

                <p className="text-slate-400">

                    Recommendation Confidence

                </p>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-bold
                        text-orange-400
                    "
                >

                    {insights.confidence}%

                </h2>

            </div>

            <div className="mt-8">

                <p className="text-slate-400">

                    Summary

                </p>

                <p
                    className="
                        mt-3
                        leading-7
                        text-slate-300
                    "
                >

                    {insights.summary}

                </p>

            </div>

            <div className="mt-8">

                <p className="text-slate-400">

                    Key Reasons

                </p>

                <ul
                    className="
                        mt-4
                        space-y-3
                    "
                >

                    {

                        insights.reasons.map(

                            (reason, index) => (

                                <li
                                    key={index}
                                    className="text-slate-300"
                                >

                                    ✅ {reason}

                                </li>

                            )

                        )

                    }

                </ul>

            </div>

        </div>

    );

}

export default RecommendationCard;