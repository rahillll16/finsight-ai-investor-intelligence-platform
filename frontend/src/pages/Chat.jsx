import { useEffect, useState } from "react";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

function Chat() {

    const [messages, setMessages] = useState([]);

    const [question, setQuestion] = useState("");

    const [company, setCompany] = useState("");

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        fetchCompanies();
    
    }, []);
    
    async function fetchCompanies() {
    
        try {
    
            const response = await api.get(
                "/dashboard/companies/list"
            );
    
            setCompanies(response.data);
    
            if (response.data.length > 0) {
    
                setCompany(
                    response.data[0]
                );
            }
    
        } catch (error) {
    
            console.error(error);
        }
    }

    async function handleSend() {

        if (!question.trim())
            return;
    
        const userMessage = {
            role: "user",
            content: question
        };
    
        setMessages(prev => [
            ...prev,
            userMessage
        ]);
    
        setLoading(true);
    
        try {
    
            const response = await api.post(
                "/chat",
                {
                    company,
                    question
                }
            );
    
            const aiMessage = {
                role: "assistant",
                content: response.data.answer
            };
    
            setMessages(prev => [
                ...prev,
                aiMessage
            ]);
    
        } catch (error) {
    
            setMessages(prev => [
    
                ...prev,
    
                {
                    role: "assistant",
                    content:
                        "Failed to get response."
                }
    
            ]);
    
        } finally {
    
            setLoading(false);
    
            setQuestion("");
        }
    }

    return (


        <DashboardLayout>

            <div
                className="
                    rounded-3xl
                    border
                    border-orange-900/30
                    bg-slate-900
                    p-8
                "
            >

                <h1 className="text-4xl font-bold">

                    AI Financial Chat

                </h1>

                <p className="mt-3 text-slate-400">

                    Ask questions about uploaded annual reports.

                </p>

                <div className="mt-6">

                    <select
                        value={company}
                        onChange={(e) =>
                            setCompany(e.target.value)
                        }
                        className="
                            rounded-xl
                            border
                            border-orange-900/30
                            bg-slate-900
                            p-3
                        "
                    >

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

            </div>


            {/* Chat Container */}

            <div className="
                mt-8
                h-[600px]
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                flex
                flex-col
            ">

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        p-6
                        space-y-6
                    "
                >

                {/* Messages */}

                {
                    messages.map((message, index) => (

                        <div
                            key={index}
                            className={`
                                flex
                                ${
                                    message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }
                            `}
                        >

                            <div
                                className={`
                                    inline-block
                                    w-fit
                                    max-w-[75%]
                                    rounded-2xl
                                    px-5
                                    py-4
                                    leading-7
                                    break-words
                                    shadow-lg

                                    ${
                                        message.role === "user"
                                            ? "bg-orange-600"
                                            : "bg-slate-800 border border-slate-700"
                                    }
                                `}
                            >

                                {message.content}

                            </div>

                        </div>

                    ))
                }

                </div>

                {/* Input */}

                <div
                className="
                border-t
                border-slate-800
                p-6
                "
                >

                    <div className="
                        mt-6
                        flex
                        gap-4
                    ">

                        <input
                            value={question}
                            onChange={(e) =>
                                setQuestion(e.target.value)
                            }
                            placeholder="Ask a financial question..."
                            className="
                                flex-1
                                rounded-2xl
                                bg-slate-800
                                border
                                border-slate-700
                                px-5
                                py-4
                                outline-none
                                focus:border-orange-500
                            "
                        />

                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="
                                rounded-2xl
                                bg-orange-600
                                px-8
                                font-semibold
                                transition-all
                                hover:bg-orange-700
                            "
                        >

                            {
                                loading
                                ? "Thinking..."
                                : "Send"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    )
}

export default Chat