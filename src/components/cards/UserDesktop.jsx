import React from "react";

const ClientDesktop = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-300">
      <div className="md:flex">
        <div className="md:w-1/2 bg-blue-600 p-8 text-center">
          <div className="w-48 h-48 mx-auto rounded-full bg-white flex items-center justify-center text-blue-600 text-6xl font-bold mb-4">
            {user.firstname[0]}
            {user.lastname[0]}
          </div>
          <h2 className="text-3xl font-bold text-white">
            {user.firstname} {user.lastname}
          </h2>
          <div className="mt-6 text-left text-white">
            <InfoItem icon="📧" value={user.email} />
            <InfoItem icon="📞" value={user.phone} />
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-blue-500">
            Informacion sobre el Usuario
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Cedula de Identidad" value={user.dni} />

            <DetailItem
              label="Rol"
              value={
                user.role == "owner" || user.role == "admin"
                  ? "Administrativo"
                  : "Tecnico"
              }
            />

            <DetailItem
              label="Ingreso"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, value }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span className="text-xl">{icon}</span>
    <span>{value}</span>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="mb-2">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default ClientDesktop;
