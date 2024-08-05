import React, { createContext, useReducer, useEffect } from "react";
import { Global } from "../helpers/Global";

export const GlobalContext = createContext();

const initialState = {
    clients: [],
    loading: true
}

export const GlobalProvider = ({ children }) => {
    useEffect(() => {
        fetchClients();
    }, []);

    async function fetchClients() {
        try {
            const resClients = await fetch(
                `${Global.endpoints.backend}clients`
            );
            const jsonDataClients = await resClients.json();
            dispatch({ type: Global.actionType.SET_CLIENTS, payload: jsonDataClients.content });
            dispatch({ type: Global.actionType.SET_LOADING, payload: false });
        } catch (error) {
            console.error("Error al cargar datos del servidor:", error);
        }
    }

    function globalReducer(state, action) {
        switch (action.type) {
            case Global.actionType.SET_CLIENTS:
                return { ...state, clients: action.payload };
            case Global.actionType.SET_LOADING:
                return { ...state, loading: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <GlobalContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};