import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";

const useVehicle = (id) => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const getVehicle = async () => {
    const response = await axiosPrivate.get(
      `/providers/${providerId}/fleets/${id}`,
    );

    return response.data;
  };

  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: getVehicle,
    enabled: !!id,
  });
};
export default useVehicle;
