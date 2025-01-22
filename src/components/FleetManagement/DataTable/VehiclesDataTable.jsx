import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import TableFooter from "@/components/UI/TableFooter";
import { flexRender } from "@tanstack/react-table";

const VehicleDataTable = ({ table, columns }) => {
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="h-[4.125rem] text-center hover:bg-transparent"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableHead className="font-semibold" key={header.id}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="text-center"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="h-[4.125rem] text-center">
              <TableCell colSpan={columns?.length}>No Results.</TableCell>{" "}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Data table footer */}
      <TableFooter colSpan={columns?.length} table={table} />
    </>
  );
};
export default VehicleDataTable;
