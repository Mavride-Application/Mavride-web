import React from 'react'
import OnboardingLayout from '../layouts/OnboardingLayout'
import { useForm } from 'react-hook-form'

const PhoneOtp = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      otp: ['', '', '', '', '', ''], // Assuming a 6-digit OTP
    },
  });

  const onSubmit = (data) => {
    const otp = data.otp.join(''); // Combine all input values
    console.log('Submitted OTP:', otp);
  };

  const handleChange = (event, index) => {
    const value = event.target.value;
    if (value.length === 1 && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }


  };

  return (
    <OnboardingLayout>
      <div className="otp-container flex justify-center items-center">
        <div className="opt-wrapper w-[90%] flex justify-center items-center min-h-[50rem] font-outfit flex-col gap-4">
          <div className="p-h flex flex-col items-center gap-2">
            <h1 className='text-2xl font-outfit font-medium'>Enter OTP</h1>
            <p className='text-lg text-gray-400'>We will send an OTP to the number</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
            <div className="otp-container">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  maxLength="1"
                  type="text"
                  {...register(`otp[${index}]`)}
                  onChange={(event) => handleChange(event, index)}
                  className="otp-input border"
                />
              ))}
            </div>

            <button type="submit">Verify OTP</button>
          </form>
        </div>
      </div>
    </OnboardingLayout>
  )
}

export default PhoneOtp