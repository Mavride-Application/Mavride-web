import { useFormContext } from "react-hook-form";

const FilterRadioInput = ({ label, name, value }) => {
  const { register } = useFormContext();

  return (
    <label className="flex min-w-[5.6rem] cursor-pointer items-center justify-center gap-1 rounded-3xl border border-grey-97 bg-white p-2 text-center font-semibold text-black transition-colors has-[:checked]:bg-mavride-blue has-[:checked]:text-white">
      <input
        hidden
        onClick={(e) => e.stopPropagation()}
        type="radio"
        value={value}
        {...register(name)}
      />

      {label}
    </label>
  );
};
export default FilterRadioInput;
