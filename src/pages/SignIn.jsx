import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logoblue from "../assets/logo_blue.svg";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data); // Log the submitted data for debugging

      const res = await fetch(
        "https://yv6zgf4z0d.execute-api.eu-north-1.amazonaws.com/api/v1/auth/login ",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: data.phone_number,
            password: data.password,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const result = await res.json();
      console.log("Login successful", result);
      window.location.href = '/userManagement';
      // Handle successful login (e.g., redirect or store tokens)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <div className="h-full min-h-screen w-full bg-gray-50 scrollbar-none">
      <div className="absolute inset-x-[150px] inset-y-[100px] items-start p-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-700 hover:text-blue-600"
        >
          <ArrowLeftIcon className="mr-1 h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="px-4">
          <div className="p-6">
            <div className="mb-12 flex flex-col items-center pt-8">
              <img src={logoblue} alt="Logo" className="mb-8 h-12 w-1/3" />

              <h1 className="text-2xl font-semibold">Sign in</h1>
              <p className="text-base text-gray-500">
                Please enter your credentials to log in and continue
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Phone Number Field */}
              <div className="relative mb-4">
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  {...register("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number format",
                    },
                  })}
                  className={`mt-1 block w-full border bg-gray-100 px-3 py-2 ${
                    errors.phone_number ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  placeholder="Enter your phone number"
                />
                {errors.phone_number && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  id="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`mt-1 block w-full border bg-gray-100 px-3 py-2 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                    placeholder="Password"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-800 py-2 font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
