import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaUserShield,
  FaUserCog,
} from "react-icons/fa";
import React from "react";
import { useAuth } from "../../hooks";

const Profile = () => {
  const { auth } = useAuth();
  const { firstname, lastname, dni, email, role, phone } = auth;
  return (
    <main className="min-h-screen flex justify-center items-center p-4">
      <section className="relative w-full max-w-fit bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-10"
          aria-hidden="true"
        ></div>
        <div className="relative p-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <figure className="relative">
            <img
              className="w-48 h-48 rounded-full object-cover border-4 border-red-500 shadow-xl"
              src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&size=192&background=6366f1&color=ffffff`}
              alt={`${firstname} ${lastname}`}
            />
            <figcaption className="absolute -bottom-2 -right-2 bg-red-500 rounded-full p-3 border-4 border-white">
              {role === "owner" || role === "admin" ? (
                <FaUserShield
                  className="h-6 w-6 text-white"
                  aria-label="Administrador"
                />
              ) : (
                <FaUserCog
                  className="h-6 w-6 text-white"
                  aria-label="Técnico"
                />
              )}
            </figcaption>
          </figure>
          <div className="text-center md:text-left flex-1">
            <motion.h1
              className="text-5xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {`${firstname} ${lastname}`}
            </motion.h1>
            <motion.p
              className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {role === "owner" || role === "admin"
                ? "Administrador"
                : "Técnico"}
            </motion.p>
            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <InfoItem icon={FaPhone} label="Teléfono" value={phone} />
              <InfoItem icon={FaEnvelope} label="Email" value={email} />
              <InfoItem icon={FaIdCard} label="DNI" value={dni} />
            </motion.section>
          </div>
        </div>
        <motion.footer
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          aria-hidden="true"
        ></motion.footer>
      </section>
    </main>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <article className="flex items-center space-x-4 p-4 bg-gray-800 rounded-xl backdrop-blur-sm bg-opacity-50">
    <Icon className="h-5 w-5 lg:h-8 lg:w-8 text-red-500" aria-hidden="true" />
    <div className="text-left">
      <h3 className="text-sm font-medium text-gray-400">{label}</h3>
      <p className="text-md font-semibold text-white">{value}</p>
    </div>
  </article>
);
export default Profile;
