import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import Spinner from "./Spinner";

const Button = ({
  className,
  disabled,
  isSubmitting,
  link,
  children,
  ...props
}) => {
  const classes =
    "flex rounded-[0.625rem] disabled:bg-opacity-50 gap-4 items-center justify-center w-full bg-mavride-blue px-4 py-3 font-semibold text-white";

  return link ? (
    <Link className={cn(classes, className)} {...props}>
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled || isSubmitting}
      className={cn(classes, className)}
      {...props}
    >
      {children} {isSubmitting && <Spinner />}
    </button>
  );
};
export default Button;
