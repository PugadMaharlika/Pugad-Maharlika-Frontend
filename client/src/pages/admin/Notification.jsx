import NotificationTable from "../../components/ui/NotificationTable";
import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";

export const Notification = ({ setSelected, setNotificationselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [notifications, setNotification] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isloading, setIsloading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const handleViewNotification = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/notification/view`,
        method: "GET",
        data: {},
      };

      const { res, error, loading } = await API(config);
      if (res) {
        setIsloading(false);
        setUser(res.data.account);
        setNotification(res.data.notifications);
      }
      if (error) console.log(error);
    };
    handleViewNotification();
  }, []); // Dependencies to rerun effect only when these values change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  // sort notifications by the selected year by filtering notification based on year.
  useEffect(() => {
    if (selectedYear) {
      // Logic to filter or sort notifications by the selected year
      const filteredNotifications = notifications.filter((notification) => {
        // Ensure the DATE_CREATED is a valid Date object and extract the year
        const notificationDate = new Date(notification.DATE_CREATED);
        const notificationYear = notificationDate.getFullYear(); // Extract the year part

        return notificationYear === parseInt(selectedYear);
      });
      setNotification(filteredNotifications);
    }
  }, [selectedYear]);
  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full `}
    >
      <div className="flex w-full text-xl rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 font-bold">
        Notification
      </div>
      <div className="flex flex-col">
        {user.role != "P" && (
          <div className="flex justify-between items-center px-9 py-3">
            {/* Add Notification Button positioned at the top-right */}
            <div className="flex justify-end w-full">
              <button
                id="btn_AddNotification"
                onClick={() => {
                  setSelected("AddNotification");
                }}
                className="rounded-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6"
              >
                Add Notification
              </button>
            </div>
          </div>
        )}
        {/* Search bar full width underneath */}
        {user.role != "P" && (
          <div className="w-full p-1 py-2">
            <div className="flex items-center border rounded-md">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                className="p-2 w-full rounded-l-md outline-none"
              />
              {/* Search Icon */}
              <i className="fa-solid fa-magnifying-glass p-2 "></i>
            </div>
          </div>
        )}
        {user.role == "P" && (
          <div className="flex justify-between items-center px-1 py-3">
            <div className="flex justify-end w-full">
              {/* Year Dropdown */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
              >
                <option value="">Select Year</option>
                {/* Populate dropdown with year options */}
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
          </div>
        )}
      </div>

      <NotificationTable
        setSelected={setSelected}
        notifications={notifications}
        setNotificationselected={setNotificationselected}
      />
    </div>
  );
};
