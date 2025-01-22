import { getFirstRowIndex, getLastRowIndex } from "@/lib/utils";
import PaginationButtons from "./PaginationButtons";

const TableFooter = ({ table }) => {
  return (
    <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between text-sm">
      <p className="text-[#B5B7C0]">
        Showing data {getFirstRowIndex(table.getState()?.pagination)} to{" "}
        {getLastRowIndex(table.getState()?.pagination, table.getRowCount())} of{" "}
        {table.getRowCount()} {table.getRowCount() > 1 ? "entries" : "entry"}
      </p>

      {/* Pagination buttons */}
      {table.getPageCount() > 1 && <PaginationButtons table={table} />}
    </div>
  );
};
export default TableFooter;
