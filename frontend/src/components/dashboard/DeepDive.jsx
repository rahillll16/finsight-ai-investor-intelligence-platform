function DeepDive({ insights }) {

    return (

        <div className="
            mt-8
            grid
            grid-cols-2
            gap-6
        ">

            {/* Strengths */}

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

                    Strengths

                </h2>

                <ul className="
                    mt-6
                    space-y-4
                    text-slate-300
                ">

                    {

                        insights?.strengths?.map(
                            (item, index) => (

                                <li key={index}>

                                    ✅ {item}

                                </li>

                            )
                        )

                    }

                </ul>

            </div>

            {/* Risks */}

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

                    Risks

                </h2>

                <ul className="
                    mt-6
                    space-y-4
                    text-slate-300
                ">

                    {

                        insights?.risks?.map(
                            (item, index) => (

                                <li key={index}>

                                    ⚠️ {item}

                                </li>

                            )
                        )

                    }

                </ul>

            </div>

        </div>

    )

}

export default DeepDive;