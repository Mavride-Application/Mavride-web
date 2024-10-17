import { useFormContext } from "react-hook-form";

const Input = ({
  label,
  id,
  name,
  type,
  placeholder,
  required,
  errorMsg,
  validations,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="mb-2 hidden md:block" htmlFor={id}>
        {label} {required && <span className="text-[#E45270]">*</span>}
      </label>
      <input
        id={id}
        className={`block w-full rounded-[0.625rem] border-mavride-blue bg-[#EFEFEF] py-4 pe-5 ps-[1.56rem] text-base outline-none transition duration-300 focus:border ${errors?.[name]?.message ? "border-[#F32121]" : ""} ${className}`}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: {
            value: required,
            message: errorMsg,
          },
          validate: validations,
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
