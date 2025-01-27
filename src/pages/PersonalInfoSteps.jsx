import { FormProvider, useForm } from "react-hook-form";
import OnboardingLayoutLite from "../layouts/OnboardingLayoutLite";
import { useEffect, useState } from "react";
import arrow_left from "../assets/arrow_left.svg";
import PersonalInfo from "../components/PersonalInfo/PersonalInfo";
import LocationDetails from "../components/PersonalInfo/LocationDetails";
import CompanyDetails from "../components/PersonalInfo/CompanyDetails";
import UploadCertification from "../components/PersonalInfo/UploadCertification";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../components/UI/SuccessModal";
import { convertToFormData, replaceFileListWithFile } from "../lib/utils";

const steps = [
  {
    id: "Step 1",
    title: "Personal Information",
    subtitle:
      "Create an account with us and complete verification to get started",
    fields: ["fullname", "gender", "email", "password", "confirm_password"],
  },
  {
    id: "Step 2",
    title: "Enter Location Details",
    subtitle: "Enter valid location details to complete registration",
    fields: ["state", "city", "address"],
  },
  {
    id: "Step 3",
    title: "Company Details",
    subtitle: "Enter valid company details to complete registration",
    fields: ["company_name", "company_address", "phone_number"],
  },
  {
    id: "Step 4",
    title: "Upload Valid Certification",
    subtitle: "Upload valid certifications for verification",
    fields: ["health_license", "transport_license"],
  },
];

const PersonalInfoSteps = () => {
  const { state } = useLocation(); // get profile_pic
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate("/choosephoto");
    }
  }, []);

  // Set up use form
  const methods = useForm({
    defaultValues: {
      fullname: "",
      gender: "",
      email: "",
      password: "",
      confirm_password: "",
      state: "",
      city: "",
      address: "",
      company_name: "",
      company_address: "",
      company_contacts: "",
      health_license: "",
      transport_license: "",
    },
  });
  const {
    handleSubmit,
    trigger,
    formState: { isValid },
  } = methods;

  const [previousStep, setPreviousStep] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);
  const [modal, setModal] = useState(false);

  const forwards = currentStep > previousStep;

  // Control current form step
  const next = async () => {
    //const isValid = await trigger(steps[currentStep]);
    if (isValid) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => Math.min(step + 1, 3));
    } else {
      await trigger(steps[currentStep].fields);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => Math.max(step - 1, 0));
    }
  };

  const onSubmit = async (data) => {
    if (currentStep === 3) {
      // Format formData
      data.profile_pic = state.image.image;
      data["phone_number"] = state.phoneNumber;
      data = replaceFileListWithFile(data);
      console.log(data);

      //Send data to backend
      try {
        const formData = convertToFormData(data);
        const res = await fetch(
          "https://yv6zgf4z0d.execute-api.eu-north-1.amazonaws.com/api/v1/providers/signup",
          {
            method: "POST",
            body: formData,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to send sign-up data");
        }

        const result = await res.json();

        //Open modal
        setModal(true);

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(state);
  }, [currentStep]);

  return (
    <OnboardingLayoutLite className={currentStep === 3 ? "bg-[#F7F7F7]" : ""}>
      {modal && (
        <SuccessModal
          message="Your registration was successful. Now, please log in with your email and password to get started"
          children="Done"
          to="/signin"
          className="max-w-[37rem]"
        />
      )}
      <div className="mx-auto w-full max-w-[27.63rem] py-20">
        <div className="relative mx-auto text-center">
          <Link
            onClick={() => previous()}
            to={currentStep === 0 ? "/choosephoto" : ""}
            className="absolute top-[0.37rem] block w-[1.4rem] py-2 ~left-[-1rem]/[-22.37rem]"
            href="#"
          >
            <img src={arrow_left} alt="Back arrow icon" />
          </Link>

          {/* Page Heading & Description */}
          <h1 className="mb-1 font-medium text-mavride-deep-blue ~text-2xl/[2rem]">
            {steps[currentStep].title}
          </h1>
          <p className="mx-auto max-w-[26.81rem] text-[#8C8C8C] ~text-xl/2xl">
            {steps[currentStep].subtitle}
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
                <PersonalInfo key="step1" forwards={forwards} />
              )}
              {currentStep === 1 && (
                <LocationDetails key="step2" forwards={forwards} />
              )}
              {currentStep === 2 && (
                <CompanyDetails key="step3" forwards={forwards} />
              )}
              {currentStep === 3 && (
                <UploadCertification key="step4" forwards={forwards} />
              )}
            </AnimatePresence>

            {/* Forms's Proceed/Submit Button */}
            <button
              key={currentStep}
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
