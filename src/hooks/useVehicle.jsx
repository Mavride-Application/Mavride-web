import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";

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
