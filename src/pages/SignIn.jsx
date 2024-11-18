import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logoblue from "../assets/logo_blue.svg";
import sign_pro from "../assets/sign_pro.png";
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full h-full bg-gray-50 scrollbar-none">
      {/* Back Arrow */}
      <div className="absolute inset-y-[100px] inset-x-[150px] items-start p-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-blue-600"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          
        </button>
      </div>

      {/* Sign In Form */}
      <div className="flex justify-center items-center">
        <div className="px-4">
          <div className="p-6">
            {/* Logo */}
            <div className="flex flex-col items-center pt-8 mb-12">
              <img src={logoblue} alt="Logo" className="w-1/3 h-12 mb-8" />
              
              <h1 className="text-2xl font-semibold">Sign in</h1>
              <p className="text-gray-500 text-base">
                Please enter your credentials to log in and continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  className={`mt-1 block w-full px-3 py-2 bg-gray-100 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Example@gmail.com"
                  autoComplete="email"
                />
                <input type="text" name="" id="" />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" id="password" className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Too short",
                      },
                    })}
                    className={`mt-1 block w-full px-3 py-2 bg-gray-100 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Password"
                     autoComplete="current-password"
                  />
                  <input type="text" />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="mb-4 text-sm text-center w-44 mx-auto">
                <a
                  href="/reset-password"
                  className="font-semibold"
                >
                  Forgot your password?<span style={{ color: "#0A1ED9" }}> Reset Password</span>
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </form>

            {/* Footer */}
            <p className="mt-24 text-sm w-64 mx-auto text-center text-gray-500">
              By signing up you accept our <span className="font-semibold" style={{color: "#26203B"}}>Terms of Use</span> &{" "}
              <span className="font-semibold" style={{color: "#26203B"}}>Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
