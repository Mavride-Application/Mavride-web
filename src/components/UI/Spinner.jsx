import { cn } from "@/lib/utils";

const Spinner = ({ className }) => {
  return (
    <span
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-[3px] border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
        className,
      )}
      role="status"
    />
  );
};
export default Spinner;
