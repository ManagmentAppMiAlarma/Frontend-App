import React, { useEffect, useState } from "react";
import { getUserByDNI } from "../../services/getUserByDNI";
import { useNavigate, useParams } from "react-router-dom";
import NavBack from "../navegation/NavBack";
import DeleteModal from "../modal/DeleteModal";
import { deleteUser } from "../../hooks";
import { toast } from "react-toastify";
import UserDesktop from "../cards/UserDesktop";
import User from "../cards/User";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

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

const DetailUser = () => {
  const { dni } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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
    getUserByDNI(dni, setLoading, setUser);
  }, []);

  const handleDeleteUser = async () => {
    const res = await deleteUser(dni);
    if (res.status != 200) return toast.error("Error al eliminar al usuario");
    toast.success(res.message);
    closeModal();
    navigate("/inicio/empleados");
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <main className="min-h-screen">
      <NavBack
        text={"Detalle del usuario:"}
        value={true}
        valueKey={dni}
        disable={true}
      />
      {loading ? (
        <PuffLoaderComponent isLoading={loading} />
      ) : isMobileView ? (
        <User user={user} link={false} />
      ) : (
        <UserDesktop user={user} />
      )}
      <section className="mb-3 flex justify-around pb-3 pt-3">
        {/* <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Actualizar
        </button> */}
        <button
          onClick={openModal}
          className="px-3 py-2 bg-red-600 text-sm font-semibold text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Eliminar Usuario
        </button>
        <DeleteModal
          handleDelete={handleDeleteUser}
          title="Eliminar Usuario"
          text={`¿Estás seguro de que deseas eliminar el usuario ${dni}? Esta acción no se puede deshacer.`}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </section>
    </main>
  );
};

export default DetailUser;
