function ComparisonCard({
    title,
    value1,
    value2,
    company1,
    company2
}) {

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

            <h3
                className="
                    text-lg
                    font-semibold
                    text-white
                "
            >

                {title}

            </h3>

            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-8
                "
            >

                <div>

                    <p className="text-sm text-slate-400">

                        {company1}

                    </p>

                    <p className="mt-2 text-2xl font-bold">

                        {value1 || "N/A"}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-400">

                        {company2}

                    </p>

                    <p className="mt-2 text-2xl font-bold">

                        {value2 || "N/A"}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ComparisonCard;