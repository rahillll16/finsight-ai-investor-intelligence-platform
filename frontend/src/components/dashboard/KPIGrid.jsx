import KPICard from "./KPICard";

function KPIGrid({ metrics }) {

    const cards = [
        {
            title: "Revenue",
            value: metrics?.revenue,
        },
        {
            title: "Net Income",
            value: metrics?.net_income,
        },
        {
            title: "Cash Flow",
            value: metrics?.cash_flow,
        },
        {
            title: "Debt",
            value: metrics?.debt,
        },
        {
            title: "Operating Margin",
            value: metrics?.operating_margin,
        },
        {
            title: "R&D Expense",
            value: metrics?.r_and_d_expense,
        }
    ];

    return (

        <div className="
            grid
            grid-cols-3
            gap-6
        ">

            {

                cards.map(card => (

                    <KPICard
                        key={card.title}
                        {...card}
                    />

                ))

            }

        </div>

    )

}

export default KPIGrid;