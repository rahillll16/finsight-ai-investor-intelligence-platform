import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#0f172a",
                            color: "#fff",
                            border: "1px solid #f97316"
                        },
                        success: {
                            iconTheme: {
                                primary: "#22c55e",
                                secondary: "#fff"
                            }
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#fff"
                            }
                        }
                    }}
                />

                <App />

            </AuthProvider>

        </BrowserRouter>

    </React.StrictMode>
);