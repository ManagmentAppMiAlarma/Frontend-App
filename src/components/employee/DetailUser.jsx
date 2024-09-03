import React, { useEffect, useState } from "react";
import { getUserByDNI } from "../../services/getUserByDNI";
import { useNavigate, useParams } from "react-router-dom";
import NavBack from "../navegation/NavBack";
import DeleteModal from "../modal/DeleteModal";
import { deleteUser } from "../../hooks";
import { toast } from "react-toastify";

const DetailUser = () => {
  const { dni } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

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

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <main className="min-h-screen">
        <NavBack text={"Detalle del usuario:"} value={true} valueKey={dni} />
        <section className="border-b mb-3 flex justify-around pb-3 pt-3">
          <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            Actualizar
          </button>
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
        <section className="border rounded-2xl px-4 py-2 mb-3 mx-3 bg-slate-300">
          <div className="flex mt-2">
            <label className="font-semibold">Nombre Completo:</label>
            <p className="ml-2">{`${user.firstname} ${user.lastname}`}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">DNI:</label>
            <p className="ml-2">{user.dni}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">Telefono:</label>
            <p className="ml-2">{user.phone}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">Correo Electronico:</label>
            <p className="ml-2">{user.email}</p>
          </div>
          <div className="flex my-0.5">
            <label className="font-semibold">Rol:</label>
            <p className="ml-2">
              {user.role == "admin" || user.role == "owner"
                ? "Admistrador"
                : "Tecnico"}
            </p>
          </div>
        </section>
      </main>
    );
  }
};

export default DetailUser;
