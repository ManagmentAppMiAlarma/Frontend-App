import React from "react";
import data from "../../helpers/MOCK_DATA.json";
import Table from "../table/Table";

const Employee = () => {
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
    <main className="mb-5 text-center items-center">
      <h1 className="font-semibold text-2xl mb-3 mt-4">Gestion de empleados</h1>
      <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-2">
        Crear empleado
      </button>
      <Table columns={columns} data={data} />
    </main>
  );
};

export default Employee;
