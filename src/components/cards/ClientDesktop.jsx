import React from "react";
import { Global, paymentMethodType } from "../../helpers";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaUser,
  FaCreditCard,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";

const ClientDesktop = ({ client }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-700"
    >
      <div className="md:flex">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-2/5 bg-gradient-to-br from-blue-600 to-purple-600 p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="w-56 h-56 mx-auto rounded-full bg-white flex items-center justify-center text-blue-600 text-7xl font-bold mb-6 shadow-lg"
          >
            {client.firstname[0]}
            {client.lastname[0]}
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-4xl font-bold text-white mb-6"
          >
            {client.firstname} {client.lastname}
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-left text-white space-y-4"
          >
            <InfoItem icon={FaEnvelope} value={client.email || "N/A"} />
            <InfoItem icon={FaPhone} value={client.phone} />
            <InfoItem icon={FaHome} value={client.address} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-3/5 p-10"
        >
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-semibold mb-8 text-white border-b border-blue-500 pb-2"
          >
            Información del Cliente
          </motion.h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 gap-6"
          >
            <DetailItem
              icon={FaUser}
              label="Número de Cliente"
              value={client.clientNumber}
            />
            {client.customer && (
              <>
                <DetailItem
                  icon={FaUser}
                  label="Número de Abonado"
                  value={client.customerNumber}
                />
                <DetailItem
                  icon={FaCreditCard}
                  label="Método de Pago"
                  value={paymentMethodType(
                    client.paymentMethod,
                    Global.typesMethodList,
                    Global.typesMethod
                  )}
                />
                <DetailItem
                  icon={FaDollarSign}
                  label="Monto"
                  value={`$${client.amount.toFixed(2)}`}
                />
              </>
            )}
            <DetailItem
              icon={FaCalendarAlt}
              label="Fecha de Ingreso"
              value={new Date(client.createdAt).toLocaleDateString()}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon: Icon, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-3"
  >
    <Icon className="text-2xl text-blue-300" />
    <span className="text-lg">{value}</span>
  </motion.div>
);

const DetailItem = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 rounded-lg p-4 shadow-md"
  >
    <div className="flex items-center space-x-3 mb-2">
      <Icon className="text-2xl text-blue-400" />
      <p className="text-sm text-gray-400">{label}</p>
    </div>
    <p className="font-semibold text-white text-lg">{value}</p>
  </motion.div>
);

export default ClientDesktop;
