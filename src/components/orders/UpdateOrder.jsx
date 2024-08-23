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
      <form onSubmit={updateOrder} className="flex flex-col justify-center">
        <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
          <div>
            <label className="font-semibold">Ubicacion:</label>
            <input
              placeholder={data.client.address}
              className="pl-1 ml-2 rounded outline-none"
              onChange={changed}
            />
          </div>
          <div className="flex mt-2">
            <div className="flex my-0.5">
              <label className="font-semibold">Nº Orden:</label>
              <input
                placeholder={data.orderNumber}
                className="h-6 w-[85px] pl-1 ml-2 rounded outline-none"
                onChange={changed}
              />
            </div>
            <div className="flex ml-3 my-0.5">
              <label className="font-semibold">Fecha:</label>
              <input
                className="h-6 w-[92px] pl-1 ml-2 rounded outline-none"
                placeholder={data.dateOfOrder}
                onChange={changed}
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
              <input
                className="ml-2"
                placeholder={`${data.client.firstname} ${data.client.lastname}`}
                onChange={changed}
              />
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Celular:</label>
              <input
                className="ml-2"
                placeholder={data.client.phone}
                onChange={changed}
              />
            </div>
            <div className="flex my-0.5">
              <label className="font-semibold">Email:</label>
              <input
                className="ml-2"
                placeholder={
                  data.client.email ? "Sin email" : data.client.email
                }
                onChange={changed}
              />
            </div>

            <div className="flex">
              <div className="flex my-0.5">
                <label className="font-semibold">Nº Cliente:</label>
                <input
                  className="ml-2"
                  placeholder={data.client.clientNumber}
                  onChange={changed}
                />
              </div>
              <div>
                <div className="flex my-0.5 ml-7">
                  <label className="font-semibold">Abonado?:</label>
                  <input
                    className="ml-2"
                    placeholder={data.client.customer ? "Si" : "No"}
                    onChange={changed}
                  />
                </div>
                <div className="flex my-0.5 ml-7">
                  <label className="font-semibold">Nº Abonado:</label>
                  <input
                    className="ml-2"
                    placeholder={data.client.customerNumber}
                    onChange={changed}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <h3 className="font-semibold">Descripcion:</h3>
                <textarea
                  placeholder={data.serviceDetails.description}
                  onChange={changed}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="border rounded-2xl px-4 py-2 mb-3 mt-1 mx-3 bg-slate-300">
          <div className="text-center">
            <h3 className="font-semibold">Tareas realizadas:</h3>
            <textarea
              placeholder={data.serviceDetails.taskDone}
              onChange={changed}
            />
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
              <input
                placeholder={data.serviceDetails.completed ? "Si" : "No"}
                onChange={changed}
              />
            </div>
          </div>
        </section>
        {auth.role == "admin" || auth.role == "owner" ? (
          <section className="hidden sm-block border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300">
            <div className="text-center">
              <h3 className="font-semibold">Detalles de Pago</h3>
            </div>
            <div className="mt-3">
              <div className="my-1">
                <div className="flex">
                  <label className="font-semibold">Facturar:</label>
                  <input
                    className="ml-2"
                    placeholder={
                      data.serviceDetailsPayment.invoiceDone ? "Si" : "No"
                    }
                    onChange={changed}
                  />
                  <p className="ml-24 font-semibold">N Factura: -</p>
                </div>
                <div>
                  <span className="font-semibold">Moneda: </span>
                  <input
                    placeholder={data.serviceDetailsPayment.paymentMethod}
                    onChange={changed}
                  />
                </div>
              </div>
              <div className="my-1">
                <div className="flex">
                  <label className="font-semibold">Ingreso del pago:</label>
                  <p className="ml-2">
                    {data.serviceDetailsPayment.paymentReceiptDone
                      ? "Si"
                      : "No"}
                  </p>
                </div>
                <div className="flex">
                  <label className="font-semibold">
                    Informacion sobre el pago:
                  </label>
                  <p className="ml-2">
                    {data.serviceDetailsPayment.paymentReceiptComments}
                  </p>
                </div>
                <div className="flex my-1">
                  <label className="font-semibold">Recibo emitido:</label>
                  <p className="ml-2">
                    {data.serviceDetails.completed ? "Si" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        <input
          type="submit"
          value="Actualizar"
          className="w-36 mt-1 py-2 px-4 bg-sky rounded-pill btn text-dark font-extrabold mx-auto"
        />
      </form>
    </main>
  );
};

export default UpdateOrder;
