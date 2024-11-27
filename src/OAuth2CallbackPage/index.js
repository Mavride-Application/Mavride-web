import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

const OAuth2CallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    
    const accessToken = searchParams.get("accessToken_App1");

    if (accessToken && accessToken.split(".").length === 3) {
      // Basic JWT validation
      console.log("Access token found:", accessToken); // Debugging line
      Cookies.set("accessToken_App1", accessToken, { expires: 1 }); // Scoped cookie name
      navigate("/userManagement");
    } else {
      console.error("Access token not found or invalid in URL parameters");
      alert("Authentication failed. Please try logging in again.");
      navigate("/signin");
    }
  }, [navigate, searchParams]);

  return <div>Redirecting...</div>;
};

export default OAuth2CallbackPage;
