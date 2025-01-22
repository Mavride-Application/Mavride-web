import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";

const useUpdateVehicle = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const queryClient = useQueryClient();

  const updateVehicle = async ({ id, data }) => {
    const response = await axiosPrivate.patch(
      `providers/${providerId}/fleets/${id}`,
      data,
    );

    return response.data;
  };

  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });
};
export default useUpdateVehicle;
