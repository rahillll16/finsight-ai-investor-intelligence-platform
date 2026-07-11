import { compareMetric } from "../../utils/compareMetric";

function MetricComparisonCard({
    title,
    company1,
    company2,
    value1,
    value2
}) {

    const comparison = compareMetric(
        title,
        value1,
        value2
    );

    return (

        <div
            className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-6
            "
        >

            <h2 className="
                text-lg
                font-bold
                text-white
            ">

                {title}

            </h2>

            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-8
                "
            >

                <div className="text-center">

                    <p className="text-slate-400">

                        {company1}

                    </p>

                    <p
                        className={`
                            mt-3
                            text-2xl
                            font-bold
                            ${
                                comparison.winner === 1
                                ? "text-green-400"
                                : "text-red-400"
                            }
                        `}
                    >

                        {value1}

                        {" "}

                        {

                            comparison.winner === 1

                            ?

                            "🟢"

                            :

                            "🔴"

                        }

                    </p>

                </div>

                <div className="text-center">

                    <p className="text-slate-400">

                        {company2}

                    </p>

                    <p
                        className={`
                            mt-3
                            text-2xl
                            font-bold
                            ${
                                comparison.winner === 2
                                ? "text-green-400"
                                : "text-red-400"
                            }
                        `}
                    >

                        {

                            comparison.winner === 2

                            ?

                            "🟢"

                            :

                            "🔴"

                        }

                        {" "}

                        {value2}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default MetricComparisonCard;