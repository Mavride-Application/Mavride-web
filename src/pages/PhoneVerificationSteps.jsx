import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import OnboardingLayout from '../layouts/OnboardingLayout';
import EnterPhoneNumber from '../components/EnterPhoneNumber';
import PhoneOtp from '../components/PhoneOtp';

const PhoneVerificationSteps = () => {
    const [currentStep, setCurrentStep] = useState('phone'); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [otpCode, setOtpCode] = useState(''); // Store the OTP for testing

    const methods = useForm({
        defaultValues: {
            otp: ['', '', '', '']
        },
        mode: 'onChange',
    });

    const { handleSubmit } = methods;

    // Function to request OTP
    const requestOtp = async (validPhoneNumber) => {
        try {
            const response = await fetch('http://13.53.133.131/api/v1/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: validPhoneNumber })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const responseData = await response.json();
            setOtpCode(responseData.otp); // Store OTP for testing purposes
            console.log('OTP:', responseData.otp); // Log the OTP for testing

            setCurrentStep('otp'); // Move to OTP step
        } catch (error) {
            console.error('Error requesting OTP:', error);
        }
    };

    const onSubmit = (data) => {
        if (currentStep === 'phone') {
            const validPhoneNumber = data.phoneNumber;
            setPhoneNumber(validPhoneNumber);
            requestOtp(validPhoneNumber);
            console.log(data.phoneNumber)
        }
    }

    return (
        <OnboardingLayout>
            <div className="mx-auto w-full max-w-[27.63rem] ">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {currentStep === 'phone' && <EnterPhoneNumber />}
                        {currentStep === 'otp' && <PhoneOtp phoneNumber={phoneNumber} otpCode={otpCode} />}
                    </form>
                </FormProvider>
            </div>
        </OnboardingLayout>
    )
}

export default PhoneVerificationSteps;
