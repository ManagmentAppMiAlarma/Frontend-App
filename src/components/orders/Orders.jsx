import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const Orders = () => {
  const { orders, ordersLoading } = useGlobalContext();

  return (
    <>
      <div>header</div>
      <main>{ordersLoading ? <div>Cargando...</div> : <div></div>}</main>
    </>
  );
};

export default Orders;
