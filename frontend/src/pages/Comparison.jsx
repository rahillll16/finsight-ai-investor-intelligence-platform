import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import ComparisonCard from "../components/comparison/ComparisonCard";
import MetricComparisonCard from "../components/comparison/MetricComparisonCard";
import RecommendationCard from "../components/comparison/RecommendationCard";

function Comparison() {

    const [companies, setCompanies] = useState([]);

    const [company1, setCompany1] = useState("");

    const [company2, setCompany2] = useState("");

    const [comparisonData, setComparisonData] = useState(null);

    const [comparisonInsights, setComparisonInsights] = useState(null);

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

            const insightsResponse = await api.get(
                `/comparison/insights?company1=${company1}&company2=${company2}`
            );
            
            setComparisonInsights(
                insightsResponse.data
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


            {/* Comparison Controls */}

            <div
                className="
                    mt-8
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-8
                "
            >

                <div
                    className="
                        grid
                        grid-cols-3
                        gap-6
                        items-center
                    "
                >

                    {/* Company 1 */}

                    <select
                        value={company1}
                        onChange={(e) =>
                            setCompany1(e.target.value)
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800
                            p-4
                            text-white
                            outline-none
                            transition-all
                            hover:border-orange-500
                            focus:border-orange-500
                        "
                    >

                        <option value="">
                            Select Company
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

                    {/* VS */}

                    <div
                        className="
                            flex
                            justify-center
                        "
                    >

                        <div
                            className="
                                rounded-full
                                bg-orange-500/20
                                px-6
                                py-3
                                text-xl
                                font-bold
                                text-orange-400
                            "
                        >

                            VS

                        </div>

                    </div>

                    {/* Company 2 */}

                    <select
                        value={company2}
                        onChange={(e) =>
                            setCompany2(e.target.value)
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-800
                            p-4
                            text-white
                            outline-none
                            transition-all
                            hover:border-orange-500
                            focus:border-orange-500
                        "
                    >

                        <option value="">
                            Select Company
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

                </div>

                <button
                    onClick={handleCompare}
                    className="
                        mt-8
                        w-full
                        rounded-2xl
                        bg-orange-600
                        p-4
                        text-lg
                        font-semibold
                        transition-all
                        hover:bg-orange-700
                        hover:shadow-lg
                        hover:shadow-orange-500/20
                    "
                >

                    Compare Companies

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

                    <div
                        className="
                            mt-10
                            space-y-6
                        "
                    >
                        {
                            comparisonInsights && (

                                <RecommendationCard

                                    insights={comparisonInsights}

                                />

                            )
                        }

                        {

                            Object.keys(
                                comparisonData[company1]
                            ).map(metric => (

                                <MetricComparisonCard

                                    key={metric}

                                    title={metric}

                                    company1={company1}

                                    company2={company2}

                                    value1={
                                        comparisonData[
                                            company1
                                        ][metric]
                                    }

                                    value2={
                                        comparisonData[
                                            company2
                                        ][metric]
                                    }

                                />

                            ))

                        }

                    </div>

                )
            }

        </DashboardLayout>

    )
}

export default Comparison;