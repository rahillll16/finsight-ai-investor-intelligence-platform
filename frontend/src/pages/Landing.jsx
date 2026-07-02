import { Link } from "react-router-dom";

function Landing() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            {/* Navbar */}

            <nav className="
                flex
                items-center
                justify-between
                px-10
                py-6
            ">

                <h1 className="text-3xl font-bold">
                    FinSight AI
                </h1>

                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="
                            rounded-xl
                            px-5
                            py-2
                            font-medium
                            text-slate-300
                            hover:bg-slate-800
                            hover:text-white
                            transition-all
                            duration-300
                            hover:scale-105
                        "
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="
                            rounded-xl
                            bg-orange-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            hover:bg-orange-700
                            hover:shadow-lg
                            hover:shadow-orange-500/30
                            transition-all
                            duration-300
                            hover:scale-105
                        "
                    >
                        Get Started
                    </Link>

                </div>

            </nav>


            {/* Hero Section */}

            <section className="
                mx-auto
                mt-20
                max-w-7xl
                px-10
                grid
                grid-cols-2
                gap-10
                items-center
            ">

                <div>

                    <h1 className="
                        text-6xl
                        font-bold
                        leading-tight
                    ">

                        AI-Powered
                        <span className="text-orange-500">
                            {" "}Investor Intelligence
                        </span>

                    </h1>

                    <p className="
                        mt-8
                        text-xl
                        text-slate-400
                    ">

                        Analyze annual reports,
                        extract financial insights,
                        compare companies and chat
                        with your documents using AI.

                    </p>

                    <div className="
                        mt-10
                        flex
                        gap-5
                    ">

                        <Link
                            to="/register"
                            className="
                                rounded-xl
                                bg-orange-600
                                px-8
                                py-4
                                font-semibold
                                hover:bg-orange-700
                                hover:shadow-xl
                                hover:shadow-orange-500/30
                                hover:scale-105
                                transition-all
                                duration-300
                            "
                        >
                            Start Free
                        </Link>

                        <Link
                            to="/login"
                            className="
                                rounded-xl
                                border
                                border-slate-700
                                px-8
                                py-4
                                hover:bg-slate-800
                                hover:border-slate-600
                                hover:scale-105
                                transition-all
                                duration-300
                            "
                        >
                            Sign In
                        </Link>

                    </div>

                </div>


                {/* Dashboard Preview */}

                <div className="
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-8
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-orange-500
                    hover:shadow-2xl
                    hover:shadow-orange-500/10
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                    ">
                        Dashboard Preview
                    </h2>

                    <div className="
                        mt-8
                        grid
                        grid-cols-2
                        gap-4
                    ">

                        <div className="
                            rounded-2xl
                            bg-slate-800
                            p-6
                        ">
                            Revenue
                            <p className="mt-3 text-3xl font-bold">
                                $97.6B
                            </p>
                        </div>

                        <div className="
                            rounded-2xl
                            bg-slate-800
                            p-6
                        ">
                            Net Income
                            <p className="mt-3 text-3xl font-bold">
                                $7.1B
                            </p>
                        </div>

                        <div className="
                            rounded-2xl
                            bg-slate-800
                            p-6
                        ">
                            Debt
                            <p className="mt-3 text-3xl font-bold">
                                $7.9B
                            </p>
                        </div>

                        <div className="
                            rounded-2xl
                            bg-slate-800
                            p-6
                        ">
                            Margin
                            <p className="mt-3 text-3xl font-bold">
                                17.8%
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Features Section */}

            <section className="
                mx-auto
                mt-32
                max-w-7xl
                px-10
            ">

                <h2 className="
                    text-center
                    text-5xl
                    font-bold
                ">
                    Powerful AI Features
                </h2>

                <p className="
                    mt-4
                    text-center
                    text-slate-400
                ">
                    Everything you need for intelligent
                    financial analysis.
                </p>

                <div className="
                    mt-16
                    grid
                    grid-cols-3
                    gap-6
                ">

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:border-orange-500
                        hover:shadow-2xl
                        hover:shadow-orange-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            🤖 AI Financial Chat
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            Chat with annual reports using
                            advanced RAG and GPT-4o.
                        </p>

                    </div>

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        duration-300
                        hover:-translate-y-2
                        hover:border-blue-500
                        hover:shadow-2xl
                        hover:shadow-blue-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            📊 KPI Extraction
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            Automatically extract revenue,
                            profit, debt and key metrics.
                        </p>

                    </div>

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        duration-300
                        hover:-translate-y-2
                        hover:border-blue-500
                        hover:shadow-2xl
                        hover:shadow-blue-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            ⚖ Company Comparison
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            Compare multiple companies and
                            analyze financial performance.
                        </p>

                    </div>

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        duration-300
                        hover:-translate-y-2
                        hover:border-blue-500
                        hover:shadow-2xl
                        hover:shadow-blue-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            🔍 Hybrid Search
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            Combines semantic search,
                            BM25 and reranking for
                            high retrieval accuracy.
                        </p>

                    </div>

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        duration-300
                        hover:-translate-y-2
                        hover:border-blue-500
                        hover:shadow-2xl
                        hover:shadow-blue-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            🔐 Secure SaaS
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            JWT authentication with
                            HttpOnly cookies and
                            multi-tenant architecture.
                        </p>

                    </div>

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-8
                        duration-300
                        hover:-translate-y-2
                        hover:border-blue-500
                        hover:shadow-2xl
                        hover:shadow-blue-500/10
                    ">

                        <h3 className="text-2xl font-bold">
                            📁 Annual Report Analysis
                        </h3>

                        <p className="
                            mt-4
                            text-slate-400
                        ">
                            Upload annual reports and
                            instantly generate insights.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );
}

export default Landing;