import { swiperSlides } from "../../lib/variants";
import Input from "../Input";

import { motion } from "framer-motion";

import { City, State } from "country-state-city";
import { nonStates } from "../../lib/data";
import { useFormContext } from "react-hook-form";
import SearchDropdown from "../SearchDropdown";

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
      <SearchDropdown
        key={"state"}
        label="State"
        id="state"
        name="state"
        placeholder="Enter State"
        required={true}
        errorMsg="Please state your state"
        options={states}
        validations={{
          stateNotInUS: (state) => states.includes(state) || "State not found",
        }}
      />
      <SearchDropdown
        key={"city"}
        label="City"
        id="city"
        name="city"
        placeholder="Enter City"
        required={true}
        options={cities}
        errorMsg={" "}
        validations={{
          cityNotInState: (city) => cities.includes(city) || "City not found",
        }}
      />
      <Input
        label="Address"
        id="address"
        name="address"
        type="text"
        placeholder="Enter Address"
        required={true}
        errorMsg={" "}
      />
    </motion.div>
  );
};
export default LocationDetails;
