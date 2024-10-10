import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import NavBack from "../navegation/NavBack";
import DetailOrderTest from "./DetailOrderTest";
import { Modal } from "../modal";
import DeleteModal from "../modal/DeleteModal";
import { getOrderByOrderNumber } from "../../services/getOrderByOrderNumber";
import { deleteOrder, updatingOrder } from "../../hooks";
import { motion } from "framer-motion";
import {
  FaRegClipboard,
  FaRegCalendarAlt,
  FaRegBuilding,
  FaRegUserCircle,
  FaRegFileAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

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
      {isLoading ? (
        <PuffLoaderComponent isLoading={isLoading} />
      ) : (
        <DetailOrderTest order={data} />
      )}
      {isLoading ? null : (
        <Modal
          open={isOpenUpdateOrdersModal}
          onClose={handleCloseModalOrders}
          handlerCleanStates={handlerCleanForm}
          title={"Actualizar Orden"}
          size={"md"}
          footerChild={
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddOrder}
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
            onSubmit={handleAddOrder}
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
