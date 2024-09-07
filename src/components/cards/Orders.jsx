import { Link, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  UserIcon,
  IdentificationIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

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
    >
      <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Orden de Trabajo
            </h2>
            <div className="flex items-center text-gray-600">
              <IdentificationIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">{order.orderNumber}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <CalendarIcon className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-sm">Fecha: {order.dateOfOrder}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <ClipboardDocumentListIcon className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm">Tarea: {order.taskDescription}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <MapPinIcon className="h-4 w-4 mr-2 text-red-600" />
              <span className="text-sm">Dirección: {order.client.address}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <UserGroupIcon className="h-4 w-4 mr-2 text-yellow-600" />
              <span className="text-sm">
                Cliente: {order.client.firstname + " " + order.client.lastname}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <UserIcon className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm">
                Técnico:{" "}
                {order.userAssigned.firstname +
                  " " +
                  order.userAssigned.lastname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Order;
