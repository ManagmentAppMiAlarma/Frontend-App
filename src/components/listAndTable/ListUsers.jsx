import React, { useState } from "react";
import Skeleton from "../loadingSkeleton/Users";
import User from "../cards/User";
import { updateUsers } from "../../hooks";
import { Modal } from "../modal";
import { toast } from "react-toastify";

const ListUsers = ({
  isOpenCreateModal,
  handleCloseModal,
  totalPages,
  page,
  setPage,
  isLoading,
  data,
}) => {
  const [userData, setUserData] = useState({
    dni: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [response, setResponse] = useState("");

  const handleAddUsers = async (e) => {
    e?.preventDefault();
    const body = {
      ...userData,
    };
    const response = await updateUsers(body);
    setResponse(response);
    if (response.statusCode == 400 || response.statusCode == 404)
      return toast.error(
        response.message == "User already exists"
          ? "El usuario ya existe"
          : "Error al crear el usuario"
      );
    handleCloseModal();
    toast.success("Cliente creado correctamente");
  };

  const handlerCleanForm = () => {
    setUserData({
      dni: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    });
  };

  const updateUserData = (e) => {
    setUserData((prev) => ({
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
        data?.data?.map((user) => <User user={user} key={user.id} />)
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
        open={isOpenCreateModal}
        onClose={handleCloseModal}
        handlerCleanStates={handlerCleanForm}
        title={"Registro de Usuario"}
        size={"md"}
        footerChild={
          <button
            onClick={handleAddUsers}
            className="w-full lg:w-[unset] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Registrar Usuario
          </button>
        }
      >
        <form className="space-y-6" onSubmit={handleAddUsers}>
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-gray-700"
            >
              DNI
            </label>
            <div className="mt-1">
              <input
                id="dni"
                name="dni"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.dni}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <div className="mt-1">
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.firstname}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <div className="mt-1">
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.lastname}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.email}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.password}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.phone}
                onChange={updateUserData}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={userData.role}
                onChange={updateUserData}
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Tecnico</option>
              </select>
            </div>
          </div>
          {response.message && (
            <ul>
              <li>{response.message[0]}</li>
              <li>{response.message[1]}</li>
              <li>{response.message[2]}</li>
              <li>{response.message[3]}</li>
              <li>{response.message[4]}</li>
              <li>{response.message[5]}</li>
              <li>{response.message[6]}</li>
              <li>{response.message[7]}</li>
            </ul>
          )}
        </form>
      </Modal>
    </section>
  );
};

export default ListUsers;
