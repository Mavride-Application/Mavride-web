import logo_blue from "../assets/logo_blue.svg";

const OnboardingLayoutLite = ({ className, children }) => {
  return (
    <div
      className={`padding-inline flex min-h-screen w-full flex-col items-stretch pb-[2.81rem] pt-[4.69rem] ${className} transition-colors duration-500`}
    >
      {/* Image Logo */}
      <div className="mx-auto max-w-[7.38rem]">
        <img
          className="w-full object-contain"
          src={logo_blue}
          alt="mavride logo"
        />
      </div>

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
  );
};
export default OnboardingLayoutLite;
