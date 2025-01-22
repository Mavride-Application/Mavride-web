import { ACCEPT_IMG } from "@/lib/definitions";
import FileInput from "../../UI/FileInput";

const VehicleDocuments = () => {
  return (
    <>
      <div>
        <h4 className="mb-4 text-lg">Vehicle document</h4>
        <div className="space-y-4">
          <FileInput
            label="Vehicle Insurance"
            subtext="Upload your vehicle insurance"
            name="vehicle_ins"
          />
          <FileInput
            label="Exterior photo of vehicle"
            subtext="Upload vehicle’s exterior photo"
            name="exterior_photos"
            accept={ACCEPT_IMG}
          />
          <FileInput
            label="Interior photo of vehicle"
            subtext="Upload vehicle’s interior photo"
            name="interior_photos"
            accept={ACCEPT_IMG}
          />
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-lg">Government requirements</h4>
        <div className="space-y-4">
          <FileInput
            label="Proof of car ownership"
            subtext="Upload proof of car ownership"
            name="proof_ownership"
          />
          <FileInput
            label="Road worthiness"
            subtext="Upload road worthiness"
            name="road_worthy"
          />
        </div>
      </div>
    </>
  );
};
export default VehicleDocuments;
