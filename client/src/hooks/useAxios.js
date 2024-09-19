import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxios = (axiosConfig, shouldFetch = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      try {
        const response = await axios({ ...axiosConfig, ...overrideConfig });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [axiosConfig]
  );

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [fetchData, shouldFetch]);

  return { data, error, loading, refetch: fetchData };
};

export default useAxios;

/*
DOCUMENTATION:

import useAxios from './useAxios';

const Dashboard = () => {
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { data, error, loading, refetch } = useAxios(
    {
      url: `${serverUrl}/app/dashboard`,
      method: 'GET',                           //this can be PUT,POST or GET
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': authToken,              // Authorization token
        'x-refresh-token': refreshToken,        // Custom refresh token header
      },
      data: {                                   //Your JSON data to pass unto the API
        id: 69,
        username: 'NewUser123',
        password: 'newpassword',
      },
    },
    false // Manual fetch, do not run on mount , set this to true to run on start
  );
  const handleRefreshContent = () =>{
        refetch(); // Manually trigger the request
    } 

    return(
         <div>
            <button onClick={handleRefreshContent} disabled={loading}>
                Get dashboard data
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && <p>Post Updated! ID: {data.id}</p>}
        </div>
    );
}
    
    
*/
