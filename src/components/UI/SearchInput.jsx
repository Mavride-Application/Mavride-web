import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = ({ className, iconClass, ...props }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-4 content-center">
        <MagnifyingGlassIcon
          className={cn("size-5 text-[#BBBCC0]", iconClass)}
        />
      </span>

      <input
        className={cn(
          "w-72 rounded-[0.625rem] bg-[#fafafa] py-3 pe-4 ps-12  outline-none placeholder:text-[#BBBCC0]",
          className,
        )}
        {...props}
      />
    </div>
  );
};
export default SearchInput;
