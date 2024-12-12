import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

const Button = ({ className, disabled, isSubmitting, link, ...props }) => {
  const classes =
    "flex rounded-[0.625rem] justify-center w-full bg-mavride-blue px-4 py-3 font-semibold text-white";

  return link ? (
    <Link className={cn(classes, className)} {...props} />
  ) : (
    <button
      disabled={disabled || isSubmitting}
      className={cn(classes, className)}
      {...props}
    />
  );
};
export default Button;
