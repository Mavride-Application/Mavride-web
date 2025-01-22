import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";

const useVehicles = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const getVehicles = async () => {
    const response = await axiosPrivate.get(`/providers/${providerId}/fleets`);
    return response.data;
  };

  return useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });
};
export default useVehicles;
