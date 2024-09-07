import React from "react";
import Skeleton from "../loadingSkeleton/Orders";
import Order from "../cards/Orders";

const today = new Date();

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const ListOrders = ({ isLoading, data }) => {
  const ordersArray = isLoading ? null : Array.from(data.ordenes);

  const sortedOrders = isLoading
    ? null
    : ordersArray.sort((a, b) => {
        return (
          parseDate(a.dateOfOrder) - today - (parseDate(b.dateOfOrder) - today)
        );
      });

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Órdenes de Trabajo
      </h1>
      {isLoading ? (
        // Mostrar el Skeleton mientras se cargan los datos
        <ul>
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <Skeleton />
            </li>
          ))}
        </ul>
      ) : ordersArray.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOrders.map((order) => {
            return (
              <li key={order.id}>
                <Order order={order} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center mt-7">
          <p>No hay ordenes para ese rango de fechas.</p>
        </div>
        // Mostrar los datos cuando se hayan cargado
      )}
    </section>
  );
};

export default ListOrders;
