// Asset Imports
import { BackArrowIcon } from "../components/SvgIcons";

// Component Imports
import DriverImage from "../components/Drivers/DriverImage";
import FormStepOne from "../components/Drivers/FormStepOne";

//Library Imports
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SuccessModal from "../components/UI/SuccessModal";
import { replaceFileListWithFile } from "../lib/utils";

const DriverProfile = () => {
  const [modal, setModal] = useState(false);

  const [draft, setDraft] = useState(
    () => JSON.parse(localStorage.getItem("driver-profile")) || {},
  );

  const methods = useForm({ defaultValues: draft || {} });
  const {
    handleSubmit,
    formState: { isDirty },
    watch,
  } = methods;

  //Form data
  const formData = watch();

  const saveDraft = () => {
    const draft = JSON.stringify(formData);
    localStorage.setItem("driver-profile", draft);
  };

  //handle form submission
  const onSubmit = (data) => {
    data = replaceFileListWithFile(data);
    console.log(data);
    localStorage.removeItem("driver-profile");
    setModal(true);
  };

  useEffect(() => {
    setDraft(JSON.parse(localStorage.getItem("driver-profile")));
  }, []);

  return (
    <div className="px-5 pb-[2.38rem] pt-[1.69rem]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex w-full justify-between gap-4 px-5">
            {/* Left Column */}
            <section className="flex w-full max-w-[20.8125rem] flex-col gap-24">
              {/* Back or Previous Button */}
              <Link
                to="/userManagement/drivers"
                className="mt-2 flex items-center gap-2"
              >
                <BackArrowIcon className="w-4" />
                Back
              </Link>

              {/* Driver Image */}
              <DriverImage className="pb-32 pt-20" />
            </section>

            {/* Right Column */}
            <section className="w-full max-w-[43.5rem]">
              <h1 className="mb-5 text-center text-2xl font-bold">
                Create A New Driver Profile
              </h1>

              {/* Form Step Heading */}
              <div className="mb-20 text-center">
                <h2 className="mb-2 text-lg">
                  Personal Information & Location Details
                </h2>

                <h3 className="text-lg text-[#8C8C8C]">
                  Fill in the details below to complete driver profile
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-x-[0.88rem] gap-y-5">
                <FormStepOne />
              </div>

              {/* Submission Success Modal */}
              {modal && (
                <SuccessModal
                  message="Your ticket has been submitted successfully"
                  href="/userManagement/drivers/driver-profile"
                  linkTextContent="Done"
                  onClick={() => setModal(false)}
                  state={formData}
                  className="max-w-[20rem]"
                />
              )}
            </section>
          </div>

          {/* Form Action Buttons */}
          <div className="ms-auto mt-20 flex max-w-[43.5rem] items-center justify-center gap-8 px-5">
            <button
              disabled={!isDirty}
              onClick={() => saveDraft()}
              className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white disabled:bg-[#E7E9FB] disabled:text-black disabled:text-opacity-35"
              type="button"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
            >
              Create Profile
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default DriverProfile;
