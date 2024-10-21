import { swiperSlides } from "../lib/variants";
import Input from "./Input";
import Select from "./Select";

import { motion } from "framer-motion";

import { City, State } from "country-state-city";
import { nonStates } from "../lib/data";
import { useFormContext } from "react-hook-form";

const LocationDetails = ({ forwards }) => {
  const statesUS = State.getStatesOfCountry("US");

  //Get all the valid states from csc
  const states = statesUS
    .map((state) => state.name)
    .filter((state) => !nonStates.includes(state));

  const { watch } = useFormContext();
  const chosenState = watch("state");
  const isoCode = statesUS.find((state) => state.name === chosenState)?.isoCode;

  //Get the cities for the particular state chosen
  const cities = City.getCitiesOfState("US", isoCode).map(
    (city) => city.name,
  ) || ["Select a state"];

  return (
    <motion.div
      variants={swiperSlides}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={forwards}
      className="space-y-5"
    >
      <Select
        label="State"
        id="state"
        name="state"
        placeholder="Enter State"
        required={true}
        errorMsg="Please state your state"
        options={states}
      />
      <Select
        label="City"
        id="city"
        name="city"
        placeholder="Enter City"
        required={true}
        errorMsg="Please state your city"
        options={cities}
        disabled={!isoCode}
      />
      <Input
        label="Address"
        id="address"
        name="address"
        type="text"
        placeholder="Enter Address"
        required={true}
        errorMsg="Please enter your address"
      />
    </motion.div>
  );
};
export default LocationDetails;
