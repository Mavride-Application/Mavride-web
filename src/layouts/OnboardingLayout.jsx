import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../assets/logo_desktop.png";
import { Autoplay, Pagination } from "swiper/modules";

const leftSlides = [
  {
    id: "001",
    heading: "Compassionate & Timely",
    text: "Powered by cutting-edge technology and a steadfast commitment to providing safe and secure transportation services.",
  },
  {
    id: "002",
    heading: "Integrity & Innovation",
    text: "Powered by cutting-edge technology and a steadfast commitment to providing safe and secure transportation services.",
  },
];

const OnboardingLayout = ({ children }) => {
  return (
    <section id="onboarding-layout" className="padding-inline py-8 sm:~px-5/8">
      <div className="w-full gap-5 md:grid md:grid-cols-2">
        {/* Left Column */}
        <div className="hidden min-h-[50rem] w-full flex-col justify-between rounded-3xl bg-signupBg bg-cover bg-no-repeat py-[6.75rem] md:flex">
          {/* Image Logo */}
          <div className="mx-auto max-w-[7.38rem]">
            <img
              className="w-full object-contain"
              src={logo}
              alt="mavride logo"
            />
          </div>

          {/* Swiper Component */}
          <div className="text-center text-white">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              speed={1000}
              centeredSlides={true}
              loop={true}
              spaceBetween={160}
              className="max-w-[90%]"
            >
              {leftSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <h1 className="mb-[1.12rem] font-bold ~text-2xl/[2.5rem]">
                    {slide.heading}
                  </h1>
                  <p className="mx-auto max-w-[28.75rem] ~text-base/lg">
                    {slide.text}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Child Component */}
          {children}

          {/* Small Text Below */}
          <div className="mx-auto mb-[0.81rem] mt-auto hidden max-w-fit text-center text-xs md:block">
            <p className="text-[#9C9AA5]">
              By signing up to create an account I accept Company’s
              <span className="block font-medium text-mavride-deep-blue">
                Terms of use & Privacy Policy.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OnboardingLayout;
