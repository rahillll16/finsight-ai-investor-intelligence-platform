import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import KPIGrid from "../components/dashboard/KPIGrid";

import AISummary from "../components/dashboard/AISummary";

import DeepDive from "../components/dashboard/DeepDive";

import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import ConfirmationModal from "../components/common/ConfirmationModal";

function Dashboard() {

    const navigate = useNavigate();

    const [metrics, setMetrics] = useState(null);

    const [company, setCompany] = useState("");

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [insights, setInsights] = useState(null);

    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    
            setCompanies(response.data);
    
            if (response.data.length > 0) {
    
                setCompany(response.data[0]);
    
            } else {
    
                setLoading(false);
    
            }
    
        } catch (error) {
    
            console.error(error);
            setLoading(false);
    
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

    async function handleDeleteReport() {

        if (!metrics) return;
    
        try {
    
            await api.delete(
                `/reports/${company}/${metrics.year}`
            );
    
            const response = await api.get(
                "/dashboard/companies/list"
            );
    
            const updatedCompanies = response.data;
    
            setCompanies(updatedCompanies);
    
            if (updatedCompanies.length > 0) {
    
                setCompany(updatedCompanies[0]);
    
            } else {
    
                setCompany("");
                setMetrics(null);
                setInsights(null);
            }

            toast.success("Report deleted successfully.");
    
        } catch (error) {
    
            toast.error(
                error.response?.data?.detail ||
                "Failed to delete report."
            );
        }
    }


    if (loading) {

        return (
    
            <DashboardLayout>
    
                <DashboardSkeleton />
    
            </DashboardLayout>
    
        );
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

    if (!loading && companies.length === 0) {

        return (
    
            <DashboardLayout>
    
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        h-[70vh]
                        text-center
                    "
                >
    
                    <div className="text-7xl mb-6">
                        📄
                    </div>
    
                    <h2 className="text-3xl font-bold text-white">
                        No Reports Uploaded
                    </h2>
    
                    <p className="mt-3 max-w-lg text-gray-400">
                        Upload your first annual report to unlock AI-powered
                        financial analysis, KPI extraction, company insights,
                        and interactive financial chat.
                    </p>
    
                    <button
                        onClick={() => navigate("/upload")}
                        className="
                            mt-8
                            px-6
                            py-3
                            rounded-xl
                            bg-orange-500
                            hover:bg-orange-600
                            transition-colors
                            text-white
                            font-semibold
                        "
                    >
                        Upload Your First Report
                    </button>
    
                </div>
    
            </DashboardLayout>
    
        );
    }


    return (

        <DashboardLayout>

            {/* Company Selector */}

            <div className="mb-8 flex items-center gap-4">

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

                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="
                        px-4
                        py-3
                        rounded-xl
                        bg-red-600
                        hover:bg-red-700
                        transition-colors
                        duration-300
                        text-white
                    "
                >
                    🗑 Delete Report
                </button>

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

            <ConfirmationModal
                isOpen={showDeleteModal}
                title="Delete Report"
                message={`Are you sure you want to delete ${company} (${metrics?.year})? This action cannot be undone.`}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={async () => {
                    setShowDeleteModal(false);
                    await handleDeleteReport();
                }}
            />

        </DashboardLayout>

        

    )
}

export default Dashboard