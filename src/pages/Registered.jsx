import PageHeader from "@/components/UI/PageHeader";
import NoData from "@/components/UI/NoData";
import { CarIcon, StarIcon } from "@/components/SvgIcons";
import FilterControls, {
  DropdownFilter,
  ResetFilters,
  SortBy,
} from "@/components/UI/FilterControls";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns, placeholder } from "@/components/Drivers/DataTable/Columns";
import DriverDataTable from "@/components/Drivers/DataTable/DriverDataTable";

const Registered = () => {
  const starRatings = [
    {
      label: (
        <>
          5 star <StarIcon />
        </>
      ),
      name: "star",
      value: "5",
    },
    {
      label: (
        <>
          4 star <StarIcon />
        </>
      ),
      name: "star",
      value: "4",
    },
    {
      label: (
        <>
          3 star <StarIcon />
        </>
      ),
      name: "star",
      value: "3",
    },
    {
      label: (
        <>
          2 star <StarIcon />
        </>
      ),
      name: "star",
      value: "2",
    },
    {
      label: (
        <>
          1 star <StarIcon />
        </>
      ),
      name: "star",
      value: "1",
    },
  ];

  const statusFilters = [
    { label: "Active", name: "all", value: "active" },
    { label: "Offline", name: "all", value: "offline" },
  ];

  const table = useReactTable({
    data: placeholder,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="flex w-full flex-col bg-white p-4">
      <PageHeader linkText="Create New Profile" linkHref="new-profile">
        Registered Drivers
      </PageHeader>

      {/* <NoData
        Icon={<CarIcon className="fill-[#8C8C8C]" />}
        message="No driver registered yet"
      /> */}

      <div className="mt-12">
        {/* Filter, Search & Sort  */}
        <FilterControls
          searchProps={{
            placeholder: "Search Registered Driver",
          }}
        >
          <SortBy />
          <DropdownFilter
            label="Rating"
            title="Filter by rating"
            filterOptions={starRatings}
          />
          <DropdownFilter
            label="Status"
            title="Filter by status"
            filterOptions={statusFilters}
          />
          <ResetFilters />
        </FilterControls>

        {/* Data table component */}
        <section className="pb-6">
          <DriverDataTable table={table} columns={columns} />
        </section>
      </div>
    </section>
  );
};

export default Registered;
