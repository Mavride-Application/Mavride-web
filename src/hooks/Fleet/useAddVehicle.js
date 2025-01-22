import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";


const useAddVehicle = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const queryClient = useQueryClient();

  const addVehicle = async (data) => {
    const response = await axiosPrivate.post(
      `providers/${providerId}/fleets`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  };

  return useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });
};
export default useAddVehicle;
