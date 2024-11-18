import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAuth } from './OtpAuth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const PhoneOtp = ({ phoneNumber, otpCode, requestOtp }) => {
  const [otpSent, setOtpSent] = useState(true);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [resTrue, setResTrue] = useState(undefined)
  const [otpCounter, setOtpCounter] = useState(30)

  const handleResendOtp = () => {
    if (phoneNumber) {
      setOtpCounter(30); // Reset the counter
      requestOtp(phoneNumber);
    } else {
      console.error("Phone number is missing");
    }
  };


  const { register, setValue, formState: { isValid }, watch } = useFormContext();
  const otpValues = watch(['otp[0]', 'otp[1]', 'otp[2]', 'otp[3]']); // Watch all OTP fields individually

  const { setIsOtpVerified } = useAuth();

  //To navigate to next route if otp is verified
  const navigate = useNavigate();

  //Backspace and next input functionality for otp field
  const handleChange = (event, index) => {
    let value = event.target.value;

    value = value.slice(0, 1);
    // Handle backspace logic
    if (event.key === 'Backspace') {
      // Clear current value
      setValue(`otp[${index}]`, "", { shouldValidate: true, shouldDirty: true });
      setResTrue(undefined)

      if (index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          prevInput.focus(); // Move focus to the previous input
          event.preventDefault(); // Prevent default behavior of backspace
        }
      }
    } else if (value.length === 1) {
      setValue(`otp[${index}]`, value, { shouldValidate: true, shouldDirty: true });
      if (index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus(); // Move focus to the next input
        }
      }
    }
  };

  // Paste of otp funtionality
  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text').slice(0, 4);
    if (/^\d{4}$/.test(pasteData)) {
      pasteData.split('').forEach((char, index) => {
        setValue(`otp[${index}]`, char, { shouldValidate: true });
      });
      document.getElementById(`otp-3`).focus();
    }
  };

  useEffect(() => {
    if (otpCounter > 0) {
      const timer = setInterval(() => {
        setOtpCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      // Cleanup the interval on unmount or when otpCounter changes
      return () => clearInterval(timer);
    }
  }, [otpCounter]);

  const verifyOtp = async () => {
    const otp = otpValues.join(''); // Combine OTP input values
    try {
      console.log('Sending OTP verification request with:', { phone_number: phoneNumber, otp });

      const response = await fetch('http://13.53.133.131/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp
        })
      });

      const responseData = await response.json();
      console.log('Full response data:', responseData);

      // Check for a specific status or message indicating success/failure
      if (response.ok && responseData.status === "success" && responseData.message === "Phone number verified.") {
        console.log('OTP verified with backend:', responseData.message);
        setResTrue(true); // Indicate success for UI styling
        setIsOtpVerified(true);
        navigate('/choosephoto');
      } else {
        console.error('OTP verification failed:', responseData.message || responseData);
        setResTrue(false); // Indicate failure for UI styling
      }
    } catch (error) {
      console.error('Error verifying OTP with backend:', error);
      setResTrue(false); // Indicate failure for UI styling
      alert("An error occurred while verifying OTP. Please try again later.");
    }
  };




  // Update isOtpComplete when any otpValues change
  useEffect(() => {
    setIsOtpComplete(otpValues.every(val => val && val.length === 1));
  }, [otpValues]);

  return (
    <div className="otp-container flex justify-center items-center ~pt-[10rem]/20">
      <div className="otp-wrapper w-[90%] flex justify-center items-center font-outfit flex-col gap-4">
        {resTrue === false && <p className="text-red-500">OTP verification failed. Please try again.</p>}

        <div className="p-h flex flex-col items-center gap-2">
          <h1 className="text-2xl font-outfit font-medium">Enter OTP</h1>
          <p className="text-lg text-gray-400">We have sent an OTP to your number</p>
        </div>

        <div className="form-wrapper flex flex-col justify-center items-center gap-10 w-[100%]">
          <div className="otp-container flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                maxLength="1"
                type="number"
                {...register(`otp[${index}]`, { required: true })}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleChange(event, index)}
                onPaste={handlePaste}
                className={`focus:outline-none focus:ring-2 focus:ring-blue-500 otp-input border w-[50px] h-[50px] bg-gray-200 text-center text-2xl rounded-md ${resTrue === true ? 'border-mavride-blue' : resTrue === false ? 'border-red-500' : 'border-none'
                  }`}
              />
            ))}
          </div>

          {otpSent && (
            <p className="font-medium font-outfit">
              {otpCounter > 0 ? (
                <>
                  Resend code in <span className="text-blue-500 font-medium">{otpCounter} sec</span>
                </>
              ) : (
                <span className="text-blue-500 cursor-pointer" onClick={handleResendOtp}>
                  Resend
                </span>
              )}
            </p>
          )}


          <button
            type="button"
            className={`w-[100%] p-3 py-4 rounded-md text-xl ${isOtpComplete ? 'bg-mavride-blue text-white' : 'bg-gray-300 text-gray-500'}`}
            disabled={!isOtpComplete}
            onClick={verifyOtp}
          >
            Verify
          </button>

        </div>
      </div>
    </div>
  );
};

export default PhoneOtp;
