import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await api.post(
                "/auth/register",
                formData
            );

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    }

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-950
            px-4
        ">

            <div className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-orange-900/30
                bg-slate-900
                p-8
            ">

                <h1 className="
                    text-center
                    text-4xl
                    font-bold
                    text-white
                ">
                    Create Account
                </h1>

                <p className="
                    mt-2
                    text-center
                    text-slate-400
                ">
                    Join FinSight AI
                </p>

                {error && (

                    <div className="
                        mt-6
                        rounded-xl
                        bg-red-500/10
                        p-3
                        text-sm
                        text-red-400
                    ">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            bg-slate-800
                            border
                            border-transparent
                            p-4
                            text-white
                            outline-none
                            transition-all
                            duration-300
                            focus:border-orange-500
                            focus:ring-2
                            focus:ring-orange-500/20
                        "
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            bg-slate-800
                            border
                            border-transparent
                            p-4
                            text-white
                            outline-none
                            transition-all
                            duration-300
                            focus:border-orange-500
                            focus:ring-2
                            focus:ring-orange-500/20
                        "
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-xl
                            bg-slate-800
                            border
                            border-transparent
                            p-4
                            text-white
                            outline-none
                            transition-all
                            duration-300
                            focus:border-orange-500
                            focus:ring-2
                            focus:ring-orange-500/20
                        "
                    />

                    <button
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-orange-600
                            p-4
                            font-semibold
                            text-white
                            transition-all
                            duration-300
                            hover:bg-orange-700
                            hover:shadow-lg
                            hover:shadow-orange-500/30
                            hover:scale-[1.02]
                        "
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"}

                    </button>

                </form>

                <p className="
                    mt-6
                    text-center
                    text-slate-400
                ">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            ml-2
                            text-orange-400
                            hover:text-orange-300
                            transition-colors
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;