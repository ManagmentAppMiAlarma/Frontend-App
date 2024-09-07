import { Link, useLocation } from "react-router-dom";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Client = ({ client, link = true }) => {
  const location = useLocation();
  const path = location.pathname;
  return link ? (
    <Link
      to={
        path === "/inicio"
          ? `/clientes/${client.clientNumber}`
          : `${client.clientNumber}`
      }
      key={client.id}
    >
      <div className="mb-5 shadow-lg rounded-2xl max-w-md mx-auto overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-pink-700 p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">
                {client.firstname} {client.lastname}
              </h2>
              <p className="text-sm opacity-75">
                {client.customer
                  ? `Abonado: ${client.customerNumber}`
                  : "Cliente"}
              </p>
            </div>
            <span className="bg-white text-purple-600 text-sm font-bold px-2 py-1 rounded-full">
              {client.clientNumber}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <FaPhone className="text-purple-600" />
              </div>
              <span className="text-gray-700 text-sm">{client.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-pink-100 p-2 rounded-full">
                <FaMapMarkerAlt className="text-pink-600" />
              </div>
              <span className="text-gray-700 text-sm">{client.address}</span>
            </div>
          </div>
          {client.email && (
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaEnvelope className="text-blue-600" />
              </div>
              <span className="text-gray-700 text-sm">{client.email}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  ) : (
    <div className="mb-5 shadow-lg rounded-2xl max-w-md mx-4 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-700 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">
              {client.firstname} {client.lastname}
            </h2>
            <p className="text-sm opacity-75">
              {client.customer
                ? `Abonado: ${client.customerNumber}`
                : "Cliente"}
            </p>
          </div>
          <span className="bg-white text-purple-600 text-sm font-bold px-2 py-1 rounded-full">
            {client.clientNumber}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <FaPhone className="text-purple-600" />
            </div>
            <span className="text-gray-700 text-sm">{client.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-pink-100 p-2 rounded-full">
              <FaMapMarkerAlt className="text-pink-600" />
            </div>
            <span className="text-gray-700 text-sm">{client.address}</span>
          </div>
        </div>
        {client.email && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaEnvelope className="text-blue-600" />
            </div>
            <span className="text-gray-700 text-sm">{client.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
