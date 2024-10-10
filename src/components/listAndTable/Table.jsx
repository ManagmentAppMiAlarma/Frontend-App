import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useLocation } from "react-router-dom";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

const Table = ({ columns, content, isLoading, caseFor, handleLimitChange }) => {
  const location = useLocation();
  const path = location.pathname;
  const data = content?.data || content;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="hidden sm:block max-w-6xl mt-4 text-sm mx-auto px-4">
      <div className="flex lg:justify-end items-center gap-4 my-4">
        <label>Cantidad de resultados por página: </label>
        <div className="font-semibold text-gray-300 transition-all">
          <button
            onClick={() => handleLimitChange(10)}
            className="w-10 px-1.5 py-0.5 mx-1 rounded-lg bg-gray-700 hover:bg-gray-800 hover:text-white  disabled:opacity-50"
          >
            10
          </button>
          <button
            onClick={() => handleLimitChange(25)}
            className="w-10 px-1.5 py-0.5 mx-1 rounded-lg bg-gray-700 hover:bg-gray-800 hover:text-white  disabled:opacity-50"
          >
            25
          </button>
          <button
            onClick={() => handleLimitChange(50)}
            className="w-10 px-1.5 py-0.5 mx-1 rounded-lg bg-gray-700 hover:bg-gray-800 hover:text-white  disabled:opacity-50"
          >
            50
          </button>
          <button
            onClick={() => handleLimitChange(100)}
            className="w-10 px-1.5 py-0.5 mx-1 rounded-lg bg-gray-700 hover:bg-gray-800 hover:text-white  disabled:opacity-50"
          >
            100
          </button>
        </div>
      </div>
      {isLoading ? (
        <PuffLoaderComponent isLoading={isLoading} />
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white">
            <thead className="bg-gradient-to-r from-gray-700 to-black text-white">
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
      )}
    </div>
  );
};

export default Table;
