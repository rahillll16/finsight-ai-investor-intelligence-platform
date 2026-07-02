import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

    return (

        <div className="
            min-h-screen
            bg-slate-950
            text-white
        ">

            <div className="
                grid
                grid-cols-12
            ">

                <aside className="col-span-2">

                    <Sidebar />

                </aside>

                <main className="
                    col-span-10
                    p-8
                    min-h-screen
                    flex
                    flex-col
                ">

                    <Navbar />

                    <div className="mt-8 flex-1">

                        {children}

                    </div>

                    <footer className="
                        mt-12
                        border-t
                        border-orange-900/30
                        pt-6
                        text-center
                        text-sm
                        text-slate-500
                    ">

                        Built by

                        <a
                            href="https://github.com/rahillll16"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                ml-1
                                font-semibold
                                text-orange-500
                                hover:text-orange-400
                                hover:underline
                            "
                        >
                            Rahil
                        </a>

                        · NIT Kurukshetra · FinSight AI © 2026

                    </footer>

                </main>

            </div>

        </div>

    );
}

export default DashboardLayout;