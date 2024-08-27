import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { VerifySession } from "../../services/VerifySession";
import SelectItem from "../form/SelectUser";

export default function OrderCreationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { form, changed } = useForm({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newUser = form;
//     console.log(newUser);
//     try {
//       if (VerifySession()) {
//         const res = await fetch(
//           `${Global.endpoints.backend}auth/user/register`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Autorization": `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(newUser),
//           }
//         );
//         if (res.stauts != 201) {
//           alert("Error al crear usuario");
//           return;
//         }
        
//         alert("Usuario creado exitosamente");
//         setIsOpen(false);
//         return;
//       } else {
//         alert("Sesión no válida");
//         return;
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex justify-center items-center mt-3">
      <button
        onClick={toggleModal}
        className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl mb-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Crear Orden de Servicio
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-start">
              <div className="">
                <h2 className="text-2xl font-bold">Crear Nueva Orden</h2>
                <p className="text-red-100">
                  Ingresa los detalles de la nueva orden aquí. Haz clic en crear
                  cuando hayas terminado.
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="text-white hover:text-red-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form  className="grid gap-4 p-6 h-[500px]">
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="firstname" className="text-right font-medium">
                  Nombre
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lastname" className="text-right font-medium">
                  Apellido
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="dni" className="text-right font-medium">
                  C. Identidad
                </label>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right font-medium">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right font-medium">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right font-medium">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={changed}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <label className="font-semibold">Tecnico:</label>
            <SelectItem
              items={usersData}
              isLoading={isLoadingData}
              error={errorData}
              firstValueKey="id"
              secondValueKey="dni"
              firstLabelKey="firstname"
              secondLabelKey="lastname"
              setUser={setUser}
            />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Crear Orden
                </button>
              </div> */}
              Aca tengo que crear el formulario para crear una orden
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
