import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";


const PublicLayout = () => {
    const { auth } = useAuth();
    return (
        <>
            <main>{true ? <Outlet /> : <Navigate to="/dashboard" />}</main>
        </>
    );
}

export default PublicLayout