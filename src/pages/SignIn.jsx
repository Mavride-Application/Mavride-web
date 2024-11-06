import { FormProvider, useForm } from "react-hook-form";
import OnboardingLayout from "../layouts/OnboardingLayout";
import Input from "../components/Input";

const SignInForm = () => {
  const methods = useForm();

  const onSubmit = (data) => console.log(data);

  const { handleSubmit } = methods;

  return (
    <OnboardingLayout>
      <div className="mx-auto w-full max-w-[27.63rem] ~pt-[4.31rem]/[13.06rem]">
        <div className="text-center">
          <h2 className="mb-3 font-medium text-mavride-deep-blue ~text-[1.8125rem]/[2rem]">
            Sign In
          </h2>
          <p className="mx-auto max-w-[17.83rem] text-[#9C9AA5] ~text-sm/xl">
            We will send an OTP to the number
          </p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-[3.75rem] md:mt-[2.81rem]"
          >
            <Input
              label="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              placeholder="Enter Phone Number"
              required={true}
              errorMsg="Please enter a valid phone number including the area code"
              // add validation logic here
            />

            <button className="w-full rounded-[0.625rem]  bg-mavride-blue py-4 font-semibold text-white ~text-base/lg ~mt-[3.12rem]/[5.5rem]">
              Proceed
            </button>
          </form>
        </FormProvider>
      </div>
    </OnboardingLayout>
  );
};

export default SignInForm;
