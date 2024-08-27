import React, { useState } from "react";
import Client from "../cards/Client";
import { updateClients } from "../../hooks";
import Skeleton from "../loadingSkeleton/Clients";
import { Modal } from "../modal";
import { toast } from "react-toastify";

const ListComponent = ({
  isOpenCreateClientsModal,
  handleCloseModalClients,
  totalPages,
  page,
  setPage,
  isLoading,
  data,
}) => {
  const limit = 10;

  const [clientData, setClientData] = useState({
    clientNumber: "",
    customerNumber: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleAddClient = async (e) => {
    e?.preventDefault();
    const body = {
      ...clientData,
      customer: true,
    };
    const response = await updateClients(body);
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
    });
  };

  const updateClientData = (e) => {
    setClientData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="container mx-auto mt-8 px-2 sm:hidden">
      {isLoading ? (
        // Mostrar el Skeleton mientras se cargan los datos
        <Skeleton key={0} />
      ) : (
        // Mostrar los datos cuando se hayan cargado
        data?.data?.map((client) => <Client client={client} key={client.id} />)
      )}

      {/* Controles de paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={page === 1}
          className="px-2 py-1 mx-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className=" py-2 mx-4">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={page === totalPages}
          className="px-2 py-1 mx-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <Modal
        open={isOpenCreateClientsModal}
        onClose={handleCloseModalClients}
        handlerCleanStates={handlerCleanForm}
        title={"Crear Cliente"}
        size={"md"}
        footerChild={
          <button
            onClick={handleAddClient}
            className="w-full lg:w-[unset] bg-red-500 text-white rounded-lg p-2"
          >
            Crear
          </button>
        }
      >
        <form
          onSubmit={handleAddClient}
          className="flex h-ful flex-col gap-4 pt-1 pb-4"
        >
          <label className="flex flex-col gap-2">
            Numero de Cliente:
            <input
              onChange={updateClientData}
              type="text"
              name="clientNumber"
              value={clientData.clientNumber}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Numero de Abonado:
            <input
              onChange={updateClientData}
              type="text"
              name="customerNumber"
              value={clientData.customerNumber}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            Nombre:
            <input
              onChange={updateClientData}
              type="text"
              name="firstname"
              value={clientData.firstname}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Apellido:
            <input
              onChange={updateClientData}
              type="text"
              name="lastname"
              value={clientData.lastname}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Email:
            <input
              onChange={updateClientData}
              type="text"
              name="email"
              value={clientData.email}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Telefono:
            <input
              onChange={updateClientData}
              type="text"
              name="phone"
              value={clientData.phone}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
          <label className="flex flex-col gap-2">
            Direccion:
            <input
              onChange={updateClientData}
              type="text"
              name="address"
              value={clientData.address}
              className="border border-gray-300 rounded-lg p-2"
            />
          </label>
        </form>
      </Modal>
    </section>
  );
};

export default ListComponent;
