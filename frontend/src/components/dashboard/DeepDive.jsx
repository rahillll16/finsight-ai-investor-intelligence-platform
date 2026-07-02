function DeepDive() {

    return (

        <div className="
            mt-8
            grid
            grid-cols-2
            gap-6
        ">

            {/* Growth Drivers */}

            <div className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-8
            ">

                <h2 className="
                    text-xl
                    font-bold
                    text-green-400
                ">

                    Growth Drivers

                </h2>

                <ul className="
                    mt-6
                    space-y-4
                    text-slate-300
                ">

                    <li>
                        • No AI insights available yet.
                    </li>

                </ul>

            </div>

            {/* Risk Factors */}

            <div className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-8
            ">

                <h2 className="
                    text-xl
                    font-bold
                    text-red-400
                ">

                    Risk Factors

                </h2>

                <ul className="
                    mt-6
                    space-y-4
                    text-slate-300
                ">

                    <li>
                        • No AI insights available yet.
                    </li>

                </ul>

            </div>

        </div>

    )
}

export default DeepDive