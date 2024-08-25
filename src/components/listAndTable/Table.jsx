import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({ columns, content, totalPages, page, setPage, isLoading }) => {
  if (isLoading) return <div>Cargando...</div>;
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
                  return (
                    <td
                      key={cell.id}
                      className="border py-1.5 px-2 min-w-fit truncate"
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
    </div>
  );
};

export default Table;
