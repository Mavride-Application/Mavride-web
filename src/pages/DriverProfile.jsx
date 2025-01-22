// Component Imports
import DriverImage from "../components/Drivers/AddDriver/DriverImage";
import FormStepOne from "../components/Drivers/AddDriver/FormStepOne";

//Library Imports
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import SuccessModal from "../components/UI/SuccessModal";
import { replaceFileListWithFile } from "../lib/utils";
import Button from "../components/UI/Button";
import BackLink from "../components/UI/BackLink";
import useAddDriver from "@/hooks/Drivers/useAddDriver";

const DriverProfile = () => {
  const { mutateAsync: createProfile } = useAddDriver();
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
    formData.driverPic = "";
    const draft = JSON.stringify(formData);
    localStorage.setItem("driver-profile", draft);
  };

  //handle form submission
  const onSubmit = async (data) => {
    data = replaceFileListWithFile(data);
    console.log(data);
    await createProfile(data, {
      onSuccess: () => {
        localStorage.removeItem("driver-profile");
        setModal(true);
      },
      onError: (error) => console.error(error),
    });
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
              <BackLink to="/userManagement/drivers" className="mt-2" />

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
                  to="/userManagement/drivers/driver-profile"
                  children="Done"
                  onClick={() => setModal(false)}
                  state={formData}
                />
              )}
            </section>
          </div>

          {/* Form Action Buttons */}
          <div className="ms-auto mt-20 flex max-w-[43.5rem] items-center justify-center gap-8 px-5">
            <Button
              type="button"
              disabled={!isDirty}
              onClick={() => saveDraft()}
              className="inline-block w-full max-w-[20.8125rem] p-5 disabled:bg-[#E7E9FB] disabled:text-black disabled:text-opacity-35"
            >
              Save as Draft
            </Button>
            <Button className="inline-block w-full max-w-[20.8125rem] p-5">
              Create Profile
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default DriverProfile;
