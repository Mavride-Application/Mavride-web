import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import logo from '../assets/logo_desktop.png'; // Update with the actual path to your logo
import backgroundImage from '../assets/bg_desktop.png'; // Update with the actual path to your background image

const Onboarding = () => {
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Step 1: Expand the blue background to full screen
    timeline
      .to(bgRef.current, {
        duration: 1.5,
        scaleX: 4, // Adjusting for a more dramatic pop
        scaleY: 2,
        ease: "power2.inOut",
      })
      // Step 2: Move the background left and then fade in the logo
      .to(bgRef.current, {
        duration: 1.5,
        scaleX: 1,
        scaleY: 1,
        x: "0%", // Moves the background to the left
        ease: "power2.inOut",
      })
      .to(
        logoRef.current,
        {
          duration: 1,
          opacity: 1,
          ease: "power2.inOut",
        },
        "-=0.5",
      ) // Start the logo fade-in after background animation finishes
      // Step 3: Show the form
      .to(
        formRef.current,
        {
          duration: 1,
          opacity: 1,
          x: "0%", // Ensure form comes into view
          ease: "power2.inOut",
        },
        "-=0.5",
      ); // Fade in form elements after the logo appears
  }, []);

  return (
    <div className="flex h-screen bg-white p-4 overflow-hidden">
      {/* Background section with image */}
      <div
        ref={bgRef}
        className="relative h-full w-1/2 overflow-hidden rounded-xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <img
            ref={logoRef}
            className="opacity-0" // Hidden initially
            src={logo} // Use the provided logo path
            alt="Mavride Logo"
          />
        </div>
      </div>

      {/* Sign-up section */}
      <div
        ref={formRef}
        className="flex h-full flex-1 translate-x-12 transform flex-col items-center justify-center opacity-0" // Center and adjust position
      >
        <div className="text-center">
          <h2 className="text-[2.5rem] font-semibold text-[#26203b]">Let’s Get You Started</h2>
          <p className="text-gray-500 mb-[4rem]">Create an Account with Us</p>
          <NavLink to='/signup'>
            <button className="bg-blue-800 text-white py-2 px-4 w-[20rem] rounded-md hover:bg-blue-900">
              Sign Up
            </button>
          </NavLink>
          <p className="mt-4 text-gray-600">
            Already have an Account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
          <div className="mt-[10rem] text-[0.7rem]">
            <p className="mb-[0.2rem] text-gray-500">
              By signing up to create an account I accept Company’s
            </p>
            <span className="">Terms of use & Privacy Policy.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
