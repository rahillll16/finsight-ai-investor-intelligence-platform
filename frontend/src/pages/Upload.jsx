import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Upload() {

    const navigate = useNavigate();

    const [company, setCompany] = useState("");

    const [year, setYear] = useState(2024);

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleUpload(e) {

        e.preventDefault();

        setError("");

        if (!company.trim() || !file) {

            setError("Please fill all fields.");

            return;
        }

        const formData = new FormData();

        formData.append("company", company);
        formData.append("year", year);
        formData.append("file", file);

        try {

            setLoading(true);

            await api.post(
                "/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Upload failed."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout>

            <div
                className="
                    max-w-2xl
                    mx-auto
                    rounded-2xl
                    bg-slate-900
                    border
                    border-orange-900/30
                    p-8
                "
            >

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-orange-500
                        mb-8
                    "
                >
                    Upload Annual Report
                </h2>

                <form
                    onSubmit={handleUpload}
                    className="space-y-6"
                >

                    {/* Company */}

                    <div>

                        <label className="block mb-2">

                            Company

                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Apple"
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                bg-slate-800
                                p-4
                                outline-none
                                border
                                border-transparent
                                focus:border-orange-500
                                transition-all
                            "
                        />

                    </div>

                    {/* Financial Year */}

                    <div>

                        <label className="block mb-2">

                            Financial Year

                        </label>

                        <input
                            type="number"
                            value={year}
                            onChange={(e) =>
                                setYear(
                                    Number(e.target.value)
                                )
                            }
                            className="
                                w-full
                                rounded-xl
                                bg-slate-800
                                p-4
                                outline-none
                                border
                                border-transparent
                                focus:border-orange-500
                                transition-all
                            "
                        />

                    </div>

                    {/* PDF Upload */}

                    <div>

                        <label className="block mb-2">

                            PDF Report

                        </label>

                        <label
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-xl
                                border
                                border-orange-900/40
                                bg-slate-800
                                p-4
                                cursor-pointer
                                hover:border-orange-500
                                hover:bg-slate-700
                                transition-all
                            "
                        >

                            <span className="text-slate-300 truncate">

                                {
                                    file
                                        ? `📄 ${file.name}`
                                        : "Choose Annual Report (.pdf)"
                                }

                            </span>

                            <span
                                className="
                                    rounded-lg
                                    bg-orange-600
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    hover:bg-orange-700
                                    transition-all
                                "
                            >
                                Browse
                            </span>

                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }
                            />

                        </label>

                        <p className="mt-2 text-sm text-slate-400">

                            Upload a company's annual report (PDF only).

                        </p>

                    </div>

                    {

                        error && (

                            <p className="text-red-400">

                                {error}

                            </p>

                        )

                    }

                    <button
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-orange-600
                            p-4
                            font-semibold
                            hover:bg-orange-700
                            disabled:opacity-50
                            transition-all
                        "
                    >

                        {

                            loading

                                ? "Uploading..."

                                : "Upload Report"

                        }

                    </button>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default Upload;