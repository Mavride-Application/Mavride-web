import { cn } from "@/lib/utils";

const PaginationButton = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "size-8 rounded-[0.25rem] border border-[#EEE] bg-[#F5F5F5] hover:bg-white transition duration-300 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
};
export default PaginationButton;
