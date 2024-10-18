import file_icon from "../assets/file_icon.svg";
import upload_icon from "../assets/upload_file_icon.svg";

import { motion } from "framer-motion";
import { swiperSlides } from "../lib/variants";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

const Card = ({ label, subtext, name }) => {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  // console.log(watch());

  const handleChange = async (event) => {
    setValue(name, event.target.files[0]);
    await trigger(["transportLicense", "driverLicense"], { shouldFocus: true });
  };

  useEffect(() => {
    register(name);
  }, []);

  return (
    <label
      onClick={(event) => {
        event.stopPropagation();
      }}
      className="block cursor-pointer rounded-[0.625rem] bg-white px-5 py-4"
    >
      <div className="flex items-center gap-[0.63rem]">
        <span className="block size-[2.44rem] rounded-full">
          <img className="w-full" src={file_icon} alt="file" />
        </span>
        <div>
          <h6 className="font-medium ~text-base/lg">{label}</h6>
          <p className="text-sm text-[#8C8C8C]">{subtext}</p>
        </div>

        <div className="ml-auto w-4">
          <img src={upload_icon} alt="upload" />
        </div>
      </div>
      <input
        hidden
        onClick={(event) => {
          event.stopPropagation();
        }}
        type="file"
        onChange={handleChange}
      />
    </label>
  );
};

const UploadCertification = ({ forwards }) => {
  return (
    <motion.div
      variants={swiperSlides}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={forwards}
      className="space-y-[1.62rem]"
    >
      <Card
        label="Driver’s license"
        subtext="Upload your driver’s license"
        name="driverLicense"
      />
      <Card
        label="Transport license"
        subtext="Upload your transport license"
        name="transportLicense"
      />
    </motion.div>
  );
};
export default UploadCertification;
