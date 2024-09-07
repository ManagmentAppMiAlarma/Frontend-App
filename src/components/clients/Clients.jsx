import React, { useState } from "react";
import ListClients from "../listAndTable/ListClients";
import NavBack from "../navegation/NavBack";
import Table from "../listAndTable/Table";
import { updateClients, useClients } from "../../hooks";
import { toast } from "react-toastify";
import { Modal } from "../modal";
import { Global, paymentMethodType } from "../../helpers";

const Clients = () => {
  const [page, setPage] = useState(1);
  const [isOpenCreateClientsModal, setIsOpenCreateClientsModal] =
    useState(false);
  const [checked, setChecked] = useState(true);
  const limit = 10;

  const { data, isLoading, isError } = useClients(page, limit);

  const totalPages = data ? data?.meta.lastPage : 1;

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

  const handleOpenModalClients = () => {
    setIsOpenCreateClientsModal(true);
  };
  const handleCloseModalClients = () => {
    setIsOpenCreateClientsModal(false);
  };

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

  const handleAddClient = async (e) => {
    e?.preventDefault();
    const body = {
      ...clientData,
    };
    console.log(body);
    const response = await updateClients(body);
    console.log(response);
    if (!response.id) return toast.error("Error al crear el cliente");
    handleCloseModalClients();
    toast.success("Cliente creado correctamente");
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
      customer: true,
      amount: 0,
      paymentMethod: "",
    });
  };

  const updateClientData = (e) => {
    const { name, value, type, checked } = e.target;
    setChecked(checked);
    setClientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <main className="min-h-screen">
      <NavBack
        text="Gestion de Clientes"
        handleOpenModal={handleOpenModalClients}
      />
      {isError ? (
        <div>Error al cargar los datos.</div>
      ) : (
        <>
          <ListClients
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            data={data}
          />

          <Table
            content={data}
            columns={columns}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            caseFor="clients"
          />
          <Modal
            open={isOpenCreateClientsModal}
            onClose={handleCloseModalClients}
            handlerCleanStates={handlerCleanForm}
            title={"Crear Cliente"}
            size={"md"}
            footerChild={
              <button
                onClick={handleAddClient}
                className="w-full lg:w-[unset] bg-red-500 hover:bg-red-700 transition text-white rounded-lg p-2"
              >
                Crear Cliente
              </button>
            }
          >
            <form onSubmit={handleAddClient}>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-1 sm:text-sm sm:mt-4">
                <label className="flex flex-col gap-2">
                  Numero de Cliente:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="clientNumber"
                    value={clientData.clientNumber}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  Nombre:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="firstname"
                    value={clientData.firstname}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  Apellido:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="lastname"
                    value={clientData.lastname}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  Email: (Opcional)
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="email"
                    value={clientData.email}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  Telefono:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="phone"
                    value={clientData.phone}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  Direccion:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="address"
                    value={clientData.address}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label
                  htmlFor="coordinated"
                  className="flex items-center gap-2 sm:col-span-2"
                >
                  Es Abonado?{" "}
                  <input
                    id="customer"
                    name="customer"
                    type="checkbox"
                    className="border border-gray-300 rounded-lg p-2 sm:border-gray-400 sm:rounded-xl"
                    checked={clientData.customer}
                    onChange={updateClientData}
                  />
                </label>
              </div>
              <div
                className={
                  "flex flex-col sm:grid sm:grid-cols-2 gap-4 pb-4 sm:text-sm sm:mt-4"
                }
              >
                <label className="flex flex-col gap-2">
                  Forma de Pago:
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
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
                </label>
                <label className="flex flex-col gap-2">
                  Numero de Abonado:
                  <input
                    onChange={updateClientData}
                    type="text"
                    name="customerNumber"
                    value={clientData.customerNumber}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  Monto Mensual:
                  <input
                    onChange={updateClientData}
                    type="number"
                    name="amount"
                    value={clientData.amount}
                    className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                  />
                </label>
              </div>
            </form>
          </Modal>
        </>
      )}
    </main>
  );
};

export default Clients;
