import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Global, BackTo } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import MapLink from "../maps/MapLink";

const fetchOrderByOrdernumber = async (orderNumber) => {
  try {
    const res = await fetch(`${Global.endpoints.backend}orders/${orderNumber}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Ah ocurrido un error al obtener los datos de la orden.");
  }
};

const DetailOrder = () => {
  const { orderNumber } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => fetchOrderByOrdernumber(orderNumber),
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  } else {
    console.log(data);
    return (
      <main>
        <div className="border-b flex py-4 px-2 mb-2">
          <button onClick={BackTo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div className="ml-10">
            <label className="font-semibold">Detalle de la orden:</label>
            <h1 className="inline-block ml-2">{orderNumber}</h1>
          </div>
        </div>
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-[#d0d3d4]">
          <div>
            <label className="font-semibold">Ubicacion:</label>
            <MapLink address={data.client.address} />
          </div>
        </section>
      </main>
    );
  }
};

export default DetailOrder;
