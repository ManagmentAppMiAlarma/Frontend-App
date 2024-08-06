import React from 'react'
import { Footer } from '../components'
import { useAuth, useForm } from '../hooks';
import { Global } from '../helpers/Global';

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
                console.log('Ha ocurrido un error!')
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(
                    (data["user"] = {
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role
                    })
                )
            );

            setAuth(data.user);
        } catch (e) {
            throw new Error("Ha ocurrido un error!");
        }
    };

    return (
        <>
            <main className="w-full h-screen flex flex-col justify-center items-center">
                <div className='rounded-3xl'>
                    <img className='rounded-3xl' src={Global.images.logo} alt='Logo de la Empresa, Mi Alarma.' />
                </div>
                <form
                    onSubmit={loginUser}
                    className="bg-slate-100 rounded-3xl p-6 mt-4 w-[350px] flex flex-col items-center"
                >
                    <h1 className="text-2xl mx-auto font-semibold">
                        Iniciar Sesion
                    </h1>
                    <div className="w-full">
                        <input
                            type="email"
                            name="email"
                            onChange={changed}
                            placeholder="Correo Electronico"
                            className="mt-2 outline-inherit border border-slate-400 rounded-3xl py-3 w-full pl-3"
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={changed}
                            placeholder="Contraseña"
                            className="my-2 outline-inherit border border-slate-400 rounded-3xl py-3 w-full pl-3"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Iniciar Sesion"
                        className="mt-2 outline-inherit bg-red-600 py-3 px-6 w-[160px] rounded-3xl font-bold"
                    />
                </form>
            </main>
        </>
    );
}

export default Login