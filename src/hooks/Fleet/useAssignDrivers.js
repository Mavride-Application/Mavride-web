import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";

const useAssignDrivers = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const assignDrivers = async () => {
    const response = await axiosPrivate.get(
      `/providers/${providerId}/fleets/assign-driver`,
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["assign-drivers"],
    queryFn: assignDrivers,
  });
};
export default useAssignDrivers;
