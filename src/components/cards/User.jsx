import { Link, useLocation } from "react-router-dom";
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FaUser, FaPhone, FaIdCard, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const User = ({ user, link = true }) => {
  const location = useLocation();
  const path = location.pathname;
  return link ? (
    <Link
      to={path === "/inicio" ? `/empleados/${user.dni}` : `${user.dni}`}
      key={user.id}
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
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-sm text-gray-400">
              <span className="flex items-center">
                <FaUser className="text-red-500 mr-1" />
                {user.role === "admin" || user.role === "owner"
                  ? "Administrador"
                  : "Técnico"}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <FaPhone className="text-red-500 text-xl" />
              <span className="text-gray-300 text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <FaIdCard className="text-red-500 text-xl" />
              <span className="text-gray-300 text-sm">{user.dni}</span>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
              <FaEnvelope className="text-red-500 text-xl" />
              <span className="text-gray-300 text-sm">{user.email}</span>
            </div>
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
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-sm text-gray-400">
            <span className="flex items-center">
              <FaUser className="text-red-500 mr-1" />
              {user.role === "admin" || user.role === "owner"
                ? "Administrador"
                : "Técnico"}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
            <FaPhone className="text-red-500 text-xl" />
            <span className="text-gray-300 text-sm">{user.phone}</span>
          </div>
          <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
            <FaIdCard className="text-red-500 text-xl" />
            <span className="text-gray-300 text-sm">{user.dni}</span>
          </div>
          <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded-xl">
            <FaEnvelope className="text-red-500 text-xl" />
            <span className="text-gray-300 text-sm">{user.email}</span>
          </div>
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

export default User;
