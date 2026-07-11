import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="
            h-screen
            rounded-r-2xl
            bg-slate-900
            p-6
            border-r
            border-orange-900/30
        ">

            {/* Logo */}

            <h1 className="
                text-3xl
                font-bold
                text-orange-500
                drop-shadow-lg
            ">
                FinSight AI
            </h1>

            {/* Upload Button */}

            <Link
                to="/upload"
                className="
                    mt-8
                    w-full
                    rounded-xl
                    bg-orange-600
                    p-4
                    font-medium
                    text-center
                    hover:bg-orange-700
                    hover:shadow-lg
                    hover:shadow-orange-500/30
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                    block
                "
            >
                ⬆️ Upload Report
            </Link>

            {/* Navigation */}

            <div className="
                mt-10
                flex
                flex-col
                gap-2
            ">

                <Link
                    to="/dashboard"
                    className="
                        rounded-xl
                        p-4
                        hover:bg-orange-500/10
                        hover:text-orange-400
                        transition-all
                        duration-300
                    "
                >
                    📊 Dashboard
                </Link>

                <Link
                    to="/comparison"
                    className="
                        rounded-xl
                        p-4
                        hover:bg-orange-500/10
                        hover:text-orange-400
                        transition-all
                        duration-300
                    "
                >
                    ⚖️ Comparison
                </Link>

                <Link
                    to="/chat"
                    className="
                        rounded-xl
                        p-4
                        hover:bg-orange-500/10
                        hover:text-orange-400
                        transition-all
                        duration-300
                    "
                >
                    🤖 AI Chat
                </Link>

            </div>

        </div>

    )
}

export default Sidebar