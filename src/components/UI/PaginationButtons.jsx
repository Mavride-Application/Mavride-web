import PaginationButton from "./PaginationButton";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import usePagination from "@mui/material/usePagination";
import { cn } from "@/lib/utils";

const PaginationButtons = ({ table }) => {
  function changePagination(event, value) {
    table.setPageIndex(value - 1);
  }

  const { items: paginationItems } = usePagination({
    count: table.getPageCount(),
    onChange: changePagination,
  });

  return (
    <ul className="m-0 flex items-end gap-3 p-0">
      {paginationItems.map(({ page, type, selected, ...item }, index) => {
        if (/(start-ellipsis|end-ellipsis)/.test(type)) {
          return (
            <li key={type}>
              <Ellipsis />
            </li>
          );
        }
        if (type === "previous")
          return (
            <li key={type}>
              <PaginationButton {...item}>
                <ChevronLeft className="mx-auto inline-block w-4" />
              </PaginationButton>
            </li>
          );
        if (type === "next")
          return (
            <li key={type}>
              <PaginationButton {...item}>
                <ChevronRight className="mx-auto inline-block w-4" />
              </PaginationButton>
            </li>
          );

        return (
          <li key={page}>
            <PaginationButton
              className={cn({
                "bg-[#D2D9F9]":
                  table.getState().pagination.pageIndex + 1 === page,
              })}
              {...item}
            >
              {page}
            </PaginationButton>
          </li>
        );
      })}
    </ul>
  );
};
export default PaginationButtons;
