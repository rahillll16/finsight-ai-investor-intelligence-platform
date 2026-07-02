function KPICard({
    title,
    value
}) {

    return (

        <div className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-6
            transition-all
            duration-300
            hover:border-blue-500
            hover:-translate-y-1
        ">

            <p className="
                text-sm
                uppercase
                text-slate-400
            ">

                {title}

            </p>

            <h2 className="
                mt-4
                text-3xl
                font-bold
                break-words
            ">

                {value || "N/A"}

            </h2>

        </div>

    )
}

export default KPICard