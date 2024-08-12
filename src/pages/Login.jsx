import React from "react";
import { useAuth, useForm } from "../hooks";
import { Global } from "../helpers/Global";

const Login = () => {
  const { setAuth } = useAuth();
  const { form, changed } = useForm();

  const loginUser = async (e) => {
    e.preventDefault();

    let dataUser = form;

    try {
      const res = await fetch(`${Global.endpoints.backend}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      const data = await res.json();

      if (res.status !== 201) {
        console.log("Ha ocurrido un error!");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(
          (data["user"] = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            dni: data.user.dni,
            phone: data.user.phone,
            role: data.user.role,
          })
        )
      );

      setAuth(data.user);
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (e) {
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <>
      <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={Global.images.logo}
            alt="Logo de la Empresa, Mi Alarma."
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Accede a tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={loginUser} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={changed}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={changed}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
