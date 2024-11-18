import { useFormContext } from "react-hook-form";
import { swiperSlides } from "../../lib/variants";
import Input from "../UI/Input";
import Select from "../UI/Select";

import { motion } from "framer-motion";

const PersonalInfo = ({ forwards }) => {
  const { watch } = useFormContext();
  const passwordValue = watch("password");

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
        id="fullname"
        name="fullname"
        type="text"
        placeholder="Enter Full Name"
        required={true}
        errorMsg="Please enter your full name"
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
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter Email Address"
        required={true}
        errorMsg="Please enter your email"
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter Password"
        required={true}
        pattern={{
          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          message:
            "Password should combination of letters, numbers, and special characters e.g. a1@",
        }}
        validations={{
          minLength: (value) =>
            value.length > 5 || "Password must at least 6 characters",
        }}
      />
      <Input
        label="Confirm Password"
        id="confirm_password"
        name="confirm_password"
        type="password"
        placeholder="Confirm Password"
        required={true}
        validations={{
          sameAsPassword: (value) =>
            value === passwordValue || "Password does not match",
        }}
      />
    </motion.div>
  );
};
export default PersonalInfo;
