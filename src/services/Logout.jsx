import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const Logout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        setAuth({});
        navigate("/");
    }, []);

    return <h1>Cerrando Sesion...</h1>;
};