import React from "react";
import { Global, paymentMethodType } from "../../helpers";

const ClientDesktop = ({ client }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-300">
      <div className="md:flex">
        <div className="md:w-1/3 bg-blue-600 p-8 text-center">
          <div className="w-48 h-48 mx-auto rounded-full bg-white flex items-center justify-center text-blue-600 text-6xl font-bold mb-4">
            {client.firstname[0]}
            {client.lastname[0]}
          </div>
          <h2 className="text-3xl font-bold text-white">
            {client.firstname} {client.lastname}
          </h2>
          <div className="mt-6 text-left text-white">
            <InfoItem icon="📧" value={client.email || "N/A"} />
            <InfoItem icon="📞" value={client.phone} />
            <InfoItem icon="🏠" value={client.address} />
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-blue-500">
            Informacion sobre el Cliente
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem
              label="Numero de Cliente"
              value={client.customerNumber}
            />
            {client.customer ? (
              <>
                <DetailItem
                  label="Numero de Abonado"
                  value={client.customerNumber}
                />
                <DetailItem
                  label="Metodo de Pago"
                  value={paymentMethodType(
                    client.paymentMethod,
                    Global.typesMethodList,
                    Global.typesMethod
                  )}
                />
                <DetailItem
                  label="Monto"
                  value={`$${client.amount.toFixed(2)}`}
                />
              </>
            ) : null}

            <DetailItem
              label="Ingreso"
              value={new Date(client.createdAt).toLocaleDateString()}
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
