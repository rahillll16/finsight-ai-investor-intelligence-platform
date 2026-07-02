import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return <div>Loading...</div>;
    }

    if (user) {

        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default GuestRoute;