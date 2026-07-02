import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

function Comparison() {

    const [companies, setCompanies] = useState([]);

    const [company1, setCompany1] = useState("");

    const [company2, setCompany2] = useState("");

    const [comparisonData, setComparisonData] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchCompanies();

    }, []);


    async function fetchCompanies() {

        try {

            const response = await api.get(
                "/dashboard/companies/list"
            );

            setCompanies(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    }


    async function handleCompare() {

        if (!company1 || !company2) {

            setError(
                "Please select both companies."
            );

            return;
        }

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                `/comparison?company1=${company1}&company2=${company2}`
            );

            setComparisonData(
                response.data
            );

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Comparison failed."
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <DashboardLayout>

            <div>

                <h1 className="
                    text-4xl
                    font-bold
                ">
                    Company Comparison
                </h1>

                <p className="
                    mt-2
                    text-slate-400
                ">
                    Compare financial performance across companies.
                </p>

            </div>


            {/* Selectors */}

            <div className="
                mt-8
                grid
                grid-cols-3
                gap-6
            ">

                <select
                    value={company1}
                    onChange={(e) =>
                        setCompany1(e.target.value)
                    }
                    className="
                        rounded-xl
                        border
                        border-orange-900/40
                        bg-slate-900
                        p-4
                    "
                >

                    <option value="">
                        Select Company 1
                    </option>

                    {
                        companies.map(company => (

                            <option
                                key={company}
                                value={company}
                            >

                                {company}

                            </option>
                        ))
                    }

                </select>


                <select
                    value={company2}
                    onChange={(e) =>
                        setCompany2(e.target.value)
                    }
                    className="
                        rounded-xl
                        border
                        border-orange-900/40
                        bg-slate-900
                        p-4
                    "
                >

                    <option value="">
                        Select Company 2
                    </option>

                    {
                        companies.map(company => (

                            <option
                                key={company}
                                value={company}
                            >

                                {company}

                            </option>
                        ))
                    }

                </select>


                <button
                    onClick={handleCompare}
                    className="
                        rounded-xl
                        bg-orange-600
                        p-4
                        font-semibold
                        hover:bg-orange-700
                    "
                >

                    Compare

                </button>

            </div>


            {loading && (

                <p className="mt-8">

                    Comparing...

                </p>

            )}


            {error && (

                <p className="
                    mt-8
                    text-red-400
                ">

                    {error}

                </p>

            )}


            {
                comparisonData && (

                    <div className="
                        mt-10
                        overflow-x-auto
                    ">

                        <table className="
                            w-full
                            rounded-3xl
                            bg-slate-900
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    border-slate-800
                                ">

                                    <th className="p-4">
                                        Metric
                                    </th>

                                    <th className="p-4">
                                        {company1}
                                    </th>

                                    <th className="p-4">
                                        {company2}
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    Object.keys(
                                        comparisonData[company1]
                                    ).map(metric => (

                                        <tr
                                            key={metric}
                                            className="
                                                border-b
                                                border-slate-800
                                            "
                                        >

                                            <td className="p-4">

                                                {metric}

                                            </td>

                                            <td className="p-4">

                                                {
                                                    comparisonData[
                                                        company1
                                                    ][metric]
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    comparisonData[
                                                        company2
                                                    ][metric]
                                                }

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                )
            }

        </DashboardLayout>

    )
}

export default Comparison;