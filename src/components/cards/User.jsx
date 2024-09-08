import { Link, useLocation } from "react-router-dom";
import {
  UserIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const User = ({ user, link = true }) => {
  const location = useLocation();
  const path = location.pathname;
  return link ? (
    <Link
      to={path === "/inicio" ? `/empleados/${user.dni}` : `${user.dni}`}
      key={user.id}
    >
      <div className="mb-5 bg-gray-50 shadow-xl rounded-3xl px-6 py-4 mx-6 border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-2 mb-3 shadow-lg">
            <UserIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {user.firstname} {user.lastname}
          </h2>
          <span className="text-sm text-gray-500 capitalize">
            {user.role == "admin" || user.role == "owner"
              ? "Administrador"
              : "Tecnico"}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center border-b border-gray-200 pb-2">
            <IdentificationIcon className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-700 text-sm">{user.dni}</span>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-2">
            <EnvelopeIcon className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-700 text-sm truncate">{user.email}</span>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-5 w-5 text-red-500 mr-3" />
            <span className="text-gray-700 text-sm">{user.phone}</span>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="my-5 bg-gray-50 shadow-xl rounded-3xl px-6 py-4 mx-6 border border-gray-200">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full p-2 mb-3 shadow-lg">
          <UserIcon className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {user.firstname} {user.lastname}
        </h2>
        <span className="text-sm text-gray-500 capitalize">
          {user.role == "admin" || user.role == "owner"
            ? "Administrador"
            : "Tecnico"}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center border-b border-gray-200 pb-2">
          <IdentificationIcon className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-gray-700 text-sm">{user.dni}</span>
        </div>
        <div className="flex items-center border-b border-gray-200 pb-2">
          <EnvelopeIcon className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-gray-700 text-sm truncate">{user.email}</span>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-gray-700 text-sm">{user.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
