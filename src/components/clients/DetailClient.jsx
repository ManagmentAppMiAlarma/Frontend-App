import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientbyId } from "../../services/getClientById";
import { toast } from "react-toastify";
import { deleteClient, updateClient, useForm } from "../../hooks";
import Client from "../cards/Client";
import NavBack from "../navegation/NavBack";
import DeleteModal from "../modal/DeleteModal";
import Skeleton from "../loadingSkeleton/Clients";
import ClientDesktop from "../cards/ClientDesktop";
import { Modal, MsgError, MsgSuccess } from "../modal";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const DetailClient = () => {
  const { clientNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateClientsModal, setIsOpenCreateClientsModal] =
    useState(false);
  const { form, changed } = useForm({});

  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobileView(window.innerWidth < 500);
    }, 200);

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getClientbyId(clientNumber, setLoading, setClient);
  }, []);

  const handleDeleteClient = async () => {
    const res = await deleteClient(clientNumber);
    if (res.status != 200) return toast.error("Error al eliminar al usuario");
    toast.success(res.message);
    closeModal();
    navigate("/inicio/clientes");
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOpenModalClients = () => {
    setIsOpenCreateClientsModal(true);
  };
  const handleCloseModalClients = () => {
    setIsOpenCreateClientsModal(false);
  };

  const updateClientData = async (e) => {
    e.preventDefault();
    if (Object.keys(form).length === 0)
      return MsgError("No se ha modificado ningún campo");

    const res = await updateClient({
      clientNumber,
      customer: client.customer,
      customerNumber: client.customerNumber,
      ...form,
    });
    if (res.status != 200) return MsgError("Error al actualizar el cliente");
    handleCloseModalClients();
    MsgSuccess("Cliente actualizado correctamente");
  };

  console.log(client);

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle del cliente:"}
        disable={true}
        value={true}
        valueKey={clientNumber}
      />
      {loading ? (
        <Skeleton />
      ) : isMobileView ? (
        <Client client={client} link={false} />
      ) : (
        <ClientDesktop client={client} />
      )}
      <section className="mb-3 flex justify-center pb-3 pt-3">
        <button
          onClick={handleOpenModalClients}
          className="mx-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Actualizar
        </button>
        <Modal
          open={isOpenCreateClientsModal}
          onClose={handleCloseModalClients}
          title={"Actualizar Cliente"}
          size={"md"}
          footerChild={
            <button
              onClick={updateClientData}
              className="w-full lg:w-[unset] bg-red-500 hover:bg-red-700 transition text-white rounded-lg p-2"
            >
              Actualizar
            </button>
          }
        >
          <form onSubmit={updateClientData}>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-1 sm:text-sm sm:mt-4">
              <label className="flex flex-col gap-2">
                Numero de Cliente:
                <input
                  onChange={changed}
                  type="text"
                  name="clientNumber"
                  placeholder={client.clientNumber}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>

              <label className="flex flex-col gap-2">
                Nombre:
                <input
                  onChange={changed}
                  type="text"
                  name="firstname"
                  placeholder={client.firstname}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Apellido:
                <input
                  onChange={changed}
                  type="text"
                  name="lastname"
                  placeholder={client.lastname}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Email: (Opcional)
                <input
                  onChange={changed}
                  type="text"
                  name="email"
                  placeholder={client.email}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Telefono:
                <input
                  onChange={changed}
                  type="text"
                  name="phone"
                  placeholder={client.phone}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Direccion:
                <input
                  onChange={changed}
                  type="text"
                  name="address"
                  placeholder={client.address}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              {client.customer && (
                <>
                  <label className="flex flex-col gap-2">
                    Forma de Pago:
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                      placeholder={client.paymentMethod}
                      onChange={changed}
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
                      onChange={changed}
                      type="text"
                      name="customerNumber"
                      placeholder={client.customerNumber}
                      className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    Monto Mensual:
                    <input
                      onChange={changed}
                      type="number"
                      name="amount"
                      placeholder={client.amount}
                      className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                    />
                  </label>
                </>
              )}
            </div>
          </form>
        </Modal>

        <button
          onClick={openModal}
          className="mx-4 px-3 py-2 bg-red-600 text-sm font-semibold text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Eliminar Cliente
        </button>

        <DeleteModal
          handleDelete={handleDeleteClient}
          title="Eliminar Cliente"
          text={`¿Estás seguro de que deseas eliminar el cliente ${clientNumber}? Esta acción no se puede deshacer.`}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </section>
    </main>
  );
};

export default DetailClient;
