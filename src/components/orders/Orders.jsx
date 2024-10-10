import React, { useState } from "react";
import {
  FaRegClipboard,
  FaRegCalendarAlt,
  FaRegBuilding,
  FaRegUserCircle,
  FaRegFileAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Global } from "../../helpers/Global";
import "react-loading-skeleton/dist/skeleton.css";
import ListOrders from "../listAndTable/ListOrders";
import NavBack from "../navegation/NavBack";
import { updateOrders, useAuth } from "../../hooks";
import { Modal } from "../modal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

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

const formatDate = (date, str) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}${str}${month}${str}${year}`;
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
  const { auth } = useAuth();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["orders", formatDate(startDate, "-"), formatDate(endDate, "-")],
    queryFn: () =>
      fetchOrdersByDate(formatDate(startDate, "-"), formatDate(endDate, "-")),
    enabled: !!startDate && !!endDate,
  });

  const filteredOrders = data?.filter(
    (order) => order.userAssigned.dni === auth.dni
  );

  const mutation = useMutation({
    mutationFn: (data) => updateOrders(data),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "orders",
        formatDate(startDate, "-"),
        formatDate(endDate, "-"),
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <NavBack
        text="Gestion de Ordenes"
        handleOpenModal={handleOpenModalOrders}
        disable={auth.role === "admin" || auth.role === "owner" ? false : true}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mt-6"
      >
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
      </motion.div>
      {isError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Ha ocurrido un error: {error.message}
        </motion.div>
      ) : isLoading ? (
        <div className="flex justify-center items-center min-h-[420px]">
          <PuffLoader color={"#dc2626"} loading={isLoading} size={50} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ListOrders
            data={
              auth.role === "admin" || auth.role === "owner"
                ? data
                : filteredOrders
            }
          />
        </motion.div>
      )}
      <section>
        {isOpenCreateOrdersModal && (
          <Modal
            open={isOpenCreateOrdersModal}
            onClose={handleCloseModalOrders}
            handlerCleanStates={handlerCleanForm}
            title={"Crear Nueva Orden"}
            size={"md"}
            footerChild={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddOrders}
                className="group relative min-w-96 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaRegCheckCircle
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Crear Orden
              </motion.button>
            }
          >
            <form
              onSubmit={handleAddOrders}
              className="mt-8 space-y-3 shadow-2xl rounded-3xl p-8 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {[
                  {
                    id: "orderNumber",
                    label: "Número de Orden",
                    icon: FaRegClipboard,
                    placeholder: "Ej: 01120824",
                  },
                  {
                    id: "dateOfOrder",
                    label: "Fecha de Orden",
                    icon: FaRegCalendarAlt,
                    placeholder: "dd/mm/yyyy",
                  },
                  {
                    id: "clientNumber",
                    label: "Número de Cliente",
                    icon: FaRegBuilding,
                    placeholder: "Ej: C129",
                  },
                  {
                    id: "userAssignedDni",
                    label: "DNI del Usuario Asignado",
                    icon: FaRegUserCircle,
                    placeholder: "Ej: 12345678",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-400 mb-1 transition-colors group-hover:text-red-400"
                    >
                      {field.label}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <field.icon
                          className="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id={field.id}
                        name={field.id}
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        placeholder={field.placeholder}
                        value={orderData[field.id]}
                        onChange={updateOrderData}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <label
                  htmlFor="taskDescription"
                  className="block text-sm font-medium text-gray-400 mb-1 transition-colors group-hover:text-red-400"
                >
                  Descripción de la Tarea
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                    <FaRegFileAlt
                      className="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <textarea
                    id="taskDescription"
                    name="taskDescription"
                    rows="4"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    placeholder="Describa la tarea en detalle..."
                    value={orderData.taskDescription}
                    onChange={updateOrderData}
                  ></textarea>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center"
              >
                <input
                  id="coordinated"
                  name="coordinated"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded bg-gray-800"
                  checked={orderData.coordinated}
                  onChange={updateOrderData}
                />
                <label
                  htmlFor="coordinated"
                  className="ml-2 block text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  Coordinado
                </label>
              </motion.div>
            </form>
          </Modal>
        )}
      </section>
    </motion.main>
  );
};

export default Orders;
