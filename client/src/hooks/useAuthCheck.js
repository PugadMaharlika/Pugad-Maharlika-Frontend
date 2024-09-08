import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!authToken || !refreshToken) {
      navigate("/");
      return; // Exit early if no tokens
    }

    axios
      .post(
        `${serverUrl}/auth/verify`,
        {},
        {
          headers: {
            "x-auth-token": authToken,
            "x-refresh-token": refreshToken,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
      })
      .catch((error) => {
        navigate("/");
        console.error(error.response ? error.response.data : error.message);
      });
  }, [navigate]); // Add navigate to dependencies
}

export default useAuthCheck;
