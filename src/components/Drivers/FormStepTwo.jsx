import Input from "../Input";
import Select from "../Select";

const FormStepTwo = () => {
  return (
    <>
      <Input
        label="License Plate"
        name="licensePlate"
        required
        placeholder="Enter License Plate"
      />
      <Select
        label="Vehicle Type"
        name="vehicleType"
        required
        placeholder="Enter Vehicle Type"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
      <Select
        label="Vehicle Model"
        name="vehicleModel"
        required
        placeholder="Enter Vehicle Model"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
      <Input
        label="Vehicle Color"
        name="vehicleColor"
        required
        placeholder="Enter Vehicle Color"
      />
      <Select
        label="Service Offering"
        name="serviceOffering"
        required
        placeholder="Service Type"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
    </>
  );
};
export default FormStepTwo;
