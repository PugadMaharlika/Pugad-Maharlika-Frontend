import axios from "axios";

const API = async (axiosConfig, shouldFetch = true, overrideConfig = {}) => {
  let data = null;
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
      data = response.data;
      error = null;
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  }

  return { data, error, loading };
};

export default API;

// import API from "../../service/API";

// async function sendData() {
//   const axiosConfig = {
//     url: "https://api.example.com/submit",
//     method: "POST",
//     data: {  // The data you want to post
//       name: "John Doe",
//       email: "john.doe@example.com",
//     },
//     headers: {
//       'Content-Type": "application/json',
//       'x-auth-token': authToken,              // Authorization token
//       'x-refresh-token': refreshToken,        // Custom refresh token header
//     },
//   };

//   const { data, error, loading } = await API(axiosConfig);
