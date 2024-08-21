import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useCallback, useState } from "react";

const Table = ({ columns, content }) => {
  const [filtering, setFiltering] = useState("");
  const { data } = content;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  const handleFirstPage = useCallback(() => {
    table.setPageIndex(0);
  }, [table]);

  const handlePreviousPage = useCallback(() => {
    table.previousPage();
  }, [table]);

  const handleNextPage = useCallback(() => {
    table.nextPage();
  }, [table]);

  const handleLastPage = useCallback(() => {
    table.setPageIndex(table.getPageCount() - 1);
  }, [table]);

  const nav = [
    {
      id: 1,
      label: "Inicio",
      onClick: handleFirstPage,
    },
    {
      id: 2,
      label: "Anterior",
      onClick: handlePreviousPage,
    },
    {
      id: 3,
      label: "Siguiente",
      onClick: handleNextPage,
    },
    {
      id: 4,
      label: "Final",
      onClick: handleLastPage,
    },
  ];

  return (
    <div className="mx-3 mt-4 text-sm">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="border border-slate-500 px-5 py-1.5 rounded-2xl mb-4"
        placeholder="Buscar..."
      />
      <table className="w-full my-2 ">
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
                  return (
                    <td
                      key={cell.id}
                      className="border py-1.5 px-2 max-w-[150px] truncate"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        {nav.map((button) => {
          return (
            <button
              key={button.id}
              onClick={button.onClick}
              className="rounded-md bg-gray-300 px-2.5 py-1.5 text-xs font-semibold shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 mx-2"
            >
              {button.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
