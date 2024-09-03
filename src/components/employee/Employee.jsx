import React, { useState } from "react";
import Table from "../listAndTable/Table";
import { useUsers } from "../../hooks/useUsers";
import ListUsers from "../listAndTable/ListUsers";
import NavBack from "../navegation/NavBack";

const Employee = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useUsers(page, limit);

  const totalPages = data ? data?.meta.lastPage : 1;

  const columns = [
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    },
    {
      header: "Correo Electronico",
      accessorKey: "email",
    },
    {
      header: "Cedula",
      accessorKey: "dni",
    },
    {
      header: "Telefono",
      accessorKey: "phone",
    },
    {
      header: "Permiso",
      accessorFn: (row) =>
        row.role == "admin" || row.role == "owner"
          ? "Administrador"
          : "Tecnico",
    },
  ];

  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false);

  const handleOpenModalUser = () => {
    setIsOpenCreateUserModal(true);
  };
  const handleCloseModalUser = () => {
    setIsOpenCreateUserModal(false);
  };

  return (
    <main className="mb-5 sm:min-h-screen">
      <NavBack
        text="Gestion de Empleados"
        handleOpenModal={handleOpenModalUser}
        disable={false}
      />
      {isError ? (
        <div>Error al cargar los datos.</div>
      ) : (
        <>
          <ListUsers
            isOpenCreateModal={isOpenCreateUserModal}
            handleCloseModal={handleCloseModalUser}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            data={data}
          />
          <Table
            content={data}
            columns={columns}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            isLoading={isLoading}
          />
        </>
      )}
    </main>
  );
};

export default Employee;
