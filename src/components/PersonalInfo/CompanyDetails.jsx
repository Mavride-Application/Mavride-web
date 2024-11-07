import { swiperSlides } from "../../lib/variants";
import Input from "../Input";

import { motion } from "framer-motion";

const CompanyDetails = ({ forwards }) => {
  return (
    <motion.div
      variants={swiperSlides}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={forwards}
      className="space-y-5"
    >
      <Input
        label="Name"
        id="name"
        name="companyName"
        type="text"
        placeholder="Enter Company’s Name"
        required={true}
        errorMsg="Please enter your company's name"
      />
      <Input
        label="Address"
        id="address"
        name="companyAddress"
        type="text"
        placeholder="Enter Company’s Address"
        required={true}
        errorMsg="Please enter your company's address"
      />
      <Input
        label="Phone Number"
        id="phoneNumber"
        name="companyPhoneNumber"
        type="number"
        placeholder="Enter Company Phone Number"
        required={true}
        errorMsg="Please enter your company's phone number"
      />
    </motion.div>
  );
};
export default CompanyDetails;
