import React from "react";
import ListClients from "../listAndTable/ListClients";
import NavBack from "../navegation/NavBack";

const Clients = () => {
  return (
    <main className="min-h-screen">
      <NavBack text="Gestion de Clientes" create={true} />
      <ListClients />
    </main>
  );
};

export default Clients;
