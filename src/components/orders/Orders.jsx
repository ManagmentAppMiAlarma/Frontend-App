import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["orders", formatDate(startDate), formatDate(endDate)],
    queryFn: () =>
      fetchOrdersByDate(formatDate(startDate), formatDate(endDate)),
    enabled: !!startDate && !!endDate, // Solo fetch cuando ambas fechas están definidas
  });

  const [isOpenCreateOrdersModal, setIsOpenCreateOrdersModal] = useState(false);

  const handleOpenModalOrders = () => {
    setIsOpenCreateOrdersModal(true);
  };
  const handleCloseModalOrders = () => {
    setIsOpenCreateOrdersModal(false);
  };

  const [orderData, setOrderData] = useState({
    orderNumber: "",
    dateOfOrder: "",
    clientNumber: "",
    taskDescription: "",
    userAssignedDni: "",
    coordinated: false,
  });

  const [response, setResponse] = useState("");

  const handleAddOrders = async (e) => {
    e?.preventDefault();
    const body = {
      ...orderData,
    };
    const response = await updateOrders(body);
    setResponse(response);
    if (response.statusCode == 400 || response.statusCode == 404)
      return toast.error(
        response.message == "Order already exists"
          ? "La Orden ya existe"
          : "Error al crear la Orden"
      );
    handleCloseModalOrders();
    toast.success("Orden creada correctamente");
  };

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

  return (
    <main className="min-h-screen">
      <NavBack
        text="Gestion de Ordenes de Servicio"
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
        <div>Ah ocurrido un error: {error.message}</div>
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
            {response.message && (
              <ul>
                <li>{response.message[0]}</li>
                <li>{response.message[1]}</li>
                <li>{response.message[2]}</li>
                <li>{response.message[3]}</li>
                <li>{response.message[4]}</li>
              </ul>
            )}
          </form>
        </Modal>
      </section>
    </main>
  );
};

export default Orders;
