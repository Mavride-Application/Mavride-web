import Input from "../../UI/Input";
import Select from "../../UI/Select";

const VehicleDetails = () => {
  return (
    <>
      <Input
        label="License Plate"
        name="license_plate"
        required
        placeholder="Enter License Plate"
        registerOptions={{
          maxLength: {
            value: 10,
            message: "Maximum of 10 characters allowed",
          },
        }}
      />
      <Select
        label="Vehicle Type"
        name="vehicle_type"
        required
        placeholder="Enter Vehicle Type"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
      <Select
        label="Vehicle Model"
        name="vehicle_model"
        required
        placeholder="Enter Vehicle Model"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
      <Input
        label="Vehicle Color"
        name="vehicle_color"
        required
        placeholder="Enter Vehicle Color"
      />
      <Select
        label="Service Offering"
        name="service_offering"
        required
        placeholder="Service Type"
        options={["Transportation", "Ambulance", "Wheelchair", "Stretcher"]}
      />
    </>
  );
};
export default VehicleDetails;
