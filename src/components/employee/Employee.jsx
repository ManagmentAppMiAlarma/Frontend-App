import React from "react";
import Table from "../listAndTable/Table";
import UserCreationForm from "./UserCreationForm";

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
      <UserCreationForm />
      {/* <Table columns={columns} data={data} /> */}
    </main>
  );
};

export default Employee;
