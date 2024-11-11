import { useFormContext } from "react-hook-form";

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

  return (
    <div>
      <label className="mb-2 block" htmlFor={id}>
        {label} {required && label && <span className="text-[#E45270]">*</span>}
      </label>
      <input
        id={id}
        className={`block w-full rounded-[0.625rem] border-mavride-blue bg-[#EFEFEF] py-4 pe-5 ps-[1.56rem] text-base outline-none transition duration-300 focus:border ${errors?.[name]?.message ? "border-[#F32121]" : ""} ${className}`}
        type={type || "text"}
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
      {errors?.[name]?.message && (
        <p className="mt-[0.88rem] text-sm text-[#D42620]">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
export default Input;
