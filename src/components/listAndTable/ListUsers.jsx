import React from "react";
import User from "../cards/User";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

const ListUsers = ({ totalPages, page, setPage, isLoading, data }) => {
  return (
    <section className="container mx-auto mt-8 px-2 sm:hidden">
      {isLoading ? (
        <PuffLoaderComponent isLoading={isLoading} />
      ) : (
        // Mostrar los datos cuando se hayan cargado
        data?.data?.map((user) => <User user={user} key={user.id} />)
      )}

      {/* Controles de paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setPage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={page === 1}
          className="px-2 py-1 mx-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className=" py-2 mx-4">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => {
            setPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={page === totalPages}
          className="px-2 py-1 mx-2 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default ListUsers;
