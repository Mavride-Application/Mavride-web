import { State, City } from "country-state-city";
import Input from "../Input";
import SearchDropdown from "../SearchDropdown";
import Select from "../Select";
import { nonStates } from "../../lib/data";
import { useFormContext } from "react-hook-form";

const FormStepOne = () => {
  const { watch } = useFormContext();

  const statesUS = State.getStatesOfCountry("US");

  //Get all the valid states from csc
  const states = statesUS
    .map((state) => state.name)
    .filter((state) => !nonStates.includes(state));

  const chosenState = watch("state");
  const isoCode = statesUS.find((state) => state.name === chosenState)?.isoCode;

  //Get the cities for the particular state chosen
  const cities = City.getCitiesOfState("US", isoCode).map(
    (city) => city.name,
  ) || ["Select a state"];
  return (
    <>
      <Input label="Full Name" name="fullName" required={true} />
      <Input label="Phone" name="phone" type="tel" required={true} />
      <Input label="Email" name="email" type="email" required={true} />
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
      <Select
        label="Gender"
        id="gender"
        name="gender"
        placeholder="Gender"
        required={true}
        errorMsg="Please state your gender"
        options={["Male", "Female", "Others"]}
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
      <Input label="Driver License" name="driverLicense" required={true} />
      <Input label="Address" name="address" required={true} />
    </>
  );
};
export default FormStepOne;