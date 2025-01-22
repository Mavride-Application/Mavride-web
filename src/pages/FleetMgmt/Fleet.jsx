import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "@/components/FleetManagement/DataTable/Columns";
import { useState } from "react";

import useVehicles from "@/hooks/Fleet/useVehicles";
import FilterControls, {
  DropdownFilter,
  ResetFilters,
  SortBy,
} from "@/components/UI/FilterControls";
import PageHeader from "@/components/UI/PageHeader";
import NoData from "@/components/UI/NoData";
import { TruckIcon } from "@/components/SvgIcons";
import VehicleDataTable from "@/components/FleetManagement/DataTable/VehiclesDataTable";

const ManageFleet = () => {
  const statusFilters = [
    { label: "Assigned", name: "all", value: "assigned" },
    { label: "Unassigned", name: "all", value: "unassigned" },
  ];

  // Column filters and pagination state for Tanstack table
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  // vehicles data from tanstack query
  const { data: vehicles, isLoading, isError } = useVehicles();

  // Initialize and setup Tanstack table
  const table = useReactTable({
    data: vehicles ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    filterFns: {
      // Custom include string filter function
      // to properly handle case when string is null/undefined
      // for assigned driver column
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

  // Controls the search functionality for the driver column
  const searchForDriver = (e) => {
    const value = e.target.value;
    setColumnFilters((prev) => [...prev, { id: "assigned_driver", value }]);
  };

  const onSubmit = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      setColumnFilters((prev) => [...prev, { id: key, value }]);
    });
  };

  // Page Loading Screen
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Page Error Screen
  if (isError) {
    return <div className="text-red-500">An error occurred...</div>;
  }

  return (
    <section className="flex w-full flex-col bg-white p-4">
      <PageHeader linkText="Add Vehicle" linkHref="add-vehicle">
        Manage Fleet
      </PageHeader>

      {!vehicles.length && (
        <NoData
          Icon={<TruckIcon className="stroke-light-grey" />}
          message="You have not added any vehicles yet. Click 'Add Vehicle' to register
          your first vehicle."
        />
      )}

      {/* Data Table */}
      {vehicles && vehicles.length > 0 && (
        <div className="mt-12">
          {/* Filter, Search & Sort  */}
          <FilterControls
            onSubmit={onSubmit}
            searchProps={{
              placeholder: "Search Registered Driver",
              onChange: searchForDriver,
            }}
          >
            <SortBy />
            <DropdownFilter
              label="Status"
              title="Filter by status"
              filterOptions={statusFilters}
            />
            <ResetFilters />
          </FilterControls>

          {/* Data table component */}
          <section className="pb-6">
            <VehicleDataTable table={table} columns={columns} />
          </section>
        </div>
      )}
    </section>
  );
};
export default ManageFleet;
