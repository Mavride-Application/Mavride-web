import FileInput from "../UI/FileInput";

const VehicleDocuments = () => {
  return (
    <>
      <div>
        <h4 className="mb-4 text-lg">Vehicle document</h4>
        <div className="space-y-4">
          <FileInput
            label="Vehicle Insurance"
            subtext="Upload your vehicle insurance"
            name="vehicle_insurance"
          />
          <FileInput
            label="Exterior photo of vehicle"
            subtext="Upload vehicle’s exterior photo"
            name="vehicle_exterior"
          />
          <FileInput
            label="Interior photo of vehicle"
            subtext="Upload vehicle’s interior photo"
            name="vehicle_interior"
          />
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-lg">Government requirements</h4>
        <div className="space-y-4">
          <FileInput
            label="Proof of car ownership"
            subtext="Upload proof of car ownership"
            name="car_ownership"
          />
          <FileInput
            label="Road worthiness"
            subtext="Upload road worthiness"
            name="road_worthiness"
          />
        </div>
      </div>
    </>
  );
};
export default VehicleDocuments;
