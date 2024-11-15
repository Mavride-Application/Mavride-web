import Input from "./UI/Input";
// import { NavLink } from 'react-router-dom';

const EnterPhoneNumber = () => {
  return (
    <div className="mx-auto w-full max-w-[27.63rem] ~pt-[4.31rem]/40">
      <div className="text-center">
        <h2 className="mb-1 font-medium text-mavride-deep-blue ~text-[1.8125rem]/[2rem]">
          Enter Your Phone Number
        </h2>
        <p className="mx-auto max-w-[17.83rem] text-[#9C9AA5] ~text-sm/xl">
          We will send an OTP to the number
        </p>
      </div>
      <Input
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        placeholder="Enter Phone Number"
        required={true}
        errorMsg="Please enter the full number including the area code"
      />
      <button
        type="submit" // Make this a submit button
        className="w-full rounded-[0.625rem] bg-mavride-blue py-4 font-semibold text-white ~text-base/lg ~mt-[3.12rem]/[6.63rem]"
      >
        Proceed
      </button>
    </div>
  );
};

export default EnterPhoneNumber;