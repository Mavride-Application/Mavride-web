import { Link } from "react-router-dom";
import { SuccessIcon } from "../SvgIcons";
import { useEffect } from "react";

const SuccessModal = ({
  message,
  href,
  onClick,
  linkTextContent,
  state,
  className,
}) => {
  //hide body overflow when modal is shown
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="fixed inset-0 z-30 flex w-full flex-col content-end items-center justify-center bg-white p-5 text-center">
      <SuccessIcon className="size-[15.375rem]" animated />

      <p className={`mx-auto my-[2.31rem] text-2xl ${className}`}>{message}</p>

      {/* Link in modal to view new profile */}
      <Link
        onClick={onClick}
        to={href}
        state={state}
        className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
      >
        {linkTextContent}
      </Link>
    </div>
  );
};
export default SuccessModal;
