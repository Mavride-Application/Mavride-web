import AddVehicle from "./AddVehicle";
import { useParams } from "react-router-dom";
import { replaceFileWithFileList } from "@/lib/utils";
import useVehicle from "@/hooks/Fleet/useVehicle";

const EditVehicle = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useVehicle(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred...</div>;
  }

  let vehicle = {
    license_plate: data.license_plate,
    vehicle_type: data?.vehicle_type,
    vehicle_model: data?.vehicle_model,
    vehicle_color: data?.vehicle_color,
    service_offering: data?.service_offering,
  };

  vehicle = replaceFileWithFileList(vehicle);

  return <AddVehicle defaultValues={vehicle} edit={true} />;
};
export default EditVehicle;
