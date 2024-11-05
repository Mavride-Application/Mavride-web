// Asset Imports
import { BackArrowIcon, StepHR, SuccessIcon } from "../components/SvgIcons";

// Component Imports
import DriverImage from "../components/Drivers/DriverImage";
import StepIcon from "../components/Drivers/StepIcon";
import FormStepOne from "../components/Drivers/FormStepOne";
import FormStepTwo from "../components/Drivers/FormStepTwo";
import FormStepThree from "../components/Drivers/FormStepThree";

//Library Imports
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const DriverProfile = () => {
  //Array of all Form Steps
  const steps = [
    {
      title: "Personal Information & Location Details",
      subtitle: "Fill in the details below to complete driver profile",
      steps: [
        "fullName",
        "phone",
        "email",
        "state",
        "gender",
        "city",
        "driverLicense",
        "address",
      ],
    },
    {
      title: "Vehicle Details & Service",
      subtitle: "Fill in the details below to complete driver profile",
      steps: [
        "licensePlate",
        "vehicleType",
        "vehicleModel",
        "vehicleColor",
        "serviceOffering",
      ],
    },
    {
      title: "Upload Document",
      subtitle:
        "Kindly upload thee required documents to complete driver profile",
      steps: [
        "vehicleInsurance",
        "proofOfCarOwnership",
        "vehiclePhotoExterior",
        "roadWorthiness",
        "vehiclePhotoInterior",
      ],
    },
  ];
  const [previousStep, setPreviousStep] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);
  const [modal, setModal] = useState(false);
  const forwards = currentStep > previousStep; //unused for now

  const methods = useForm();
  const { handleSubmit, trigger } = methods;

  //handle next step function
  const next = async () => {
    const isComplete = await trigger(steps[currentStep].steps);
    if (isComplete) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => Math.min(step + 1, 2));
    }
  };
  //handle next step function
  const prev = () => {
    setPreviousStep(currentStep);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  //handle form submission
  const onSubmit = (data) => {
    for (const key in data) {
      if (data[key] instanceof FileList) {
        // replace the fileList with the actual file, or null if the fileList is empty
        data[key] = data[key].length > 0 ? data[key][0] : null;
      }
    }
    console.log(data);
    setModal(true);
  };

  //hide body overflow when modal is shown
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  return (
    <div className="px-5 pb-[2.38rem] pt-[1.69rem]">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex w-full justify-between gap-4 px-5">
            {/* Left Column */}
            <section className="flex w-full max-w-[20.8125rem] flex-col gap-24">
              {/* Back or Previous Button */}
              <Link
                onClick={() => prev()}
                to={currentStep === 0 ? "/userManagement/drivers" : ""}
                className="mt-2 flex items-center gap-2"
              >
                <BackArrowIcon className="w-4" />
                Back
              </Link>

              {/* Driver Image */}
              <DriverImage />
            </section>

            {/* Right Column */}
            <section className="w-full max-w-[43.5rem]">
              <h1 className="mb-7 text-center text-2xl font-bold">
                Create A New Driver Profile
              </h1>

              {/* Current Form Step Indicators / Icons */}
              <div className="flex items-center justify-center gap-4">
                <StepIcon step={0} currentStep={currentStep} />
                <StepHR className="w-[3.625rem]" />
                <StepIcon step={1} currentStep={currentStep} />
                <StepHR className="w-[3.625rem]" />
                <StepIcon step={2} currentStep={currentStep} />
              </div>

              {/* Form Step Heading */}
              <div className="mt-[2.69rem] text-center">
                <h2 className="mb-2 text-lg">{steps[currentStep].title}</h2>

                <h3 className="text-lg text-[#8C8C8C]">
                  {steps[currentStep].subtitle}
                </h3>
              </div>

              {/* Form Steps */}
              <div className="mt-[3.75rem]">
                <div className="grid grid-cols-2 gap-x-[0.88rem] gap-y-5">
                  {currentStep === 0 && <FormStepOne key="step1" />}
                  {currentStep === 1 && <FormStepTwo key="step2" />}
                  {currentStep === 2 && <FormStepThree key="step2" />}

                  {/* Submission Success Modal */}
                  {modal && (
                    <div className="fixed inset-0 z-20 flex w-full flex-col content-end items-center justify-end bg-white p-5 pb-36 text-center">
                      <SuccessIcon className="size-[15.375rem]" />

                      <p className="mt-10 text-2xl">
                        You have successfully Created a Driver’s Profile
                      </p>

                      {/* Link in modal to view new profile */}
                      <Link
                        onClick={() => {
                          setModal(false);
                          setCurrentStep(0);
                          setPreviousStep(-1);
                        }}
                        to=""
                        className="mt-14 inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
                      >
                        View Profile
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Form Action Buttons */}
          <div className="ms-auto mt-20 flex max-w-[43.5rem] items-center justify-center gap-4 px-5">
            {currentStep < 2 ? (
              <>
                <button
                  disabled
                  className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white disabled:bg-[#E7E9FB] disabled:text-black disabled:text-opacity-35"
                  type="button"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => next()}
                  type="button"
                  className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
                >
                  Next
                </button>
              </>
            ) : (
              // Actual form submit button
              <button
                type="submit"
                className="inline-block w-full max-w-[20.8125rem] rounded-[0.625rem] bg-mavride-blue p-5 font-semibold text-white"
              >
                Create Profile{" "}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default DriverProfile;
