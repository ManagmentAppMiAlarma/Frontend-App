import React from "react";
import Table from "../table/Table";
import data from "../../helpers/MOCK_DATA.json";

const Clients = () => {
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    },
    // {
    //   header: "Email",
    //   accessorKey: "email",
    // },
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "ID",
      accessorKey: "id",
    },
    // {
    //   header: "Fecha",
    //   accessorKey: "fecha",
    //   cell: (info) => dayjs(into.getValue()).format("DD/MM/YYYY"),
    // },
  ];

  return (
    <main className="h-screen text-center">
      <h1 className="font-semibold text-2xl mb-3 mt-4">Gestion de clientes</h1>
      <Table columns={columns} data={data} />
    </main>
  );
};

export default Clients;
