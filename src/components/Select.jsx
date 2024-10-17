import { useState } from "react";
import { useFormContext } from "react-hook-form";
import dropdown_icon from "../assets/dropdown_icon.svg";
const Select = ({
  label,
  id,
  name,
  placeholder,
  required,
  errorMsg,
  validations,
  options,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selected, setSelected] = useState();
  const [selectOpen, setSelectOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setSelectOpen(false);
  };

  return (
    <div>
      {/* Label for the select input */}
      <label className={`mb-2 block`} htmlFor={id}>
        {label} {required && <span className="text-[#E45270]">*</span>}
      </label>

      <div
        className={`relative rounded-[0.625rem] ${selectOpen ? "border" : ""} border-mavride-blue bg-[#EFEFEF] text-base transition duration-300 ${errors?.[name]?.message ? "border border-[#F32121]" : ""}`}
      >
        {/* Toggle Dropdown button */}
        <button
          type="button"
          onClick={() => setSelectOpen((prev) => !prev)}
          className={`w-full py-4 pe-5 ps-[1.56rem] text-left ${selected ? "" : "text-[#B0B0B0]"}`}
        >
          {selected ? selected : placeholder}
        </button>

        {/* Dropdown icon */}
        <span className="absolute inset-y-0 right-8 w-4 content-center">
          <img
            className="w-full object-contain"
            src={dropdown_icon}
            alt="dropdown icon"
          />
        </span>

        {/* Dropdown with the different options */}
        {selectOpen && (
          <div className="absolute inset-x-0 top-[calc(100%+0.44rem)] divide-y rounded-[0.625rem] bg-white px-6 py-2 shadow">
            {options.map((option) => (
              <label
                key={option}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="block cursor-pointer rounded py-2 ps-3 hover:bg-[#f6f8ff]"
              >
                {option}
                <input
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelect(option);
                  }}
                  hidden
                  type="radio"
                  value={option}
                  {...register(name, {
                    required: {
                      value: required,
                      message: errorMsg,
                    },
                    validate: validations,
                  })}
                />
              </label>
            ))}
          </div>
        )}
      </div>
      {errors?.[name]?.message && (
        <p className="mt-[0.88rem] text-sm text-[#D42620]">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
export default Select;
