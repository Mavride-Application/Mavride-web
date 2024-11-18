import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import dropdown_icon from "../../assets/dropdown_icon.svg";
import Input from "./Input";

import { motion } from "framer-motion";

const Select = ({
  label,
  id,
  name,
  placeholder,
  required,
  errorMsg,
  options,
  disabled,
}) => {
  const selectRef = useRef();

  // Get RHF functions from form context
  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  // Create state to handle selected option and dropdown state
  const [selected, setSelected] = useState(watch(name));
  const [selectOpen, setSelectOpen] = useState(false);

  // Handle dropdown select event
  const handleSelect = (option) => {
    setSelected(option);
    setSelectOpen(false);
  };

  // Reset dropdown after form's successful submission
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     setSelected(undefined);
  //   }
  // }, [isSubmitSuccessful]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };

    // Attach event listener when dropdown is open
    if (selectOpen) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }

    // Clean up event listener when dropdown is closed
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [selectOpen]);

  return (
    <div ref={selectRef}>
      {/* Label for the select input */}
      <label className={`mb-2 block`} htmlFor={id}>
        {label} {required && <span className="text-[#E45270]">*</span>}
      </label>

      <div
        className={`relative rounded-[0.625rem] ${selectOpen ? "border" : "border-0"} border-mavride-blue bg-[#EFEFEF] text-base transition duration-300 ${errors?.[name]?.message ? "border border-[#F32121]" : ""}`}
      >
        {/* Toggle Dropdown button */}
        <button
          disabled={disabled}
          type="button"
          onClick={() => setSelectOpen((prev) => !prev)}
          className={`w-full py-4 pe-5 ps-[1.56rem] text-left ${selected ? "" : "text-[#B0B0B0]"}`}
        >
          {selected ? selected : placeholder}
        </button>

        {/* Dropdown icon */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setSelectOpen((prev) => !prev)}
          className="absolute inset-y-0 right-8 w-4 content-center"
        >
          <img
            className="w-full object-contain"
            src={dropdown_icon}
            alt="dropdown icon"
          />
        </button>

        {/* Dropdown with the different options */}

        <motion.div
          className={`absolute inset-x-0 top-[calc(100%+0.44rem)] z-10 max-h-[15rem] divide-y overflow-y-auto rounded-[0.625rem] bg-white px-6 py-2 shadow ${selectOpen ? "block" : "hidden"} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl`}
        >
          {options.map((option, index) => (
            <label
              key={`${option}_${index}`}
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="block cursor-pointer rounded py-2 ps-3 hover:bg-[#f6f8ff]"
            >
              {option}{" "}
              {option === "Others" && (
                <span className="text-[#B0B0B0]">(Please Specify)</span>
              )}
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
                })}
              />
            </label>
          ))}
        </motion.div>
      </div>
      {errors?.[name]?.message && (
        <p className="mt-[0.88rem] text-sm text-[#D42620]">
          {errors[name].message}
        </p>
      )}

      {watch(name) === "Others" && (
        <Input
          label=""
          id={`other-${name}`}
          name={`other ${name}`}
          type="text"
          placeholder={`Please specify ${name}`}
          required={required}
          className={"mt-4"}
        />
      )}
    </div>
  );
};
export default Select;
