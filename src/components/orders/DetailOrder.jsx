import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import MapLink from "../maps/MapLink";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NavBack from "../navegation/NavBack";
import { useAuth } from "../../hooks/useAuth";
import DeleteModal from "../modal/DeleteModal";
import { deleteOrder } from "../../hooks";

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
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteOrder = async () => {
    const res = deleteOrder(orderNumber);
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
      <NavBack
        text={"Detalle de la orden:"}
        value={true}
        valueKey={data.orderNumber}
      />
      <section className="border-b mb-3 flex justify-around pb-3 pt-3">
        <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Actualizar
        </button>
        <button
          onClick={openModal}
          className="px-3 py-2 bg-red-600 text-sm font-semibold text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Eliminar Orden
        </button>
        <DeleteModal
          handleDelete={handleDeleteOrder}
          title="Eliminar Orden"
          text={`¿Estás seguro de que deseas eliminar la orden ${orderNumber}? Esta acción no se puede deshacer.`}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </section>
      <section className="border rounded-2xl px-4 py-2 mb-3 mx-3 bg-slate-300">
        <div>
          <label className="font-semibold">Ubicacion:</label>
          <MapLink address={data.client.address} />
        </div>
        <div className="flex mt-2">
          <div className="flex my-0.5">
            <label className="font-semibold">Nº Orden:</label>
            <p className="ml-2">{data.orderNumber}</p>
          </div>
          <div className="flex ml-7 my-0.5">
            <label className="font-semibold">Fecha:</label>
            <p className="ml-2">{data.dateOfOrder}</p>
          </div>
        </div>
        <div className="flex my-1">
          <label className="font-semibold">Tecnico:</label>
          <p className="ml-2">{`${data.userAssigned.firstname} ${data.userAssigned.lastname}`}</p>
        </div>
        <div className="text-center mt-3">
          <h3 className="font-semibold">Datos del Cliente</h3>
          <div className="flex my-0.5">
            <label className="font-semibold">Nombre:</label>
            <p className="ml-2">{`${data.client.firstname} ${data.client.lastname}`}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">Celular:</label>
            <p className="ml-2">{data.client.phone}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">Email:</label>
            {data.client.email === "" ? (
              <p className="ml-2">Sin correo electronico</p>
            ) : (
              <p className="ml-2">{data.client.email}</p>
            )}
          </div>
          <div className="flex">
            <div className="flex my-0.5">
              <label className="font-semibold">Nº Cliente:</label>
              <p className="ml-2">{data.client.clientNumber}</p>
            </div>
            <div>
              {data.client.customer === false ? (
                <div className="flex my-0.5 ml-7">
                  <p className="ml-2">No es Abonado</p>
                </div>
              ) : (
                <div className="flex my-0.5 ml-7">
                  <label className="font-semibold">Nº Abonado:</label>
                  <p className="ml-2">{data.client.customerNumber}</p>
                </div>
              )}
            </div>
          </div>
          {data.serviceDetails !== null ? (
            <div className="text-center mt-3">
              <h3 className="font-semibold">Descripcion:</h3>
              <div>{data.serviceDetails.description}</div>
            </div>
          ) : null}
        </div>
      </section>
      {data.serviceDetails !== null ? (
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
          <div className="text-center">
            <h3 className="font-semibold">Tareas realizadas:</h3>
            <div>{data.serviceDetails.taskDone}</div>
          </div>
          <div className="text-center mt-3">
            <h3 className="font-semibold">Recibe:</h3>
            <div className="flex my-0.5">
              <label className="font-semibold">Nombre y Apellido:</label>
              <p className="ml-2">{`${data.serviceDetails.firstname} ${data.serviceDetails.lastname}`}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">C.I.:</label>
              <p className="ml-2">{data.serviceDetails.dni}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Celular:</label>
              <p className="ml-2">{data.serviceDetails.phone}</p>
            </div>
            <div className="flex my-0.5 relative left-56">
              <label className="font-semibold">Finalizado:</label>
              <p className="ml-2">
                {data.serviceDetails.completed ? "Si" : "No"}
              </p>
            </div>
          </div>
        </section>
      ) : null}
      {data.serviceDetailsPayment !== null ? (
        auth.role == "admin" || auth.role == "owner" ? (
          <section className="hidden sm-block border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
            <div className="text-center">
              <h3 className="font-semibold">Detalles de Pago</h3>
            </div>
            <div className="mt-3">
              <div className="my-1">
                <div className="flex">
                  <label className="font-semibold">Facturar:</label>
                  <p className="ml-2">
                    {data.serviceDetailsPayment.invoiceDone ? "Si" : "No"}
                  </p>
                  <p className="ml-24 font-semibold">N Factura: -</p>
                </div>
                <p>
                  <span className="font-semibold">Moneda: </span>
                  {data.serviceDetailsPayment.paymentMethod}
                </p>
              </div>
              <div className="my-1">
                <div className="flex">
                  <label className="font-semibold">Ingreso del pago:</label>
                  <p className="ml-2">
                    {data.serviceDetailsPayment.paymentReceiptDone
                      ? "Si"
                      : "No"}
                  </p>
                </div>
                <div className="flex">
                  <label className="font-semibold">
                    Informacion sobre el pago:
                  </label>
                  <p className="ml-2">
                    {data.serviceDetailsPayment.paymentReceiptComments}
                  </p>
                </div>
                <div className="flex my-1">
                  <label className="font-semibold">Recibo emitido:</label>
                  <p className="ml-2">
                    {data.serviceDetails.completed ? "Si" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null
      ) : null}
    </main>
  );
};

export default DetailOrder;
