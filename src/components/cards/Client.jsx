import { Link, useLocation } from "react-router-dom";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaDollarSign,
  FaCreditCard,
  FaCrown,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Client = ({ client, link = true }) => {
  const location = useLocation();
  const path = location.pathname;

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "CASH":
        return "Efectivo";
      case "MASTERCARD":
        return "Mastercard";
      case "VISA":
        return "Visa";
      case "OCA":
        return "Oca";
      case "TRANSFER":
        return "Transferencia";
      default:
        return "Sin método de pago";
    }
  };

  return link ? (
    <Link
      to={
        path === "/inicio"
          ? `/clientes/${client.clientNumber}`
          : `${client.clientNumber}`
      }
      key={client.id}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 shadow-2xl rounded-3xl max-w-sm mx-auto overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white">
                {client.firstname} {client.lastname}
              </h2>
              <p className="text-sm text-gray-400">
                {client.customer ? (
                  <span className="flex items-center">
                    <FaCrown className="text-yellow-400 mr-1" />
                    Abonado: {client.customerNumber}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaUser className="text-gray-400 mr-1" />
                    Cliente
                  </span>
                )}
              </p>
            </motion.div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
            >
              {client.clientNumber}
            </motion.span>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-full">
                <FaPhone className="text-white" />
              </div>
              <span className="text-gray-300 text-sm">{client.phone}</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <span className="text-gray-300 text-sm">{client.address}</span>
            </div>
            {client.email && (
              <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-2 rounded-full">
                  <FaEnvelope className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">{client.email}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
        />
      </motion.div>
    </Link>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-5 shadow-2xl rounded-3xl max-w-sm mx-auto overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 space-y-4"
      >
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white">
              {client.firstname} {client.lastname}
            </h2>
            <p className="text-sm text-gray-400">
              {client.customer ? (
                <span className="flex items-center">
                  <FaCrown className="text-yellow-400 mr-1" />
                  Abonado: {client.customerNumber}
                </span>
              ) : (
                <span className="flex items-center">
                  <FaUser className="text-gray-400 mr-1" />
                  Cliente
                </span>
              )}
            </p>
          </motion.div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
          >
            {client.clientNumber}
          </motion.span>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-full">
              <FaPhone className="text-white" />
            </div>
            <span className="text-gray-300 text-sm">{client.phone}</span>
          </div>
          <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <span className="text-gray-300 text-sm">{client.address}</span>
          </div>
          {client.email && (
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-2 rounded-full">
                <FaEnvelope className="text-white" />
              </div>
              <span className="text-gray-300 text-sm">{client.email}</span>
            </div>
          )}
          {client.customer && (
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-full">
                  <FaDollarSign className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">{client.amount}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-2 rounded-full">
                  <FaCreditCard className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">
                  {getPaymentMethodText(client.paymentMethod)}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
      />
    </motion.div>
  );
};

export default Client;
