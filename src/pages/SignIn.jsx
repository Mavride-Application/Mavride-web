import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Import Cookies
import logoblue from "../assets/logo_blue.svg";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data); // Log the submitted data for debugging

      const res = await fetch(
        "https://yv6zgf4z0d.execute-api.eu-north-1.amazonaws.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const result = await res.json();
      console.log("Login result:", result);

      // Check if access token is present in the result
      if (result.access) {
        setCookies(result.access, "App1"); // Store the access token in cookies
        Cookies.set("refreshToken_App1", result.refresh, { expires: 1 });
        Cookies.set("provider_id", result.id, { expires: 1 });
        console.log("Login successful", result);
        navigate("/userManagement/overview"); // Redirect after successful login
      } else {
        throw new Error("Authentication token is missing");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  const setCookies = (authToken, appName) => {
    const tokenName = `accessToken_${appName}`; // App-specific name
    Cookies.set(tokenName, authToken, { expires: 1 });
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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {/* Phone Number Field */}
              <div className="relative mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please input a valid email address",
                    },
                  })}
                  className={`mt-1 block w-full border bg-gray-100 px-3 py-2 ${
                    errors.phone_number ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
                  placeholder="Example@gmail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
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
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
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
                className="relative w-full cursor-pointer rounded-md bg-blue-800 py-2 font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
