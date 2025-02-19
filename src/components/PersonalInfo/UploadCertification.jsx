import { motion } from "framer-motion";
import { swiperSlides } from "../../lib/variants";
import FileInput from "../UI/FileInput";

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
        label="Health license"
        subtext="Upload your health license"
        name="health_license"
        accept="application/pdf"
      />
      <FileInput
        label="Transport license"
        subtext="Upload your transport license"
        name="transport_license"
        accept="application/pdf"
      />
    </motion.div>
  );
};
export default UploadCertification;
