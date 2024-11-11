import FileInput from "../UI/FileInput";

const FormStepThree = () => {
  return (
    <>
      <div>
        <h4 className="mb-4 text-lg">Vehicle document</h4>
        <div className="space-y-4">
          <FileInput
            label="Vehicle Insurance"
            subtext="Upload your vehicle insurance"
            name="vehicleInsurance"
          />
          <FileInput
            label="Exterior photo of vehicle"
            subtext="Upload vehicle’s exterior photo"
            name="vehiclePhotoExterior"
          />
          <FileInput
            label="Interior photo of vehicle"
            subtext="Upload vehicle’s interior photo"
            name="vehiclePhotoInterior"
          />
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-lg">Government requirements</h4>
        <div className="space-y-4">
          <FileInput
            label="Proof of car ownership"
            subtext="Upload proof of car ownership"
            name="carOwnershipProof"
          />
          <FileInput
            label="Road worthiness"
            subtext="Upload road worthiness"
            name="roadWorthiness"
          />
        </div>
      </div>
    </>
  );
};
export default FormStepThree;
