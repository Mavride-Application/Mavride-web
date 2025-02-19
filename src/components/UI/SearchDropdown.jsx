import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SearchDropdown = ({
  label,
  id,
  name,
  placeholder,
  required,
  errorMsg,
  options,
  disabled,
  validations,
}) => {
  // Get RHF functions from form context
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  // Create state to handle selected option and dropdown state
  const [selectOpen, setSelectOpen] = useState(false);

  // Handle dropdown select event
  const handleSelect = (option) => {
    setValue(name, option);
    setSelectOpen(false);
    trigger(name);
  };

  const toggleDropdown = () => {
    setSelectOpen(true);
  };

  const query = watch(name)?.toLowerCase();

  const filteredOptions = options.filter((value) =>
    value.toLowerCase().includes(query),
  );

  return (
    <div className="relative">
      <Input
        name={name}
        disabled={disabled}
        id={id}
        label={label}
        type="text"
        required={required}
        placeholder={placeholder}
        errorMsg={errorMsg}
        validations={validations}
        onChange={toggleDropdown}
        autoComplete="off"
      />

      {/* Dropdown with the different options */}
      <AnimatePresence>
        <motion.div
          key={selectOpen}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={cn(
            "absolute inset-x-0 top-[calc(100%+0.44rem)] z-10 hidden max-h-[15rem] divide-y overflow-y-auto rounded-[0.625rem] bg-white px-6 py-2 shadow scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl",
            {
              "top-[calc(100%-1.5rem)]": errors[name]?.message,
              block: selectOpen && filteredOptions.length > 0,
            },
          )}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={`${option}_${index}`}
              onClick={(event) => {
                event.stopPropagation();
                handleSelect(option);
              }}
              className="block cursor-pointer rounded py-2 ps-3 hover:bg-[#f6f8ff]"
            >
              {option}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default SearchDropdown;
