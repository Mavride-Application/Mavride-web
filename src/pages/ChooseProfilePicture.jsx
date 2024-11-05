import OnboardingLayoutLite from "../layouts/OnboardingLayoutLite";
import camera from "../assets/camera.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ChooseProfilePicture = () => {
  const [image, setImage] = useState({
    name: "",
    image: undefined,
    preview: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    const image = event.target.files[0];
    const preview = URL.createObjectURL(image);
    setImage({ name: image.name, image, preview });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(image);
  };

  useEffect(() => {
    if (image.image) {
      setDisabled(false);
    }
  }, [image]);
  return (
    <OnboardingLayoutLite>
      <div className="mx-auto w-full max-w-[27.63rem] pb-12 pt-8 text-center">
        <h1 className="mb-2 font-medium ~text-xl/[1.81rem]">Choose Photo</h1>
        <p className="mx-auto max-w-64 text-sm text-[#8C8C8C]">
          Upload a photo for your profile picture. it can be changed later.
        </p>

        <form onSubmit={handleSubmit} className="~mt-6/8">
          <label
            htmlFor="profile-pic"
            className="relative mx-auto block cursor-pointer rounded-full bg-[#E7E9FB] bg-profile bg-center bg-no-repeat ~size-32/[9.5rem]"
          >
            {/* Profile Image Toggle Icon */}
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-0 z-[5] grid size-[2.19rem] cursor-pointer place-items-center rounded-full bg-white"
            >
              <img className="object-contain" src={camera} alt="camera-icon" />
            </label>
            {/* Hidden Image File Input */}
            <input
              hidden
              type="file"
              name="profile-pic"
              id="profile-pic"
              onChange={handleChange}
            />

            {/* Image Preview */}
            {image.preview && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <img
                  className="size-full object-cover"
                  src={image.preview}
                  alt={image.name}
                />
              </div>
            )}
          </label>

          <div className="mt-5">
            <h2 className="mb-2 font-medium ~text-base/lg">
              Choose profile picture
            </h2>
            <p className="mx-auto max-w-64 text-sm text-[#8C8C8C]">
              Your photo is used to identify you on the stay
            </p>
          </div>

          {/* Form Submit Button */}
          <NavLink to="/personalInfo">
            <button
              type="submit"
              disabled={disabled}
              className="w-full rounded-[0.625rem] bg-mavride-blue py-4 font-semibold text-white ~text-base/lg ~mt-5/8 disabled:bg-[#D3D3D3]"
            >
              Proceed
            </button>
          </NavLink>
        </form>
      </div>
    </OnboardingLayoutLite>
  );
};
export default ChooseProfilePicture;
