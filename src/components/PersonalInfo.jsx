import { swiperSlides } from "../lib/variants";
import Input from "./Input";
import Select from "./Select";

import { motion } from "framer-motion";

const PersonalInfo = ({ forwards }) => {
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
        label="Full name"
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Enter Full Name"
        required={true}
        errorMsg="Please enter your full name"
      />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter Email Address"
        required={true}
        errorMsg="Please enter your email"
      />
      <Select
        label="Gender"
        id="gender"
        name="gender"
        placeholder="Gender"
        required={true}
        errorMsg="Please state your gender"
        options={["Male", "Female", "Others"]}
      />
    </motion.div>
  );
};
export default PersonalInfo;
