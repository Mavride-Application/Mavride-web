import { cn } from "@/lib/utils";
import { DownArrowIcon, FilterIcon, ReplayIcon } from "../SvgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import FilterRadioInput from "../FleetManagement/ui/FilterRadioInput";
import Button from "./Button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import SearchInput from "./SearchInput";

const FilterControls = ({
  onSubmit = () => {},
  className,
  children,
  searchInputClass,
  searchProps,
}) => {
  // Initialize RHF to get filters from form
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Table header */}
        <header
          className={cn(
            "mb-4 flex items-center justify-between text-sm font-medium",
            className,
          )}
        >
          <div className="flex items-center divide-x divide-grey-97">
            {children}
          </div>
          <SearchInput
            name="search"
            className={searchInputClass}
            {...searchProps}
          />
        </header>
      </form>
    </FormProvider>
  );
};

export default FilterControls;

export const SortBy = ({ className, props }) => {
  return (
    <button
      className={cn("flex w-fit items-center gap-3 py-2 pr-7", className)}
    >
      <FilterIcon className="size-5 fill-white" />
      <span>Sort By</span>
    </button>
  );
};
export const ResetFilters = ({ className, props }) => {
  const { reset } = useFormContext();

  return (
    <button
      onClick={() => reset()}
      className={cn(
        "flex w-fit items-center gap-2 py-2 pl-4 pr-7 text-[#EA0234]",
        className,
      )}
    >
      <ReplayIcon className="size-5 fill-[#EA0234]" />
      <span>Reset Filter</span>
    </button>
  );
};

export const DropdownFilter = ({
  label,
  title,
  className,
  filterOptions,
  props,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center gap-3 py-2 pl-4 pr-7 outline-none">
        {label}
        <DownArrowIcon className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="block w-full min-w-80 py-6">
        <div className="px-2">
          <h4 className="mb-6 text-lg font-bold">{title}</h4>

          <div className="flex items-center gap-3 text-sm">
            {filterOptions.map(({ label, name, value }) => {
              return (
                <FilterRadioInput
                  key={name}
                  label={label}
                  name={name}
                  value={value}
                />
              );
            })}
          </div>
        </div>

        <hr className="mb-5 mt-8" />

        <Button type="submit" className="mx-auto w-fit px-8 py-2 text-sm">
          Apply Now
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
