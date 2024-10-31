import { FormProvider, useForm } from "react-hook-form";
import OnboardingLayoutLite from "../layouts/OnboardingLayoutLite";
import { useEffect, useState } from "react";
import arrow_left from "../assets/arrow_left.svg";
import PersonalInfo from "../components/PersonalInfo";
import LocationDetails from "../components/LocationDetails";
import CompanyDetails from "../components/CompanyDetails";
import UploadCertification from "../components/UploadCertification";
import { AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "Step 1",
    title: "Personal Information",
    subTitle:
      "Create an account with us and complete verification to get started",
  },
  {
    id: "Step 2",
    title: "Enter Location Details",
    subTitle: "Enter valid location details to complete registration",
  },
  {
    id: "Step 3",
    title: "Company Details",
    subTitle: "Enter valid company details to complete registration",
  },
  {
    id: "Step 4",
    title: "Upload Valid Certification",
    subTitle: "Upload valid certifications for verification",
  },
];

const PersonalInfoSteps = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      gender: "",
      state: "",
      city: "",
      address: "",
      companyName: "",
      companyAddress: "",
      companyPhoneNumber: "",
      driverLicense: "",
      transportLicense: "",
    },
  });
  const {
    handleSubmit,
    reset,
    trigger,
    formState: { isValid, isSubmitSuccessful },
  } = methods;

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const forwards = currentStep > previousStep;

  // Control current form step
  const next = () => {
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const previous = async () => {
    if (currentStep > 0) {
      setTimeout(async () => trigger(), 1000);
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const onSubmit = (data) => {
    if (currentStep === 3) console.log(data);
  };

  // Reset form after successful submission
  useEffect(() => {
    // reset();
    // setCurrentStep(0);
  }, [isSubmitSuccessful]);

  return (
    <OnboardingLayoutLite className={currentStep === 3 ? "bg-[#F7F7F7]" : ""}>
      <div className="mx-auto w-full max-w-[27.63rem] py-20">
        <div className="relative mx-auto text-center">
          <button
            onClick={() => previous()}
            className="absolute top-[0.37rem] block w-[1.4rem] py-2 ~left-[-8rem]/[-22.37rem]"
            href="#"
          >
            <img src={arrow_left} alt="Back arrow icon" />
          </button>

          {/* Users Profile Image */}
          <div className="mx-auto mb-10 size-20 overflow-hidden rounded-full bg-[#E7E9FB] bg-profile bg-[size:2.5rem] bg-center bg-no-repeat"></div>

          {/* Page Heading & Description */}
          <h1 className="mb-1 font-medium text-mavride-deep-blue ~text-2xl/[2rem]">
            {steps[currentStep].title}
          </h1>
          <p className="mx-auto max-w-[26.81rem] text-[#8C8C8C] ~text-xl/2xl">
            {steps[currentStep].subTitle}
          </p>
        </div>

        {/* Form  */}

        <FormProvider {...methods}>
          <form
            className="mt-[2.81rem]"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Form Steps */}
            <AnimatePresence initial={false} custom={forwards}>
              {currentStep === 0 && (
                <PersonalInfo key={"step1"} forwards={forwards} />
              )}
              {currentStep === 1 && (
                <LocationDetails key={"step2"} forwards={forwards} />
              )}
              {currentStep === 2 && (
                <CompanyDetails key={"step3"} forwards={forwards} />
              )}
              {currentStep === 3 && (
                <UploadCertification key={"step4"} forwards={forwards} />
              )}
            </AnimatePresence>

            {/* Forms's Proceed/Submit Button */}
            <button
              key={currentStep}
              disabled={!isValid}
              type={currentStep === 3 ? "submit" : "button"}
              onClick={() => next()}
              className="w-full rounded-[0.625rem] bg-mavride-blue py-4 font-semibold text-white ~text-base/lg ~mt-8/[3.44rem] disabled:bg-[#D3D3D3]"
            >
              {currentStep === 3 ? "Next" : "Proceed"}
            </button>
          </form>
        </FormProvider>
      </div>
    </OnboardingLayoutLite>
  );
};
export default PersonalInfoSteps;
