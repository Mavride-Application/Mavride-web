import { Link } from "react-router-dom";
import { PlusIcon } from "../SvgIcons";
import { cn } from "@/lib/utils";

const PageHeader = ({ children, className, linkText, linkHref, linkClass }) => {
  return (
    <header
      className={cn("flex w-full items-center justify-between", className)}
    >
      <h1 className="text-xl font-bold">{children}</h1>

      <Link
        className={cn(
          "flex items-center gap-2 rounded-md bg-mavride-blue px-4 py-3 font-medium text-white",
          linkClass,
        )}
        to={linkHref}
      >
        <PlusIcon className="fill-white" />
        {linkText}
      </Link>
    </header>
  );
};
export default PageHeader;
