import React from "react";
import {
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  WrenchIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

const DetailOrderTest = ({ order }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-3 sm:mx-auto mt-4 sm:mt-6 md:mt-10 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 mb-2 sm:mb-0">
          Orden de Servicio
        </h2>
        <span className="text-xl sm:text-2xl font-semibold text-indigo-600">
          #{order.orderNumber}
        </span>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3 sm:mb-4 flex items-center">
          <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Información del
          Cliente
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {order.client.firstname + " " + order.client.lastname}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Número de Cliente
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {order.client.clientNumber}
            </p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <p className="text-sm font-medium text-gray-500 flex items-center">
              <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Dirección
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              {order.client.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 flex items-center">
              <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Teléfono
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              {order.client.phone}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Estado de Abonado
            </p>
            <span
              className={`px-2 py-1 text-xs sm:text-sm font-semibold text-white rounded-full ${
                order.client.customerNumber === ""
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {order.client.customerNumber === "" ? "No Abonado" : "Abonado"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3 sm:mb-4 flex items-center">
          <WrenchIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" /> Detalles del
          Servicio
        </h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Tipo de Servicio
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              Aca iria el tipo de servicio por ejemplo sistema de camaras
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Descripción</p>
            <p className="text-sm sm:text-base text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-md">
              {order.taskDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner">
        <h3 className="text-lg sm:text-xl font-bold text-indigo-700 mb-3 sm:mb-4 flex items-center">
          <ClipboardDocumentCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />{" "}
          Estado y Asignación
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Estado Actual</p>
            <span className="px-3 py-1 text-sm sm:text-base font-semibold text-white bg-yellow-500 rounded-md inline-block">
              agregar estado de orden
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 flex items-center">
              Técnico Asignado
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {order.userAssigned.firstname + " " + order.userAssigned.lastname}
            </p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <p className="text-sm font-medium text-gray-500 flex items-center">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Fecha
              Programada
            </p>
            <p className="text-base sm:text-lg font-semibold text-indigo-600">
              {order.dateOfOrder}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderTest;
