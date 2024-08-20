import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";

const fetchOrdersByDate = async (startDate, endDate) => {
  const response = await fetch(
    `${Global.endpoints.backend}orders/${startDate}/${endDate}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    ordenes: data,
  };
};

const formatDate = (date) => {
  if (!date) return ""; // Manejar el caso en que la fecha sea null o undefined
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Orders = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Usar useQuery con la nueva forma de pasar los argumentos
  const { isPending, isError, isSuccess, data, error } = useQuery({
    queryKey: ["orders", formatDate(startDate), formatDate(endDate)],
    queryFn: () =>
      fetchOrdersByDate(formatDate(startDate), formatDate(endDate)),
    enabled: !!startDate && !!endDate, // Solo fetch cuando ambas fechas están definidas
  });

  return (
    <main className="min-h-screen">
      <div className="flex justify-center mt-6">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat={"dd/MM/yyyy"}
          className="py-1 px-4 rounded-lg w-32 border mx-2"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat={"dd/MM/yyyy"}
          className="py-1 px-4 rounded-lg w-32 border mx-2"
        />
      </div>
      {isError ? (
        <div>Ah ocurrido un error: {error.message}</div>
      ) : isPending ? (
        <div>Cargando...</div>
      ) : data.ordenes.length > 0 ? (
        <ul className="mt-4">
          {data.ordenes.map((order) => {
            return (
              <Link to={`ordenes/${order.orderNumber}`} key={order.id}>
                <article className="border rounded-2xl px-4 py-2 my-3 mx-6 bg-[#d0d3d4]">
                  <div className="mb-1">
                    <label className="font-bold">Numero de orden:</label>
                    <p className="inline-block ml-2">{order.orderNumber}</p>
                  </div>
                  <div className="mb-1">
                    <label className="font-bold">Tarea:</label>
                    <p className="inline-block ml-2">{order.taskDescription}</p>
                  </div>
                  <div className="mb-1">
                    <label className="font-bold">Direccion:</label>
                    <p className="inline-block ml-2">{order.client.address}</p>
                  </div>
                  <div className="mb-1">
                    <label className="font-bold">Tecnico asignado:</label>
                    <p className="inline-block ml-2">{`${order.userAssigned.firstname} ${order.userAssigned.lastname}`}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </ul>
      ) : (
        <div>No hay ordenes para ese rango de fechas.</div>
      )}
    </main>
  );
};

export default Orders;
