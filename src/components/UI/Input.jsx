import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

const Input = ({
  label,
  id,
  name,
  type,
  placeholder,
  required,
  disabled,
  errorMsg,
  pattern,
  validations,
  className,
  onChange,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const [inputType, toggleInputType] = useState(type || "text");

  return (
    <div>
      <label className="mb-2 block" htmlFor={id}>
        {label} {required && label && <span className="text-[#E45270]">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          className={cn(
            "block w-full rounded-[0.625rem] bg-[#EFEFEF] py-4 pe-5 ps-[1.56rem] text-base outline outline-1 -outline-offset-2 outline-transparent transition duration-300 focus:outline-mavride-blue",
            { "outline-error-red focus:outline-error-red": errors?.[name] },
            className,
          )}
          type={inputType}
          placeholder={placeholder}
          {...register(name, {
            required: {
              value: required,
              message: errorMsg || "This field is required",
            },
            pattern:
              type === "email"
                ? { value: emailPattern, message: "Please enter a valid email" }
                : pattern || false,
            validate: validations,
            disabled,
            onChange,
          })}
        />

        {/* Button to show or hide password input value */}
        {type === "password" && (
          <span className="absolute inset-y-0 right-[8%] mt-2.5 content-center text-[#B0B0B0]">
            <button
              onClick={() =>
                toggleInputType((prev) => {
                  if (prev === "password") {
                    return "text";
                  } else if (prev === "text") {
                    return "password";
                  } else {
                    return prev;
                  }
                })
              }
              type="button"
            >
              {inputType === "password" ? (
                <EyeSlashIcon className="~size-5/6" />
              ) : (
                <EyeIcon className="~size-5/6" />
              )}
            </button>
          </span>
        )}
      </div>

      {errors?.[name]?.message && (
        <p className="mt-[0.88rem] text-sm text-error-red">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
export default Input;
