import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { PROVIDER_ID } from "@/lib/definitions";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const useAssignDriver = () => {
  const axiosPrivate = useAxiosPrivate();

  const assignDriver = async (data) => {
    const providerId = Cookies.get(PROVIDER_ID);

    const res = await axiosPrivate.post(
      `providers/${providerId}/fleets/assign-driver`,
      data,
    );
  };

  return useMutation({
    mutationFn: assignDriver,
  });
};
export default useAssignDriver;
