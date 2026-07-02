import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchCurrentUser() {

        try {

            const response = await api.get("/auth/me");

            setUser(response.data);

        } catch (error) {

            setUser(null);

        } finally {

            setLoading(false);
        }
    }

    async function logout() {

        try {
    
            await api.post(
                "/auth/logout"
            );
    
        } catch (error) {
    
            console.error(error);
        }
    
        setUser(null);
    }

    useEffect(() => {

        fetchCurrentUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                fetchCurrentUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>


    );
}

export function useAuth() {

    return useContext(AuthContext);
}