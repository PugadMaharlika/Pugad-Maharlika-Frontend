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
  const [notifications, setNotification] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  // UseEffect for View All notification
  useEffect(() => {
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
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  //HANDLER For Search Notification
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
      setIsLoading(false);
      setUser(res.data.account);
      setNotification(res.data.notification);
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };
  // PLAYER SEARCH BY YEAR
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
      setIsLoading(false);
      setUser(res.data.account);
      setNotification(res.data.notification);
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  // HANDLE NOTIFICATION TYPE SEARCH
  useEffect(() => {
    const handleNotificationType = async () => {
      setErrors([]);
      setSuccess(false);
      console.log("TYPE: ", type);

      const config = {
        url: `${serverUrl}/notification/notification-type?note_type=${type}`,
        method: "GET",
        data: {},
      };

      const { res, error } = await API(config);
      if (res) {
        setIsLoading(false);
        setUser(res.data.account);
        setNotification(res.data.notification);
      }
      if (error) {
        console.log(error);
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };
    if (type !== "All") {
      handleNotificationType();
    } else {
      handleViewNotification();
    }
  }, [type]);

  return (
    <div className={`col-span-8 overflow-hidden rounded-lg sm:w-full`}>
      <div
        className={`flex w-full flex-col sm:flex-row justify-between items-center rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        NOTIFICATIONS
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
        className={`col-span-6 overflow-hidden rounded-lg shadow-lg text-xs md:text-md w-full py-2 sm:py-6 mt-4 ${
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
              {/*Search by Notification type */}
              <div className="w-full mt-5 sm:w-1/2 flex justify-end ml-auto mr-1">
                <select
                  value={type}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setType(selectedType);
                  }}
                  className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
                >
                  <option default value="All">
                    All
                  </option>
                  <option value="G">Global</option>
                  <option value="P">Player</option>
                </select>
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
                <option default value="selectYear">
                  Select Year
                </option>

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
