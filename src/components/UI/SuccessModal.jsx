import { Link } from "react-router-dom";
import { SuccessIcon } from "../SvgIcons";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

const SuccessModal = ({ message, className, ...props }) => {
  //hide body overflow when modal is shown
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="fixed inset-0 z-[9999] flex w-full flex-col content-end items-center justify-center bg-white p-5 text-center">
      <SuccessIcon className="size-[15.375rem]" animated />

      <p
        className={cn("mx-auto my-[2.31rem] max-w-[20rem] text-2xl", className)}
      >
        {message}
      </p>

      {/* Link in modal to view new profile */}
      <Link
        className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
        {...props}
      />
    </div>
  );
};
export default SuccessModal;
