import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientbyId } from "../../services/getClientById";
import { toast } from "react-toastify";
import { deleteClient } from "../../hooks";
import Client from "../cards/Client";
import NavBack from "../navegation/NavBack";
import DeleteModal from "../modal/DeleteModal";
import Skeleton from "../loadingSkeleton/Clients";
import ClientDesktop from "../cards/ClientDesktop";

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

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle del cliente:"}
        disable={true}
        value={true}
        valueKey={clientNumber}
      />
      <section className="mb-3 flex justify-center pb-3 pt-3">
        <button className="mx-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Actualizar
        </button>
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
      {loading ? (
        <Skeleton />
      ) : isMobileView ? (
        <Client client={client} link={false} />
      ) : (
        <ClientDesktop client={client} />
      )}
    </main>
  );
};

export default DetailClient;
