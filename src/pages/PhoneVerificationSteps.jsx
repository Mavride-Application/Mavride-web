import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import OnboardingLayout from '../layouts/OnboardingLayout'
import EnterPhoneNumber from './EnterPhoneNumber'
import PhoneOtp from './PhoneOtp'

const PhoneVerificationSteps = () => {
    const [currentStep, setCurrentStep] = useState('phone'); // Tracks the current step ('phone' or 'otp')
    const [phoneNumber, setPhoneNumber] = useState(''); // Store the phone number

    const methods = useForm({
        defaultValues: {
            otp: ['', '', '', ''] // Default value for OTP (4 empty strings for 4 digits)
        },
        mode: 'onChange',
        
    });

    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        if(currentStep === 'phone'){
            const validPhoneNumber = data.phoneNumber; // Assume validation is done
            setPhoneNumber(validPhoneNumber); // Store the phone number
            setCurrentStep('otp'); // Move to the OTP step
            console.log(data)
        }else{
            const otp = data.otp.join(''); // Combine all input values
            console.log('Submitted OTP:', otp);
            // Here will be to verify otp or other actions
        }
        
    }



    

    return (
        <OnboardingLayout>
            <div className="mx-auto w-full max-w-[27.63rem]">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        {currentStep === 'phone' && (
                            <EnterPhoneNumber  />
                        )}

                        {currentStep === 'otp' && (
                            <PhoneOtp phoneNumber={phoneNumber}  />
                        )}
                    </form>
                </FormProvider>
            </div>
        </OnboardingLayout>
    )
}

export default PhoneVerificationSteps