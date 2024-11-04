import { Link } from "react-router-dom";
import {
  ActiveStepIcon,
  BackArrowIcon,
  IncompleteStepIcon,
  StepHR,
} from "../components/SvgIcons";
import camera from "../assets/camera.svg";
import Input from "../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { nonStates } from "../lib/data";
import { City, State } from "country-state-city";
import Select from "../components/Select";
import SearchDropdown from "../components/SearchDropdown";

const DriverProfile = () => {
  const methods = useForm();
  const { watch, handleSubmit } = methods;

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

  const onSubmit = (data) => console.log(data);

  return (
    <div className="px-5 pb-[2.38rem] pt-[1.69rem]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between gap-4 px-5">
            <section className="flex w-full max-w-[20.8125rem] flex-col">
              <Link className="mt-2 flex items-center gap-2">
                <BackArrowIcon className="w-4" />
                Back
              </Link>

              <div className="mt-auto rounded-[0.625rem] border-[0.5px] border-[#E8E8E8] px-5 pb-32 pt-20">
                <div className="relative mx-auto size-[10.5rem] rounded-full bg-[#E7E9FB] bg-profile bg-center bg-no-repeat">
                  <label
                    htmlFor="profile-pic"
                    className="absolute bottom-1 right-1 z-[5] grid size-[2.45rem] cursor-pointer place-items-center rounded-full bg-white"
                  >
                    <img
                      className="object-contain"
                      src={camera}
                      alt="camera-icon"
                    />
                  </label>
                </div>

                <div className="mt-12 text-center text-sm">
                  <p className="text-[#777]">Allowed format</p>
                  <p>JPG, JPEG, and PNG</p>

                  <p className="mt-6 text-[#777]">Max file size</p>
                  <p>2MB</p>
                </div>
              </div>
            </section>

            <section className="w-full max-w-[43.5rem]">
              <h1 className="mb-7 text-center text-2xl font-bold">
                Create A New Driver Profile
              </h1>

              <div className="flex items-center justify-center gap-4">
                <ActiveStepIcon />
                <StepHR className="w-[3.625rem]" />
                <IncompleteStepIcon />
                <StepHR className="w-[3.625rem]" />
                <IncompleteStepIcon />
              </div>

              <div className="mt-[2.69rem] text-center">
                <h2 className="mb-2 text-lg">
                  Personal Information & Location Details
                </h2>

                <p className="text-lg text-[#8C8C8C]">
                  Fill in the details below to complete driver profile
                </p>
              </div>

              <div className="mt-[3.75rem]">
                <div className="grid grid-cols-2 gap-x-[0.88rem] gap-y-5">
                  <Input label="Full Name" name="fullName" required={true} />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    required={true}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    required={true}
                  />
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
                      stateNotInUS: (state) =>
                        states.includes(state) || "State not found",
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
                      cityNotInState: (city) =>
                        cities.includes(city) || "City not found",
                    }}
                  />
                  <Input
                    label="Driver License"
                    name="driverLicense"
                    required={true}
                  />
                  <Input label="Address" name="address" required={true} />
                </div>
              </div>
            </section>
          </div>
          <div className="mt-[10.31rem] flex items-center justify-end gap-4">
            <button
              className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-[#E7E9FB] text-black p-5 font-semibold text-opacity-35"
              type="button"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
            >
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default DriverProfile;
