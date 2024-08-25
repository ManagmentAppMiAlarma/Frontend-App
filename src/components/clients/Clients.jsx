import React, { useState } from "react";
import ListClients from "../listAndTable/ListClients";
import NavBack from "../navegation/NavBack";
import Table from "../listAndTable/Table";
import { useClients } from "../../hooks";

const Clients = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useClients(page, limit);

  const totalPages = data ? data?.meta.lastPage : 1;

  const columns = [
    {
      header: "Nº Cliente",
      accessorKey: "clientNumber",
    },
    {
      header: "Nombre y Apellido",
      accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    },
    {
      header: "Telefono",
      accessorKey: "phone",
    },
    {
      header: "Direccion",
      accessorKey: "address",
    },
    {
      header: "Correo Electronico",
      accessorKey: "email",
    },
  ];

  const [isOpenCreateClientsModal, setIsOpenCreateClientsModal] =
    useState(true);

  const handleOpenModalClients = () => {
    setIsOpenCreateClientsModal(true);
  };
  const handleCloseModalClients = () => {
    setIsOpenCreateClientsModal(false);
  };
  return (
    <main className="min-h-screen">
      <NavBack
        text="Gestion de Clientes"
        create={true}
        handleOpenModalClients={handleOpenModalClients}
      />
      {isError ? (
        <div>Error al cargar los datos.</div>
      ) : (
        <>
          <ListClients
            isOpenCreateClientsModal={isOpenCreateClientsModal}
            handleCloseModalClients={handleCloseModalClients}
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

export default Clients;
