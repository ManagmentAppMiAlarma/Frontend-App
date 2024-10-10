import React, { useState } from "react";
import { motion } from "framer-motion";
import Table from "../listAndTable/Table";
import { updateUsers, useUsers } from "../../hooks/useUsers";
import ListUsers from "../listAndTable/ListUsers";
import NavBack from "../navegation/NavBack";
import { toast } from "react-toastify";
import { Modal } from "../modal";
import {
  FaRegIdCard,
  FaRegUser,
  FaRegEnvelope,
  FaPhoneAlt,
  FaLock,
  FaUserCog,
} from "react-icons/fa";

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-5 sm:min-h-screen"
    >
      <NavBack
        text="Gestion de Empleados"
        handleOpenModal={handleOpenModalUser}
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
            <ListUsers
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
            <Table
              content={data}
              columns={columns}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              caseFor="employee"
            />
          </motion.div>
          <Modal
            open={isOpenCreateUserModal}
            onClose={handleCloseModalUser}
            handlerCleanStates={handlerCleanForm}
            title={"Registro de Usuario"}
            size={"md"}
            footerChild={
              <button
                onClick={handleAddUsers}
                className="group relative min-w-96 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaRegUser
                    className="h-5 w-5 text-red-500 group-hover:text-red-400"
                    aria-hidden="true"
                  />
                </span>
                Registrar Usuario
              </button>
            }
          >
            <form
              onSubmit={handleAddUsers}
              className="space-y-3 bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {[
                  {
                    id: "dni",
                    label: "Cédula de Identidad",
                    icon: FaRegIdCard,
                    placeholder: "Ingrese su CI",
                  },
                  {
                    id: "firstname",
                    label: "Nombre",
                    icon: FaRegUser,
                    placeholder: "Ingrese su nombre",
                  },
                  {
                    id: "lastname",
                    label: "Apellido",
                    icon: FaRegUser,
                    placeholder: "Ingrese su apellido",
                  },
                  {
                    id: "email",
                    label: "Email",
                    icon: FaRegEnvelope,
                    placeholder: "correo@ejemplo.com",
                    type: "email",
                  },
                  {
                    id: "phone",
                    label: "Teléfono",
                    icon: FaPhoneAlt,
                    placeholder: "Ej: 091123456",
                  },
                  {
                    id: "password",
                    label: "Contraseña",
                    icon: FaLock,
                    placeholder: "Ingrese su contraseña",
                    type: "password",
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
                        required
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                        placeholder={field.placeholder}
                        value={userData[field.id]}
                        onChange={updateUserData}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative group">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-400 mb-1 transition-colors group-hover:text-red-400"
                >
                  Rol
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserCog
                      className="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <select
                    id="role"
                    name="role"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    value={userData.role}
                    onChange={updateUserData}
                    required
                  >
                    <option value="">Seleccione un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="user">Técnico</option>
                  </select>
                </div>
              </div>

              {response.message && response.message.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-sm text-red-400">
                    {response.message.map((msg, index) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </Modal>
        </>
      )}
    </motion.main>
  );
};

export default Employee;
