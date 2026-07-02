import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {

        await logout();
    
        navigate("/login");
    }

    return (

        <div className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-orange-900/30
            bg-slate-900
            p-6
        ">

        <div>

            <h2 className="
                text-3xl
                font-bold
            ">

                Welcome back
                {user ? `, ${user.username}` : ""}

            </h2>

            <p className="
                mt-1
                text-slate-400
            ">
                Analyze and compare company performance.
            </p>

            </div>

            <div className="
                flex
                items-center
                gap-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    p-2
                    hover:bg-orange-500/10
                    transition-all
                    duration-300
                ">

                    <div className="
                        h-12
                        w-12
                        rounded-full
                        bg-orange-600
                        shadow-lg
                        shadow-orange-500/20
                        flex
                        items-center
                        justify-center
                        text-lg
                        font-bold
                    ">

                        {user?.username?.[0]?.toUpperCase()}

                    </div>

                    <div>

                        <p className="font-semibold">
                            {user?.username}
                        </p>

                        <p className="text-sm text-slate-400">
                            Investor
                        </p>

                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        font-medium
                        hover:bg-red-700
                        transition-all
                        duration-300
                    "
                >

                    Logout

                </button>

            </div>

        </div>

    )
}

export default Navbar