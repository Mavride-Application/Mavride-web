import { Link } from "react-router-dom";
import {
  DownArrowIcon,
  FilterIcon,
  PlusIcon,
  ReplayIcon,
  TruckIcon,
} from "@/components/SvgIcons";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DriverDataTable from "@/components/FleetManagement/DataTable/DriverDataTable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns, data } from "@/components/FleetManagement/DataTable/Columns";
import PaginationButton from "@/components/UI/PaginationButton";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import usePagination from "@mui/material/usePagination";
import { cn, getFirstRowIndex, getLastRowIndex } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import Button from "@/components/UI/Button";
import { FormProvider, useForm } from "react-hook-form";
import FilterRadioInput from "@/components/FleetManagement/ui/FilterRadioInput";
import useVehicles from "@/hooks/useVehicles";

const ManageFleet = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data: vehicles, isLoading, isError } = useVehicles();

  const methods = useForm();
  const { handleSubmit, register } = methods;

  const table = useReactTable({
    data: vehicles ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    filterFns: {
      customIncludesString: (row, columnId, filterValue) => {
        const rowValue = row.getValue(columnId)?.toLowerCase() ?? "";
        return rowValue.includes(filterValue.toLowerCase());
      },
    },
    state: {
      columnFilters,
      pagination,
    },
  });

  const { items: paginationItems } = usePagination({
    count: table.getPageCount(),
    onChange: changePagination,
  });

  const filterDrivers = (e) => {
    const value = e.target.value;
    setColumnFilters((prev) => [...prev, { id: "assigned_driver", value }]);
  };

  function changePagination(event, value) {
    console.log(event, value);
    table.setPageIndex(value - 1);
  }

  const onSubmit = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      setColumnFilters((prev) => [...prev, { id: key, value }]);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">An error occurred...</div>;
  }

  return (
    <section className="flex w-full flex-col bg-white p-4">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Manage Fleet</h1>

        <Link
          className="flex items-center gap-2 rounded-md bg-mavride-blue px-4 py-3 font-medium text-white"
          to="add-vehicle"
        >
          <PlusIcon className="fill-white" />
          Add Vehicle
        </Link>
      </header>

      {false && (
        <div className="grid min-h-[80vh] place-items-center">
          <div className="flex flex-col items-center justify-center gap-3 text-light-grey">
            <TruckIcon className="stroke-light-grey" />
            <p className="max-w-[30.5rem] text-center">
              You have not added any vehicles yet. Click 'Add Vehicle' to
              register your first vehicle.
            </p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="mt-12">
        {/* Filter, Search & Sort  */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <header className="mb-4 flex items-center justify-between text-sm">
              <div className="flex items-center divide-x divide-grey-97 font-medium">
                <button className="flex w-fit items-center gap-3 py-2 pr-7">
                  <FilterIcon className="size-5 fill-white" />
                  <span>Sort By</span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-fit items-center gap-3 py-2 pl-4 pr-7">
                    Status
                    <DownArrowIcon className="size-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="block w-full min-w-80 py-6">
                    <div className="px-2">
                      <h4 className="mb-6 font-bold">Filter by status</h4>

                      <div className="flex items-center gap-3 text-sm">
                        <FilterRadioInput
                          label="Assigned"
                          name="all"
                          value={"assigned"}
                        />
                        <FilterRadioInput
                          label="Unassigned"
                          name="all"
                          value={"unassigned"}
                        />
                      </div>
                    </div>

                    <hr className="mb-5 mt-8" />

                    <Button
                      type="submit"
                      className="mx-auto w-fit px-8 py-2 text-sm"
                    >
                      Apply Now
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button className="flex w-fit items-center gap-2 py-2 pl-4 pr-7 text-[#EA0234]">
                  <ReplayIcon className="size-5 fill-[#EA0234]" />
                  <span>Reset Filter</span>
                </button>
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-4 content-center">
                  <MagnifyingGlassIcon className="size-5" />
                </span>

                <input
                  className="w-72 rounded-[0.625rem] bg-[#fafafa] py-3 pe-4 ps-12 outline-none"
                  name="search"
                  placeholder="Search Registered Driver"
                  onChange={filterDrivers}
                />
              </div>
            </header>
          </form>
        </FormProvider>
        {/* Data Table Component */}
        <section className="pb-6">
          <DriverDataTable table={table} columns={columns} />

          <div className="mx-auto mt-10 flex max-w-4xl items-center justify-between text-sm">
            <p className="text-[#B5B7C0]">
              Showing data {getFirstRowIndex(table.getState()?.pagination)} to{" "}
              {getLastRowIndex(
                table.getState()?.pagination,
                table.getRowCount(),
              )}{" "}
              of {table.getRowCount()} entries
            </p>

            {/* Pagination buttons */}
            <ul className="m-0 flex items-end gap-3 p-0">
              {paginationItems.map(
                ({ page, type, selected, ...item }, index) => {
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
                },
              )}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
};
export default ManageFleet;
