import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import NavBack from "../navegation/NavBack";
import Skeleton from "../loadingSkeleton/D&UOrders";
import DetailOrderTest from "./DetailOrderTest";
import { Modal } from "../modal";
import DeleteModal from "../modal/DeleteModal";
import { getOrderByOrderNumber } from "../../services/getOrderByOrderNumber";
import { deleteOrder, updatingOrder } from "../../hooks";

const DetailOrder = () => {
  const { orderNumber } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdateOrdersModal, setIsOpenUpdateOrdersModal] = useState(false);
  const queryClient = useQueryClient();

  // Consulta para obtener la orden
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => getOrderByOrderNumber(orderNumber),
    refetchOnMount: true,
  });

  // Manejo de errores
  if (isError) {
    return <div>Ha ocurrido un error: {error.message}</div>;
  }

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    dateOfOrder: "",
    clientNumber: "",
    taskDescription: "",
    userAssignedDni: "",
    coordinated: false,
  });

  useEffect(() => {
    if (data) {
      setOrderData({
        orderNumber: data.orderNumber,
        dateOfOrder: data.dateOfOrder,
        clientNumber: data.client.clientNumber,
        taskDescription: data.taskDescription,
        userAssignedDni: data.userAssigned.dni,
        coordinated: data.coordinated,
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (updatedOrder) => updatingOrder(updatedOrder, orderNumber),
    onSuccess: () => {
      toast.success("Orden actualizada correctamente");
      handleCloseModalOrders();
      queryClient.invalidateQueries(["order", orderNumber]);
    },
    onError: () => {
      toast.error("Error al actualizar la orden");
    },
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    const body = { ...orderData };
    mutation.mutate(body);
  };

  const handlerCleanForm = () => {
    if (data) {
      setOrderData({
        orderNumber: data.orderNumber,
        dateOfOrder: data.dateOfOrder,
        clientNumber: data.client.clientNumber,
        taskDescription: data.taskDescription,
        userAssignedDni: data.userAssigned.dni,
        coordinated: data.coordinated,
      });
    }
  };

  const updateOrderData = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeleteOrder = async () => {
    const navigate = useNavigate();
    try {
      await deleteOrder(orderNumber);
      toast.success("Orden eliminada correctamente");
      navigate("/inicio/ordenes");
    } catch (error) {
      toast.error("Error al eliminar la orden");
    }
    closeModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOpenModalOrders = () => setIsOpenUpdateOrdersModal(true);
  const handleCloseModalOrders = () => setIsOpenUpdateOrdersModal(false);

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle de la orden:"}
        value={true}
        valueKey={isLoading ? null : data.orderNumber}
        disable={true}
      />
      {isLoading ? <Skeleton /> : <DetailOrderTest order={data} />}
      {isLoading ? null : (
        <Modal
          open={isOpenUpdateOrdersModal}
          onClose={handleCloseModalOrders}
          handlerCleanStates={handlerCleanForm}
          title={"Actualizar Orden"}
          size={"md"}
          footerChild={
            <button
              onClick={handleAddOrder}
              className="w-full lg:w-[unset] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Actualizar Orden
            </button>
          }
        >
          <form
            onSubmit={handleAddOrder}
            className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-1 pb-4 sm:text-sm sm:mt-4"
          >
            <label htmlFor="orderNumber" className="flex flex-col gap-2">
              Número de Orden:
              <input
                id="orderNumber"
                name="orderNumber"
                placeholder={data.orderNumber}
                type="text"
                required
                className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                value={orderData.orderNumber}
                onChange={updateOrderData}
              />
            </label>

            <label htmlFor="dateOfOrder" className="flex flex-col gap-2">
              Fecha de Orden:
              <input
                id="dateOfOrder"
                name="dateOfOrder"
                placeholder={data.dateOfOrder}
                type="text"
                required
                className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                value={orderData.dateOfOrder}
                onChange={updateOrderData}
              />
            </label>

            <label htmlFor="clientNumber" className="flex flex-col gap-2">
              Número de Cliente:
              <input
                id="clientNumber"
                name="clientNumber"
                placeholder={data.client.clientNumber}
                type="text"
                required
                className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                value={orderData.clientNumber}
                onChange={updateOrderData}
              />
            </label>

            <label htmlFor="userAssignedDni" className="flex flex-col gap-2">
              DNI del Usuario Asignado:
              <input
                id="userAssignedDni"
                name="userAssignedDni"
                placeholder={data.userAssigned.dni}
                type="text"
                required
                className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                value={orderData.userAssignedDni}
                onChange={updateOrderData}
              />
            </label>
            <label htmlFor="taskDescription" className="flex flex-col gap-2">
              Descripción de la Tarea:
              <textarea
                id="taskDescription"
                name="taskDescription"
                placeholder={data.taskDescription}
                rows="3"
                required
                className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-24 resize-none"
                value={orderData.taskDescription}
                onChange={updateOrderData}
              ></textarea>
            </label>

            <label
              htmlFor="coordinated"
              className="flex items-center gap-2 sm:col-span-2"
            >
              <input
                id="coordinated"
                name="coordinated"
                type="checkbox"
                className="border border-gray-300 rounded-lg p-2 sm:border-gray-400 sm:rounded-xl"
                checked={orderData.coordinated}
                onChange={updateOrderData}
              />{" "}
              Coordinado
            </label>
          </form>
        </Modal>
      )}
      <section className="flex justify-center pb-3 pt-3 mt-3">
        <button
          onClick={handleOpenModalOrders}
          className="mx-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
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
