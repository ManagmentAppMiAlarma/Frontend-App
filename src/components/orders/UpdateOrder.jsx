import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { useForm, useUsers } from "../../hooks";
import Skeleton from "../loadingSkeleton/D&UOrders";
import NavBack from "../navegation/NavBack";
import { useAuth } from "../../hooks/useAuth";
import SelectItem from "../form/SelectUser";

const fetchOrderByOrdernumber = async (orderNumber) => {
  try {
    const res = await fetch(`${Global.endpoints.backend}orders/${orderNumber}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Ah ocurrido un error al obtener los datos de la orden.");
  }
};

const UpdateOrder = () => {
  const { orderNumber } = useParams();
  const { auth } = useAuth();
  const { form, changed } = useForm({});
  const [user, setUser] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => fetchOrderByOrdernumber(orderNumber),
    refetchOnMount: true,
  });

  const {
    isLoading: isLoadingData,
    isError: isErrorData,
    data: users,
    error: errorData,
  } = useUsers();

  const updateOrder = (e) => {
    e.preventDefault();
    console.log(form);
    console.log(user);
  };

  if (isLoading) {
    return <Skeleton auth={auth} />;
  }

  const usersData = Array.from(users.data);

  if (isError) {
    return <div>Ah ocurrido un error: {error.message}</div>;
  }

  return (
    <main className="min-h-screen">
      <NavBack text={"Actualizar orden:"} data={data} />
      <form onSubmit={updateOrder}>
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
          <div>
            <label className="font-semibold">Ubicacion:</label>
            <input
              placeholder={data.client.address}
              className="pl-1 ml-2 rounded outline-none"
            />
          </div>
          <div className="flex mt-2">
            <div className="flex my-0.5">
              <label className="font-semibold">Nº Orden:</label>
              <input
                placeholder={data.orderNumber}
                className="h-6 w-[85px] pl-1 ml-2 rounded outline-none"
              />
            </div>
            <div className="flex ml-3 my-0.5">
              <label className="font-semibold">Fecha:</label>
              <input
                className="h-6 w-[92px] pl-1 ml-2 rounded outline-none"
                placeholder={data.dateOfOrder}
              />
            </div>
          </div>
          <div className="flex my-1">
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
          <div className="text-center mt-3">
            <h3 className="font-semibold">Datos del Cliente</h3>
            <div className="flex my-0.5">
              <label className="font-semibold">Nombre:</label>
              <p className="ml-2">{`${data.client.firstname} ${data.client.lastname}`}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Celular:</label>
              <p className="ml-2">{data.client.phone}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Email:</label>
              {data.client.email === "" ? (
                <p className="ml-2">Sin correo electronico</p>
              ) : (
                <p className="ml-2">{data.client.email}</p>
              )}
            </div>
            <div className="flex">
              <div className="flex my-0.5">
                <label className="font-semibold">Nº Cliente:</label>
                <p className="ml-2">{data.client.clientNumber}</p>
              </div>
              <div>
                {data.client.customer === false ? (
                  <div className="flex my-0.5 ml-7">
                    <p className="ml-2">No es Abonado</p>
                  </div>
                ) : (
                  <div className="flex my-0.5 ml-7">
                    <label className="font-semibold">Nº Abonado:</label>
                    <p className="ml-2">{data.client.customerNumber}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <h3 className="font-semibold">Descripcion:</h3>
              <div>{data.serviceDetails.description}</div>
            </div>
          </div>
        </section>
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
          <div className="text-center">
            <h3 className="font-semibold">Tareas realizadas:</h3>
            <div>{data.serviceDetails.taskDone}</div>
          </div>
          <div className="text-center mt-3">
            <h3 className="font-semibold">Recibe:</h3>
            <div className="flex my-0.5">
              <label className="font-semibold">Nombre y Apellido:</label>
              <p className="ml-2">{`${data.serviceDetails.firstname} ${data.serviceDetails.lastname}`}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">C.I.:</label>
              <p className="ml-2">{data.serviceDetails.dni}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Celular:</label>
              <p className="ml-2">{data.serviceDetails.phone}</p>
            </div>
            <div className="flex my-0.5 relative left-56">
              <label className="font-semibold">Finalizado:</label>
              <p className="ml-2">
                {data.serviceDetails.completed ? "Si" : "No"}
              </p>
            </div>
          </div>
        </section>
        <input
          type="submit"
          value="Actualizar"
          className="w-36 mt-1 py-2 px-4 bg-sky rounded-pill btn text-dark font-extrabold"
        />
      </form>
      {auth.role == "admin" || auth.role == "owner" ? (
        <section className="hidden sm:block border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
          <div className="text-center">
            <h3 className="font-semibold">Detalles de Pago</h3>
          </div>
          <div className="text-center mt-3">
            <div className="flex my-0.5">
              <label className="font-semibold">Facturar:</label>
              <p className="ml-2">{`${data.serviceDetails.firstname} ${data.serviceDetails.lastname}`}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">C.I.:</label>
              <p className="ml-2">{data.serviceDetails.dni}</p>
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Celular:</label>
              <p className="ml-2">{data.serviceDetails.phone}</p>
            </div>
            <div className="flex my-0.5 relative left-56">
              <label className="font-semibold">Finalizado:</label>
              <p className="ml-2">
                {data.serviceDetails.completed ? "Si" : "No"}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default UpdateOrder;
