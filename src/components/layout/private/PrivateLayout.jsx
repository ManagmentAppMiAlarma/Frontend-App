import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const PrivateLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <h2>Cargando...</h2>;
    } else {
        return <>
            <Header role={auth.role} />
            {auth.id ? <Outlet /> : <Navigate to="/login" />}
            <Footer />
        </>;
    }
}

export default PrivateLayout