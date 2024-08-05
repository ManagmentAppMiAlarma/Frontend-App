import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";

const PrivateLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <h2>Cargando...</h2>;
    } else {
        return <>{false ? <Outlet /> : <Navigate to="/login" />}</>;
    }
}

export default PrivateLayout