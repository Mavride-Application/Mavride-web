import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import logo from '../assets/logo_desktop.png';
import backgroundImage from '../assets/bg_desktop.png'; 

const Onboarding = () => {
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

   
    timeline
      .to(bgRef.current, {
        duration: 1.5,
        scaleX: 4, 
        scaleY: 2,
        ease: "power2.inOut",
      })
     
      .to(bgRef.current, {
        duration: 1.5,
        scaleX: 1,
        scaleY: 1,
        x: '0%', 
        ease: 'power2.inOut',
      })
      .to(logoRef.current, {
        duration: 1,
        opacity: 1,
        ease: 'power2.inOut',
      }, '-=0.5') 
      .to(formRef.current, {
        duration: 1,
        opacity: 1,
        x: '0%', 
        ease: 'power2.inOut',
      }, '-=0.5');
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
            className="opacity-0" 
            src={logo} 
            alt="Mavride Logo"
          />
        </div>
      </div>

      {/* Sign-up section */}
      <div
        ref={formRef}
        className="flex-1 h-full flex flex-col justify-center items-center opacity-0 transform translate-x-12 " 
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
