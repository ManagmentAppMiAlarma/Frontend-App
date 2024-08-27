import { Link, useLocation } from "react-router-dom";

const Order = ({ order }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Link
      to={
        path === "/inicio"
          ? `ordenes/${order.orderNumber}`
          : `${order.orderNumber}`
      }
      key={order.id}
    >
      <article className="rounded-2xl px-4 py-2 my-3 mx-1 bg-slate-300 sm:w-[380px]">
        <div className="mb-1">
          <label className="font-bold">Nº orden:</label>
          <p className="inline-block ml-2">{order.orderNumber}</p>
        </div>
        <div className="mb-1">
          <label className="font-bold">Fecha:</label>
          <p className="inline-block ml-2">{order.dateOfOrder}</p>
        </div>
        <div className="mb-1">
          <label className="font-bold">Tarea:</label>
          <p className="inline-block ml-2">{order.taskDescription}</p>
        </div>
        <div className="mb-1">
          <label className="font-bold">Direccion:</label>
          <p className="inline-block ml-2">{order.client.address}</p>
        </div>
        <div className="mb-1">
          <label className="font-bold">Tecnico asignado:</label>
          <p className="inline-block ml-2">{`${order.userAssigned.firstname} ${order.userAssigned.lastname}`}</p>
        </div>
      </article>
    </Link>
  );
};

export default Order;
