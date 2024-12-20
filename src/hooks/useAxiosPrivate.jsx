import { axiosPrivate } from "@/api/axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const access = Cookies.get("accessToken_App1");
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (access) config.headers["Authorization"] = `Bearer ${access}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401) {
          if (!prevRequest.sent) {
            try {
              console.log("error error error");
              const newAccessToken = await refreshToken();
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              prevRequest.sent = true;
              return axiosPrivate(prevRequest);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [access, refreshToken]);

  return axiosPrivate;
};
export default useAxiosPrivate;
