import { useEffect, useState , useRef} from "react";

import ReactMarkdown from "react-markdown";

import api from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

function Chat() {

    const [messages, setMessages] = useState([]);

    const [question, setQuestion] = useState("");

    const [company, setCompany] = useState("");

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);



    useEffect(() => {

        fetchCompanies();
    
    }, []);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    
    }, [messages]);
    
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
                    question,
                    history: messages
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
                    messages.length === 0 && (

                        <div
                            className="
                                h-full
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                                text-slate-400
                            "
                        >

                            <div className="text-6xl">
                                🤖
                            </div>

                            <h2 className="mt-4 text-xl font-semibold text-white">
                                FinSight AI
                            </h2>

                            <p className="mt-2 max-w-md">
                                Ask anything about your uploaded annual reports.
                            </p>

                            <div className="mt-6 space-y-2 text-sm">

                                <p>• Summarize Apple's financial performance</p>

                                <p>• What are Apple's biggest risks?</p>

                                <p>• Explain operating cash flow</p>

                                <p>• Compare Apple and Tesla</p>

                            </div>

                        </div>

                    )
                }

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

                                <ReactMarkdown>

                                    {message.content}

                                </ReactMarkdown>

                            </div>

                        </div>

                    ))
                }

                <div ref={messagesEndRef} />

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
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter" &&
                                    !loading
                                ) {
                                    handleSend();
                                }
                        
                            }}
                            placeholder="Ask about revenue, debt, profitability, risks..."
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
                            disabled={
                                loading ||
                                !question.trim()
                            }
                            className="
                                rounded-2xl
                                bg-orange-600
                                px-8
                                font-semibold
                                transition-all
                                hover:bg-orange-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                        {
                            loading && (

                                <div className="flex justify-start">

                                    <div
                                        className="
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            rounded-2xl
                                            px-5
                                            py-4
                                            animate-pulse
                                        "
                                    >

                                        FinSight AI is analyzing...

                                    </div>

                                </div>

                            )
                        }

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    )
}

export default Chat