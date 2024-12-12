import { Link } from "react-router-dom";
import { BackArrowIcon } from "../SvgIcons";
import { cn } from "../../lib/utils";

const BackLink = ({ className, backText = "Back", to = -1, ...props }) => {
  return (
    <Link
      to={to}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <BackArrowIcon className="w-4" />
      {backText}
    </Link>
  );
};
export default BackLink;
