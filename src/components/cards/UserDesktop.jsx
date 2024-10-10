import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const UserDesktop = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-700"
    >
      <div className="md:flex">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="w-48 h-48 mx-auto rounded-full bg-white flex items-center justify-center text-blue-600 text-6xl font-bold mb-4 shadow-lg"
          >
            {user.firstname[0]}
            {user.lastname[0]}
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-6"
          >
            {user.firstname} {user.lastname}
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-left text-white space-y-4"
          >
            <InfoItem icon={FaEnvelope} value={user.email} />
            <InfoItem icon={FaPhone} value={user.phone} />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2 p-8"
        >
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-semibold mb-6 text-white border-b border-blue-500 pb-2"
          >
            Información sobre el Usuario
          </motion.h3>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 gap-4"
          >
            <DetailItem
              icon={FaIdCard}
              label="Cédula de Identidad"
              value={user.dni}
            />
            <DetailItem
              icon={FaUser}
              label="Rol"
              value={
                user.role === "owner" || user.role === "admin"
                  ? "Administrativo"
                  : "Técnico"
              }
            />
            <DetailItem
              icon={FaCalendarAlt}
              label="Ingreso"
              value={new Date(user.createdAt).toLocaleDateString()}
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

export default UserDesktop;
