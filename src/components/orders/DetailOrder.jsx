import React from "react";
import { useParams } from "react-router-dom";
import { Global, BackTo } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import MapLink from "../maps/MapLink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="border-b flex py-4 px-2 mb-2">
          <Skeleton width={100} height={20} />
        </div>
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-[#d0d3d4]">
          <Skeleton width="100%" height={250} />
          <Skeleton width="60%" height={20} style={{ marginTop: "1rem" }} />
          <Skeleton width="40%" height={20} />
        </section>
      </main>
    );
  }

  if (isError) {
    return <div>Ah ocurrido un error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen">
      <div className="border-b flex py-4 px-2 mb-2">
        <button onClick={BackTo} className="ml-3">
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
        <div className="ml-9">
          <label className="font-semibold">Detalle de la orden:</label>
          <h1 className="inline-block ml-2">{data.orderNumber}</h1>
        </div>
      </div>
      <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-[#d0d3d4]">
        <div>
          <label className="font-semibold">Ubicacion:</label>
          <MapLink address={data.client.address} />
        </div>
        <div className="flex mt-2">
          <div className="flex my-0.5">
            <label>Nº Orden:</label>
            <p className="ml-2">{data.orderNumber}</p>
          </div>
          <div className="flex ml-7 my-0.5">
            <label>Fecha:</label>
            <p className="ml-2">{data.dateOfOrder}</p>
          </div>
        </div>
        <div className="flex my-0.5">
          <label>Tecnico:</label>
          <p className="ml-2">{`${data.userAssigned.firstname} ${data.userAssigned.lastname}`}</p>
        </div>
        <div className="text-center mt-3">
          <h3 className="font-semibold">Datos del Cliente</h3>
          <div className="flex">
            <div className="flex my-0.5">
              <label>Nombre:</label>
              <p className="ml-2">{`${data.client.firstname} ${data.client.lastname}`}</p>
            </div>
            <div className="flex my-0.5 ml-7">
              <label>Celular:</label>
              <p className="ml-2">{data.client.phone}</p>
            </div>
          </div>
          <div className="flex my-0.5">
            <label>Email:</label>
            {data.client.email === "" ? (
              <p className="ml-2">Sin correo electronico</p>
            ) : (
              <p className="ml-2">{data.client.email}</p>
            )}
          </div>
          <div className="flex">
            <div className="flex my-0.5">
              <label>Nº Cliente:</label>
              <p className="ml-2">{data.client.clientNumber}</p>
            </div>
            <div>
              {data.client.customer === false ? (
                <div className="flex my-0.5 ml-7">
                  <p className="ml-2">No es Abonado</p>
                </div>
              ) : (
                <div className="flex my-0.5 ml-7">
                  <label>Nº Abonado:</label>
                  <p className="ml-2">{data.client.customerNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailOrder;
