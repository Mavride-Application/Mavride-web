import React, { useEffect, useState } from 'react'
import OnboardingLayout from '../layouts/OnboardingLayout'
import { useForm } from 'react-hook-form'

const PhoneOtp = () => {
  const [otpSent, setOtpSent] = useState(true)
  const [isOtpComplete, setIsOtpComplete] = useState(false); // State to track OTP completeness

  const { register, handleSubmit, setValue, getValues, watch, formState: {isValid} } = useForm({
    defaultValues: {
      otp: ['', '', '', ''], // Assuming a 4-digit OTP
    },
    mode: 'onChange'
  });


  const onSubmit = (data) => {
    const otp = data.otp.join(''); // Combine all input values
    console.log('Submitted OTP:', otp);
  };

  const handleChange = (event, index) => {
    let value = event.target.value;
    
    value = value.slice(0, 1);
    // Handle backspace logic
    if (event.key === 'Backspace') {
      // Clear current value
      setValue(`otp[${index}]`, "", { shouldValidate: true, shouldDirty: true });
  
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

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text').slice(0, 4); // Get the pasted data
    if (pasteData.length === 4 && /^[0-9]+$/.test(pasteData)) { // Check if the pasted data is a 4-digit number
      pasteData.split('').forEach((char, index) => {
        setValue(`otp[${index}]`, char, { shouldValidate: true, shouldDirty: true });
      });

      // After pasting, focus on the last input field
      const lastInput = document.getElementById(`otp-${pasteData.length - 1}`);
      if (lastInput) {
        lastInput.focus();
      }
    }
  };
  
  
  
  useEffect(() => {
    const otpValues = watch('otp'); // Watch for OTP changes

    const isComplete = otpValues.every(val => val.length === 1); // Check if all OTP inputs are filled
    setIsOtpComplete(isComplete); // Update state, which triggers re-render
  }, [watch('otp')]); // Re-run the effect every time the OTP values change

  return (
    <OnboardingLayout>
      <div className="otp-container flex justify-center items-center">
        <div className="opt-wrapper w-[90%] flex justify-center items-center min-h-[50rem] font-outfit flex-col gap-4">
          <div className="p-h flex flex-col items-center gap-2">
            <h1 className='text-2xl font-outfit font-medium'>Enter OTP</h1>
            <p className='text-lg text-gray-400'>We will send an OTP to the number</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-[5em] w-[100%]'>
            <div className="otp-container flex gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  maxLength="1"
                  type="number"
                  {...register(`otp[${index}]`, {required: true})}
                  onChange={(event) => handleChange(event, index)}
                  onKeyDown={(event) => handleChange(event, index)}
                  onPaste={handlePaste}
                  className="focus:outline-none focus:ring-2 focus:ring-mavride-blue otp-input border w-[50px] h-[50px] bg-custom-gray border-none text-center text-2xl rounded-[.3em]"
                />
              ))}
            </div>

            {otpSent && <p className='font-medium font-outfit'>Resend code in <span className='color-mav text-mavride-blue font-medium'>30sec</span></p>}

            <button
              type="submit"
              className={`w-[70%] p-3 py-4 rounded-[.5em] bg-button-gray text-xl ${isValid ? 'bg-mavride-blue text-white' : 'bg-button-gray text-gray-500'}`}
              disabled={!isValid}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default PhoneOtp