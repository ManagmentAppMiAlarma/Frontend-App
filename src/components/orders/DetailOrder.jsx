import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import MapLink from "../maps/MapLink";
import Skeleton from "../loadingSkeleton/D&UOrders";
import "react-loading-skeleton/dist/skeleton.css";
import NavBack from "../navegation/NavBack";
import { useAuth } from "../../hooks/useAuth";
import DeleteModal from "../modal/DeleteModal";
import { deleteOrder } from "../../hooks";
import { getOrderByOrderNumber } from "../../services/getOrderByOrderNumber";
import DetailOrderTest from "./DetailOrderTest";

const DetailOrder = () => {
  const { orderNumber } = useParams();
  const { auth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteOrder = async () => {
    deleteOrder(orderNumber);
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderByOrderNumber(orderNumber),
    refetchOnMount: true,
  });

  if (isError) {
    return <div>Ah ocurrido un error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle de la orden:"}
        value={true}
        valueKey={isLoading ? null : data.orderNumber}
        disable={true}
      />
      {isLoading ? <Skeleton /> : <DetailOrderTest order={data} />}
      <section className="flex justify-center pb-3 pt-3 mt-3">
        <button className="mx-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Actualizar
        </button>
        <button
          onClick={openModal}
          className="mx-4 px-3 py-2 bg-red-600 text-sm font-semibold text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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
    </main>
  );
};

export default DetailOrder;
