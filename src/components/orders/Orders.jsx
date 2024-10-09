import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Global } from "../../helpers/Global";
import "react-loading-skeleton/dist/skeleton.css";
import ListOrders from "../listAndTable/ListOrders";
import NavBack from "../navegation/NavBack";
import { updateOrders } from "../../hooks";
import { Modal } from "../modal";
import { toast } from "react-toastify";

const fetchOrdersByDate = async (startDate, endDate) => {
  const response = await fetch(
    `${Global.endpoints.backend}orders/${startDate}/${endDate}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

const formatDate = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Orders = () => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpenCreateOrdersModal, setIsOpenCreateOrdersModal] = useState(false);
  const [orderData, setOrderData] = useState({
    orderNumber: "",
    dateOfOrder: "",
    clientNumber: "",
    taskDescription: "",
    userAssignedDni: "",
    coordinated: false,
  });

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["orders", formatDate(startDate), formatDate(endDate)],
    queryFn: () =>
      fetchOrdersByDate(formatDate(startDate), formatDate(endDate)),
    enabled: !!startDate && !!endDate,
  });

  const mutation = useMutation({
    mutationFn: (data) => updateOrders(data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "orders",
        formatDate(startDate),
        formatDate(endDate),
      ]);
      toast.success("Orden creada correctamente");
      handleCloseModalOrders();
      handlerCleanForm();
    },
    onError: (error) => {
      toast.error("Error al crear la orden: " + error.message);
    },
  });

  const handleOpenModalOrders = () => setIsOpenCreateOrdersModal(true);
  const handleCloseModalOrders = () => setIsOpenCreateOrdersModal(false);

  const handlerCleanForm = () => {
    setOrderData({
      orderNumber: "",
      dateOfOrder: "",
      clientNumber: "",
      taskDescription: "",
      userAssignedDni: "",
      coordinated: false,
    });
  };

  const updateOrderData = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrders = (e) => {
    e.preventDefault();
    const {
      orderNumber,
      dateOfOrder,
      clientNumber,
      taskDescription,
      userAssignedDni,
    } = orderData;

    // Validaciones
    if (
      !orderNumber ||
      !dateOfOrder ||
      !clientNumber ||
      !taskDescription ||
      !userAssignedDni
    ) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    mutation.mutate(orderData);
  };

  return (
    <main className="min-h-screen">
      <NavBack
        text="Gestion de Ordenes"
        handleOpenModal={handleOpenModalOrders}
        disable={false}
      />
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
        <div>Ha ocurrido un error: {error.message}</div>
      ) : (
        <ListOrders isLoading={isLoading} data={data} />
      )}
      <section>
        <Modal
          open={isOpenCreateOrdersModal}
          onClose={handleCloseModalOrders}
          handlerCleanStates={handlerCleanForm}
          title={"Crear Nueva Orden"}
          size={"md"}
          footerChild={
            <button
              onClick={handleAddOrders}
              className="w-full lg:w-[unset] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Crear Orden
            </button>
          }
        >
          <form
            onSubmit={handleAddOrders}
            className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-1 pb-4 sm:text-sm sm:mt-4"
          >
            <label htmlFor="orderNumber" className="flex flex-col gap-2">
              Número de Orden:
              <input
                id="orderNumber"
                name="orderNumber"
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
                placeholder="dd/mm/yyyy"
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
      </section>
    </main>
  );
};

export default Orders;
