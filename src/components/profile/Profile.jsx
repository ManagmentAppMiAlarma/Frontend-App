import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useAuth } from "../../hooks";

const Profile = () => {
  const { auth } = useAuth();
  const { firstname, lastname, dni, email, role, phone } = auth;
  return (
    <main>
      <div className="min-h-screen bg-white flex justify-center p-2.5">
        <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden max-w-2xl w-full max-h-fit">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gray-100 rounded-t-3xl"></div>
          <div className="relative p-3">
            <div className="flex flex-col sm:flex-row items-center mb-3">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4 sm:mb-0 sm:mr-6"
                src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&size=128&background=e5e7eb&color=4f46e5`}
                alt={`${firstname} ${lastname}`}
              />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{`${firstname} ${lastname}`}</h1>
                <p className="text-indigo-600 font-medium text-lg">
                  {role == "owner" || role == "admin"
                    ? "Administrador"
                    : "Técnico"}
                </p>
              </div>
            </div>
            <div className="space-y-4 bg-gray-50 rounded-2xl p-3 shadow-inner">
              <InfoItem icon="📱" label="Teléfono" value={phone} />
              <InfoItem icon="✉️" label="Email" value={email} />
              <InfoItem icon="🆔" label="DNI" value={dni} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
      <span className="text-xl mr-4">{icon}</span>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );
}
export default Profile;
