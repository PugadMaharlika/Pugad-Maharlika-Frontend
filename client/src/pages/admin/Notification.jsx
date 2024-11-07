import NotificationTable from "../../components/ui/NotificationTable";
import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import API from "../../service/API";

export const Notification = ({
  setSelected,

  setNotificationselected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [notifications, setNotification] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");
  // UseEffect for View All notification
  useEffect(() => {
    const handleViewNotification = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/notification/view`,
        method: "GET",
        data: {},
      };

      const { res, error } = await API(config);
      if (res) {
        setIsLoading(false);
        setUser(res.data.account);
        setNotification(res.data.notifications);
      }
      if (error) console.log(error);
    };
    handleViewNotification();
  }, []); // Dependencies to rerun effect only when these values change

  const handleViewNotification = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/notification/view`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);
    if (res) {
      setIsLoading(false);
      setUser(res.data.account);
      setNotification(res.data.notifications);
    }
    if (error) console.log(error);
  };

  // UseEffect For Search Notification
  const handleSearchNotification = async () => {
    if (search == "") {
      handleViewNotification();
      return;
    }
    setErrors([]);
    setSuccess(false);

    if (!search.trim()) {
      return;
    }

    const config = {
      url: `${serverUrl}/notification/search?note_title=${search}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);
    if (res) {
      console.log(res.data.notification);
      setIsLoading(false);
      setUser(res.data.account);
      setNotification(res.data.notification);
    }
    if (error) {
      console.log(error);
      setErrors([error.response.data.errors.map((error) => error.msg)]);
    }
  };

  const handleYearSearch = async (year) => {
    setErrors([]);
    setSuccess(false);

    const config = {
      url: `${serverUrl}/notification/search-year?date_created=${year}`,
      method: "GET",
      data: {},
    };

    const { res, error } = await API(config);
    if (res) {
      console.log(res.data.notification);
      setIsLoading(false);
      setUser(res.data.account);
      setNotification(res.data.notification);
    }
    if (error) {
      console.log(error);
      setErrors([error.response.data.errors.map((error) => error.msg)]);
    }
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-4 container w-full`}
    >
      <div
        className={`flex flex-col sm:flex-row justify-between items-center w-full rounded-xl h-auto sm:h-16 shadow-md py-2 sm:p-3 font-bold ${
          theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
        }`}
      >
        <h1 className="text-2xl font-bold">Notification</h1>
        {user.role !== "P" && (
          <div className="flex justify-end w-full sm:w-auto mt-4 sm:mt-0">
            <button
              id="btn_AddNotification"
              onClick={() => {
                setSelected("AddNotification");
              }}
              className="hover:bg-green-700 bg-green-500 text-white rounded-lg px-4 py-2 text-sm md:text-md"
            >
              Add Notification
            </button>
          </div>
        )}
      </div>

      <div
        className={`col-span-6 overflow-hidden rounded-lg shadow-lg text-xs md:text-md w-full py-2 sm:py-6  sm:mt-10 ${
          theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {user.role !== "P" ? (
            <div className="w-full sm:w-full p-1 py-1 px-7 mb-4 sm:mb-0">
              <div className="flex items-center border rounded-md w-full">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-2 w-full rounded-l-md outline-none"
                />
                {/* Search Icon */}
                <button onClick={() => handleSearchNotification()}>
                  <i className="fa-solid fa-magnifying-glass p-2 "></i>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full sm:w-1/2 flex justify-end ml-auto mr-10">
              <select
                className="border border-gray-300 p-2  rounded-lg"
                value={selectedYear}
                onChange={(e) => {
                  const selectedOption = e.target.value;

                  if (selectedOption === "selectYear") {
                    handleViewNotification();
                  } else {
                    handleYearSearch(selectedOption); // Pass the selected year for year-based search
                  }
                  setSelectedYear(selectedOption); // Set the selected year
                }}
              >
                <option value="selectYear">Select Year</option>

                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>

        <NotificationTable
          setSelected={setSelected}
          notifications={notifications}
          setNotificationselected={setNotificationselected}
        />
      </div>
    </div>
  );
};
