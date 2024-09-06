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
    <div className="max-w-fit mt-4 text-sm hidden sm:block mx-auto">
      <table className="w-full my-2 border">
        <thead className="bg-red-500">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id} className="w-full">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="py-1 px-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="text-center text-xs">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => {
                  if (caseFor === "clients") {
                    const isClickable = cell.column.id === "clientNumber";

                    return (
                      <td
                        key={cell.id}
                        className="border py-1.5 px-2 min-w-fit truncate"
                      >
                        {isClickable ? (
                          <Link
                            to={
                              path === "/inicio"
                                ? `/clientes/${row.original.clientNumber}`
                                : `${row.original.clientNumber}`
                            }
                            className="text-blue-500 hover:underline"
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
                  } else if (caseFor === "employee") {
                    const isClickable = cell.column.id === "dni";

                    return (
                      <td
                        key={cell.id}
                        className="border py-1.5 px-2 min-w-fit truncate"
                      >
                        {isClickable ? (
                          <Link
                            to={
                              path === "/inicio"
                                ? `/empleados/${row.original.dni}`
                                : `${row.original.dni}`
                            }
                            className="text-blue-500 hover:underline"
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
                  } else null;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
