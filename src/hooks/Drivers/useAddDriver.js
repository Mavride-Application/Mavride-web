import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PROVIDER_ID } from "@/lib/definitions";
import useAxiosPrivate from "../useAxiosPrivate";

const useAddDriver = () => {
  const axiosPrivate = useAxiosPrivate();

  const providerId = Cookies.get(PROVIDER_ID);

  const queryClient = useQueryClient();

  const addDriver = async (data) => {
    const response = await axiosPrivate.post(
      `providers/${providerId}/refer-driver`,
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
    mutationFn: addDriver,
    onSuccess: () => {
      queryClient.invalidateQueries(["drivers"]);
    },
  });
};
export default useAddDriver;
