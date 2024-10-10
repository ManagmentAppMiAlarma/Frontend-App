import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Client from "../cards/Client";
import NavBack from "../navegation/NavBack";
import DeleteModal from "../modal/DeleteModal";
import ClientDesktop from "../cards/ClientDesktop";
import { Modal, MsgError, MsgSuccess } from "../modal";
import {
  FaRegAddressCard,
  FaRegUser,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaRegIdCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  deleteClient,
  fetchClientsById,
  updateClient,
  useForm,
} from "../../hooks";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

const DetailClient = () => {
  const { clientNumber } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateClientsModal, setIsOpenCreateClientsModal] =
    useState(false);
  const { form, changed } = useForm({});
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: client,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["client", clientNumber],
    queryFn: () => fetchClientsById(clientNumber),
    staleTime: 60000,
  });

  // Manejo de errores
  if (isError) {
    return <div>Ha ocurrido un error: {error.message}</div>;
  }

  const updateClientMutation = useMutation({
    mutationFn: (data) => updateClient(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        MsgSuccess("Cliente actualizado correctamente");
        queryClient.invalidateQueries(["client", clientNumber]);
      } else {
        MsgError("Error al actualizar el cliente");
      }
    },
    onError: () => {
      MsgError("Error al actualizar el cliente");
    },
  });

  const handleDeleteClient = async () => {
    const res = await deleteClient(clientNumber);
    if (res.status !== 200) return toast.error("Error al eliminar al usuario");
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

    await updateClientMutation.mutateAsync({
      clientNumber,
      customer: client.customer,
      customerNumber: client.customerNumber,
      ...form,
    });
    handleCloseModalClients();
  };

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle del cliente:"}
        disable={true}
        value={true}
        valueKey={clientNumber}
      />
      {isLoading ? (
        <PuffLoaderComponent isLoading={isLoading} />
      ) : (
        <>
          {isMobileView ? (
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
                  className="group relative min-w-96 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaRegAddressCard
                      className="h-5 w-5 text-red-500 group-hover:text-red-400"
                      aria-hidden="true"
                    />
                  </span>
                  Actualizar Cliente
                </button>
              }
            >
              <form
                onSubmit={updateClientData}
                className="space-y-2 p-8 sm:p-10"
              >
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
                      placeholder: client.firstname,
                    },
                    {
                      id: "lastname",
                      label: "Apellido",
                      icon: FaRegUser,
                      placeholder: client.lastname,
                    },
                    {
                      id: "email",
                      label: "Email (Opcional)",
                      icon: FaRegEnvelope,
                      placeholder: client.email,
                    },
                    {
                      id: "phone",
                      label: "Teléfono",
                      icon: FaPhoneAlt,
                      placeholder: client.phone,
                    },
                    {
                      id: "address",
                      label: "Dirección",
                      icon: FaMapMarkerAlt,
                      placeholder: client.address,
                    },
                  ].map((field) => (
                    <div key={field.id} className="relative group">
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
                          onChange={changed}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center pt-2.5">
                  <input
                    id="customer"
                    name="customer"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-700 rounded bg-gray-800"
                    onChange={changed}
                  />
                  <label
                    htmlFor="customer"
                    className="ml-2 block text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    ¿Es Abonado?
                  </label>
                </div>

                {client.customer && form.customer && (
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="relative group">
                      <label
                        htmlFor="paymentMethod"
                        className="block text-sm font-medium text-gray-400 mb-1 transition-colors group-hover:text-red-400"
                      >
                        Forma de Pago
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
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
                          onChange={changed}
                        >
                          <option value="">Seleccione una Forma de Pago</option>
                          <option value="CASH">Efectivo</option>
                          <option value="VISA">Visa</option>
                          <option value="MASTERCARD">MasterCard</option>
                          <option value="OCA">Oca</option>
                          <option value="TRANSFER">Transferencia</option>
                        </select>
                      </div>
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
                        type: "string",
                      },
                    ].map((field) => (
                      <div key={field.id} className="relative group">
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
                            onChange={changed}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </Modal>

            <button
              onClick={openModal}
              className="mx-4 px-3 py-2 bg-red-600 text-sm font-semibold text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Eliminar Cliente
            </button>
          </section>
        </>
      )}

      <DeleteModal
        handleDelete={handleDeleteClient}
        title="Eliminar Cliente"
        text={`¿Estás seguro de que deseas eliminar el cliente ${clientNumber}? Esta acción no se puede deshacer.`}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </main>
  );
};

export default DetailClient;
