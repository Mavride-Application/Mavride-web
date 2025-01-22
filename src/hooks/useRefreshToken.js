import axios from "@/api/axios";
import { REFRESH_EP } from "@/api/endpoints";
import Cookies from "js-cookie";

/**
 * A custom hook that provides a function to refresh the access token using a stored refresh token.
 *
 * This function retrieves the `refreshToken` stored in cookies, sends it to the server,
 * updates the cookie with a new refresh token upon successful response,
 * and returns the new access token.
 *
 * @returns {Function} - The `refreshToken` function to be called for refreshing the access token.
 *
 * Usage:
 * const refreshToken = useRefreshToken();
 * const accessToken = await refreshToken();
 */
const useRefreshToken = () => {
  // Retrieve the refresh token from cookies
  const refresh = Cookies.get("refreshToken_App1");

  /**
   * Refresh the access token by making a request to the refresh token endpoint.
   *
   * @async
   * @returns {string} The new access token if the refresh is successful.
   * @throws {Error} Throws an error if no refresh token is found or if the server request fails.
   */
  const refreshToken = async () => {
    try {
      // Exit early if no refresh token is found
      if (!refresh) {
        throw new Error("User isn't logged in: No refresh token found.");
      }

      // Send a POST request to the refresh endpoint with the current refresh token
      const response = await axios.post(REFRESH_EP, { refresh });

      // Get the access token from the server response
      const newAccessToken = response.data.access;

      // Update the access token in cookies
      Cookies.set("accessToken_App1", newAccessToken, { expires: 1 }); // Adjust `expires` if needed

      // Return the new access token
      return newAccessToken;
    } catch (error) {
      // Log the error and rethrow it for the caller to handle
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
