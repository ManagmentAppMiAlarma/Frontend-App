import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Table = ({
  columns,
  content,
  totalPages,
  page,
  setPage,
  isLoading,
  caseFor,
}) => {
  const location = useLocation();
  const path = location.pathname;
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PuffLoader color={"#dc2626"} loading={isLoading} size={50} />
      </div>
    );
  const { data } = content;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="hidden sm:block max-w-6xl mt-4 text-sm mx-auto px-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-4 text-left font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                {row.getVisibleCells().map((cell) => {
                  const isClickable =
                    (caseFor === "clients" &&
                      cell.column.id === "clientNumber") ||
                    (caseFor === "employee" && cell.column.id === "dni");

                  return (
                    <td
                      key={cell.id}
                      className="py-3 px-4 border-b border-gray-200"
                    >
                      {isClickable ? (
                        <Link
                          to={
                            path === "/inicio"
                              ? `/${
                                  caseFor === "clients"
                                    ? "clientes"
                                    : "empleados"
                                }/${
                                  caseFor === "clients"
                                    ? row.original.clientNumber
                                    : row.original.dni
                                }`
                              : `${
                                  caseFor === "clients"
                                    ? row.original.clientNumber
                                    : row.original.dni
                                }`
                          }
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
};

export default Table;
