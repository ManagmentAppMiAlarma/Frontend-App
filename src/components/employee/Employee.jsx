import React, { useState } from "react";
import Table from "../listAndTable/Table";
import { updateUsers, useUsers } from "../../hooks/useUsers";
import ListUsers from "../listAndTable/ListUsers";
import NavBack from "../navegation/NavBack";
import { toast } from "react-toastify";
import { Modal } from "../modal";

const Employee = () => {
  const [page, setPage] = useState(1);
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);
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
  const limit = 10;

  const { data, isLoading, isError } = useUsers(page, limit);

  const totalPages = data ? data?.meta.lastPage : 1;

  const columns = [
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    },
    {
      header: "Correo Electronico",
      accessorKey: "email",
    },
    {
      header: "Cedula",
      accessorKey: "dni",
    },
    {
      header: "Telefono",
      accessorKey: "phone",
    },
    {
      header: "Permiso",
      accessorFn: (row) =>
        row.role == "admin" || row.role == "owner"
          ? "Administrador"
          : "Tecnico",
    },
  ];

  const handleOpenModalUser = () => {
    setIsOpenCreateUserModal(true);
  };
  const handleCloseModalUser = () => {
    setIsOpenCreateUserModal(false);
  };

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
    handleCloseModalUser();
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
    <main className="mb-5 sm:min-h-screen">
      <NavBack
        text="Gestion de Empleados"
        handleOpenModal={handleOpenModalUser}
      />
      {isError ? (
        <div>Error al cargar los datos.</div>
      ) : (
        <>
          <ListUsers
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
            caseFor="employee"
          />
          <Modal
            open={isOpenCreateUserModal}
            onClose={handleCloseModalUser}
            handlerCleanStates={handlerCleanForm}
            title={"Registro de Usuario"}
            size={"md"}
            footerChild={
              <button
                onClick={handleAddUsers}
                className="w-full lg:w-[unset] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Crear Usuario
              </button>
            }
          >
            <form
              className="flex flex-col sm:grid sm:grid-cols-2 gap-4 pt-1 pb-4 sm:text-sm sm:mt-4"
              onSubmit={handleAddUsers}
            >
              <label className="flex flex-col gap-2">
                Cedula de Identidad:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="dni"
                  value={userData.dni}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>

              <label className="flex flex-col gap-2">
                Nombre:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="firstname"
                  value={userData.firstname}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Apellido:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="lastname"
                  value={userData.lastname}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Email:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="email"
                  value={userData.email}
                  className="border border-gray-300 rounded-lg py-2 px-1 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Telefono:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="phone"
                  value={userData.phone}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <label className="flex flex-col gap-2">
                Contraseña:
                <input
                  onChange={updateUserData}
                  type="text"
                  name="password"
                  value={userData.password}
                  className="border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9"
                />
              </label>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol:
                  <select
                    id="role"
                    name="role"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg p-2 sm:w-72 sm:border-gray-400 sm:rounded-xl sm:h-9 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    value={userData.role}
                    onChange={updateUserData}
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Tecnico</option>
                  </select>
                </label>
                <div className="mt-1"></div>
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
        </>
      )}
    </main>
  );
};

export default Employee;
