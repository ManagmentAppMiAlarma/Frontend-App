import React, { createContext, useReducer, useEffect } from "react";
import { Global } from "../helpers/Global";

export const GlobalContext = createContext();

const initialState = {
  clients: [],
  orders: [],
  clientsLoading: true,
  ordersLoading: true,
};

export const GlobalProvider = ({ children }) => {
  useEffect(() => {
    getClients();
    getOrders();
  }, []);

  async function getClients() {
    try {
      const res = await fetch(`${Global.endpoints.backend}clients`);

      if (res.status !== 200) {
        console.log(`Error: ${res.statusText}`);
      }

      const data = await res.json();

      dispatch({ type: Global.actionType.SET_CLIENTS, payload: data.data });
      dispatch({ type: Global.actionType.SET_CLIENTS_LOADING, payload: false });
    } catch (err) {
      console.error("Error al cargar datos de los clientes: ", err);
    }
  }

  async function getOrders() {
    try {
      const res = await fetch(`${Global.endpoints.backend}orders`);

      if (res.status !== 200) {
        console.log(`Error: ${res.statusText}`);
      }

      const data = await res.json();

      dispatch({ type: Global.actionType.SET_ORDERS, payload: data.data });
      dispatch({ type: Global.actionType.SET_ORDERS_LOADING, payload: false });
    } catch (err) {
      console.error("Error al cargar datos de las ordenes: ", err);
    }
  }

  function globalReducer(state, action) {
    switch (action.type) {
      case Global.actionType.SET_CLIENTS:
        return { ...state, clients: action.payload };
      case Global.actionType.SET_CLIENTS_LOADING:
        return { ...state, clientsLoading: action.payload };
      case Global.actionType.SET_ORDERS:
        return { ...state, orders: action.payload };
      case Global.actionType.SET_ORDERS_LOADING:
        return { ...state, ordersLoading: action.payload };
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
