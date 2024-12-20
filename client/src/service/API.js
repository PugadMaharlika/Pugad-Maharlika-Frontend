import axios from "axios";

const API = async (axiosConfig, shouldFetch = true, overrideConfig = {}) => {
  let res = null;
  let error = null;
  let loading = false;

  axiosConfig.headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("authToken"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  };
  if (shouldFetch) {
    loading = true;
    try {
      const response = await axios({ ...axiosConfig, ...overrideConfig });
      res = response;
      error = null;
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  }

  return { res, error, loading };
};

export default API;

// import API from "../../service/API";

// async function sendresponse() {
//   const axiosConfig = {
//     url: "https://api.example.com/submit",
//     method: "POST",
//     response: {  // The response you want to post
//       name: "John Doe",
//       email: "john.doe@example.com",
//     },
//     headers: {
//       'Content-Type": "application/json',
//       'x-auth-token': authToken,              // Authorization token
//       'x-refresh-token': refreshToken,        // Custom refresh token header
//     },
//   };

//   const { response, error, loading } = await API(axiosConfig);
