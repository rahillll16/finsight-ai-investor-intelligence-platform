import KPICard from "./KPICard";

function KPIGrid({ metrics }) {

    const cards = [
        {
            title: "Revenue",
            value: metrics?.revenue?.display,
        },
        {
            title: "Net Income",
            value: metrics?.net_income?.display,
        },
        {
            title: "Cash Flow",
            value: metrics?.cash_flow?.display,
        },
        {
            title: "Debt",
            value: metrics?.debt?.display,
        },
        {
            title: "Operating Margin",
            value: metrics?.operating_margin?.display,
        },
        {
            title: "R&D Expense",
            value: metrics?.r_and_d_expense?.display,
        }
    ];

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
            "
        >
    
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