import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export default function UserCreationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { form, changed } = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = form;
    try {
      const res = await fetch(`${Global.endpoints.backend}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newUser),
      });
      if (res.stauts != 200) {
        alert("Error al crear usuario");
      }
      alert("Usuario creado exitosamente");
      setIsOpen(false);
      return;
    } catch (error) {
      throw new Error(error);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-282px)] bg-gray-100">
      <button
        onClick={toggleModal}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Crear Usuario
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-red-600 text-white p-4 rounded-t-lg">
              <h2 className="text-2xl font-bold">Crear Nuevo Usuario</h2>
              <p className="text-red-100">
                Ingresa los detalles del nuevo usuario aquí. Haz clic en crear
                cuando hayas terminado.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 p-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nombre" className="text-right font-medium">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="apellido" className="text-right font-medium">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="cedula" className="text-right font-medium">
                  C. Identidad
                </label>
                <input
                  id="cedula"
                  name="cedula"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="correo" className="text-right font-medium">
                  Correo Electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="telefono" className="text-right font-medium">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contrasenia" className="text-right font-medium">
                  Contraseña
                </label>
                <input
                  id="contrasenia"
                  name="contrasenia"
                  type="password"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="role" className="text-right font-medium">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecciona un role</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
