import React, { useState } from "react";
import Table from "../listAndTable/Table";
import UserCreationForm from "./UserCreationForm";
import { Pagination } from "../pagination";

const Employee = () => {
  const initialPage = 1;
  const maxNumberPage = 10;

  const [page, setPage] = useState(initialPage);
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
      <Pagination className={'p-4'} total={maxNumberPage} current={page} onChange={setPage} />
    </main>
  );
};

export default Employee;
