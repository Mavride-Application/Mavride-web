import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const checkUserToken = () => {
  const navigate = useNavigate();

  // Helper function to decode JWT
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Extract payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload); // Return the decoded token
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  };

  const isTokenExpired = () => {

    const appName = "App1"; // Specify the application
    const tokenName = `accessToken_${appName}`; // App-specific token name
    const accessToken = Cookies.get(tokenName);

    if (!accessToken) {
      console.error("Access token missing for App1");
       return true;
    }

    const decodedToken = decodeJWT(accessToken);
    if (!decodedToken) {
      console.error("Invalid token format.");
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Decoded token:", decodedToken);
    console.log("Current time (seconds):", currentTime);

    if (decodedToken.exp) {
      console.log("Token expiration time (exp):", decodedToken.exp);
      return currentTime >= decodedToken.exp;
    } else {
      console.error("Token does not have an expiration time.");
      return true;
    }
  };

  useEffect(() => {
    if (isTokenExpired()) {
      alert("Your session has expired. Please log in again.");
      Cookies.remove("accessToken");
      navigate("/signin");
    }
  }, [navigate]);

  return null; // This component does not render anything
};

export default checkUserToken;
