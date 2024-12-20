import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";

const useDeleteVehicle = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const queryClient = useQueryClient();

  const deleteVehicle = async (id) => {
    const response = await axiosPrivate.delete(
      `providers/${providerId}/fleets/${id}`,
    );

    return response.data;
  };

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });
};
export default useDeleteVehicle;
