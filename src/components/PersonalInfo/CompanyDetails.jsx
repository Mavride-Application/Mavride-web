import { swiperSlides } from "../../lib/variants";
import Input from "../UI/Input";

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
        id="company_name"
        name="company_name"
        type="text"
        placeholder="Enter Company’s Name"
        required={true}
        errorMsg="Please enter your company's name"
      />
      <Input
        label="Address"
        id="company_address"
        name="company_address"
        type="text"
        placeholder="Enter Company’s Address"
        required={true}
        errorMsg="Please enter your company's address"
      />
      <Input
        label="Phone Number"
        id="company_contacts"
        name="company_contacts"
        type="number"
        placeholder="Enter Company Phone Number"
        required={true}
        errorMsg="Please enter your company's phone number"
      />
    </motion.div>
  );
};
export default CompanyDetails;
