import { motion } from "framer-motion";
import { swiperSlides } from "../../lib/variants";
import FileInput from "../FileInput";

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
      <FileInput
        label="Driver’s license"
        subtext="Upload your driver’s license"
        name="driverLicense"
      />
      <FileInput
        label="Transport license"
        subtext="Upload your transport license"
        name="transportLicense"
      />
    </motion.div>
  );
};
export default UploadCertification;
