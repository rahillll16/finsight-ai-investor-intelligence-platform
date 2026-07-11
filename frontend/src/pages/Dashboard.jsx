import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import KPIGrid from "../components/dashboard/KPIGrid";

import AISummary from "../components/dashboard/AISummary";

import DeepDive from "../components/dashboard/DeepDive";

function Dashboard() {

    const [metrics, setMetrics] = useState(null);

    const [company, setCompany] = useState("");

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [insights, setInsights] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchCompanies();
    
    }, []);

    useEffect(() => {
        
        if (company) {

            fetchDashboardData();
        }

    }, [company]);

    async function fetchCompanies() {

        try {
    
            const response = await api.get(
                "/dashboard/companies/list"
            );
    
            setCompanies(
                response.data
            );
    
            if (
                response.data.length > 0 &&
                !company
            ) {
    
                setCompany(
                    response.data[0]
                );
            }
    
        } catch (error) {
    
            console.error(error);
        }
    }


    async function fetchDashboardData() {

        try {

            setLoading(true);

            const [dashboardResponse, insightsResponse] = await Promise.all([
                api.get(`/dashboard/${company}`),
                api.get(`/dashboard/${company}/insights`)
            ]);
            
            setMetrics(dashboardResponse.data);
            setInsights(insightsResponse.data);

        } catch (error) {

            setError(
                error.response?.data?.detail ||
                "Failed to load dashboard."
            );

        } finally {

            setLoading(false);
        }
    }


    if (loading) {

        return (

            <DashboardLayout>

                <p>Loading dashboard...</p>

            </DashboardLayout>
        )
    }


    if (error) {

        return (

            <DashboardLayout>

                <p className="text-red-400">

                    {error}

                </p>

            </DashboardLayout>
        )
    }


    return (

        <DashboardLayout>

            {/* Company Selector */}

            <div className="mb-8">

                <select
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                    className="
                        rounded-xl
                        bg-slate-900
                        border
                        border-orange-900/40
                        p-3
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-orange-500
                        focus:border-orange-500
                        focus:ring-2
                        focus:ring-orange-500/20
                    "
                >
                    {
                        companies.map((company) => (

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


            {/* KPI Grid */}

            <KPIGrid metrics={metrics} />

            <div className="mt-8">

                <AISummary
                    insights={insights}
                />

                <DeepDive
                    insights={insights}
                />

            </div>

        </DashboardLayout>

        

    )
}

export default Dashboard