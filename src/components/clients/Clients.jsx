import React, { useState } from "react";
import ListClients from "../listAndTable/ListClients";
import NavBack from "../navegation/NavBack";
import Table from "../listAndTable/Table";
import { updateClients, useClients } from "../../hooks";
import { toast } from "react-toastify";
import { Modal } from "../modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Global, paymentMethodType } from "../../helpers";
import { motion } from "framer-motion";
import {
  FaRegAddressCard,
  FaRegUser,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaRegIdCard,
  FaMoneyBillWave,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import SearchClients from "../search/SearchClients";

const Clients = () => {
  const [page, setPage] = useState(1);
  const [isOpenCreateClientsModal, setIsOpenCreateClientsModal] =
    useState(false);
  const [clientData, setClientData] = useState({
    clientNumber: "",
    customerNumber: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    customer: true,
    amount: 0,
    paymentMethod: "",
  });
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();

  const columns = [
    {
      header: "Nº Cliente",
      accessorKey: "clientNumber",
    },
    {
      header: "Nº Abonado",
      accessorFn: (row) => row.customerNumber || "No abonado",
    },
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    },
    {
      header: "Telefono",
      accessorKey: "phone",
    },
    {
      header: "Direccion",
      accessorKey: "address",
    },
    {
      header: "Cuota",
      accessorFn: (row) => (row.customer ? row.amount : "No abonado"),
    },
    {
      header: "Metodo de Pago",
      accessorFn: (row) =>
        row.customer
          ? paymentMethodType(
              row.paymentMethod,
              Global.typesMethodList,
              Global.typesMethod
            )
          : "No abonado",
    },
    {
      header: "Correo Electronico",
      accessorFn: (row) => row.email || "Sin correo",
    },
  ];
  const { data, isLoading, isError } = useClients(page, limit);

  const mutation = useMutation({
    mutationFn: (data) => updateClients(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      handleCloseModalClients();
      toast.success("Cliente creado correctamente");
    },
    onError: () => {
      toast.error("Error al crear el cliente");
    },
  });

  // Manejo de estado y funciones
  const totalPages = data ? data.meta.lastPage : 1;

  const handleOpenModalClients = () => {
    setIsOpenCreateClientsModal(true);
  };

  const handleCloseModalClients = () => {
    setIsOpenCreateClientsModal(false);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    mutation.mutate(clientData);
  };

  const handlerCleanForm = () => {
    setClientData({
      clientNumber: "",
      customerNumber: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      customer: false,
      amount: 0,
      paymentMethod: "",
    });
  };

  const updateClientData = (e) => {
    const { name, value, type, checked } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <main className="min-h-screen">
      <NavBack
        text="Gestion de Clientes"
        handleOpenModal={handleOpenModalClients}
      />
      {isError ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Error al cargar los datos.
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListClients
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              data={data}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="w-96 mx-auto ">
              <SearchClients />
            </section>
            <Table
              content={data}
              columns={columns}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              caseFor="clients"
              handleLimitChange={handleLimitChange}
              total={data?.meta.totalPages}
            />
            <motion.div
              className="flex justify-center my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                }}
                disabled={page === 1}
                className="px-2 lg:px-4 py-0.5 mx-2 rounded-lg bg-gray-700 hover:bg-gray-800 font-semibold text-gray-300 hover:text-white disabled:opacity-50"
              >
                <FaArrowLeft />
              </button>
              <span className=" py-1 ml-2 lg:py-2 lg:ml-4 mr-2">
                Página {page} de {totalPages}
              </span>
              <span className=" py-1 mr-2 lg:py-2 lg:ml-4 ml-2">
                Total {totalPages} resultados
              </span>
              <button
                onClick={() => {
                  setPage((prev) => Math.min(prev + 1, totalPages));
                }}
                disabled={page === totalPages}
                className="px-2 lg:px-4 py-0.5 mx-2 rounded-lg bg-gray-700 hover:bg-gray-800 font-semibold text-gray-300 hover:text-white disabled:opacity-50"
              >
                <FaArrowRight />
              </button>
            </motion.div>
          </motion.div>
          <Modal
            open={isOpenCreateClientsModal}
            onClose={handleCloseModalClients}
            handlerCleanStates={handlerCleanForm}
            title={"Crear Cliente"}
            size={"md"}
            footerChild={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddClient}
                className="group relative min-w-96 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaRegAddressCard
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Crear Cliente
              </motion.button>
            }
          >
            <form onSubmit={handleAddClient} className="space-y-2 p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {[
                  {
                    id: "clientNumber",
                    label: "Número de Cliente",
                    icon: FaRegAddressCard,
                    placeholder: "Ej: CLI-001",
                  },
                  {
                    id: "firstname",
                    label: "Nombre",
                    icon: FaRegUser,
                    placeholder: "Ingrese el nombre",
                  },
                  {
                    id: "lastname",
                    label: "Apellido",
                    icon: FaRegUser,
                    placeholder: "Ingrese el apellido",
                  },
                  {
                    id: "email",
                    label: "Email (Opcional)",
                    icon: FaRegEnvelope,
                    placeholder: "correo@ejemplo.com",
                  },
                  {
                    id: "phone",
                    label: "Teléfono",
                    icon: FaPhoneAlt,
                    placeholder: "Ej: +1234567890",
                  },
                  {
                    id: "address",
                    label: "Dirección",
                    icon: FaMapMarkerAlt,
                    placeholder: "Ingrese la dirección",
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
                        required={field.id !== "email"}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        placeholder={field.placeholder}
                        value={clientData[field.id]}
                        onChange={updateClientData}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center pt-2.5"
              >
                <input
                  id="customer"
                  name="customer"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded bg-gray-800"
                  checked={clientData.customer}
                  onChange={updateClientData}
                />
                <label
                  htmlFor="customer"
                  className="ml-2 block text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  ¿Es Abonado?
                </label>
              </motion.div>

              {clientData.customer && (
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="relative group">
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm font-medium text-gray-400 mb-1 transition-colors group-hover:text-red-400"
                    >
                      Forma de Pago
                    </label>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-1 relative rounded-md shadow-sm"
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCreditCard
                          className="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        value={clientData.paymentMethod}
                        onChange={updateClientData}
                      >
                        <option value="">Seleccione una Forma de Pago</option>
                        <option value="CASH">Efectivo</option>
                        <option value="VISA">Visa</option>
                        <option value="MASTERCARD">MasterCard</option>
                        <option value="OCA">Oca</option>
                        <option value="TRANSFER">Transferencia</option>
                      </select>
                    </motion.div>
                  </div>

                  {[
                    {
                      id: "customerNumber",
                      label: "Número de Abonado",
                      icon: FaRegIdCard,
                      placeholder: "Ej: AB-001",
                    },
                    {
                      id: "amount",
                      label: "Monto Mensual",
                      icon: FaMoneyBillWave,
                      placeholder: "Ingrese el monto",
                      type: "number",
                    },
                  ].map((field, index) => (
                    <div
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
                          type={field.type || "text"}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                          placeholder={field.placeholder}
                          value={clientData[field.id]}
                          onChange={updateClientData}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </Modal>
        </>
      )}
    </main>
  );
};

export default Clients;
