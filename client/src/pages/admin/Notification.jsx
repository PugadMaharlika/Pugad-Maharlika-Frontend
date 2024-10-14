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

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full `}
    >
      <div className="flex w-full text-xl rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 font-bold">
        Notification
      </div>
      <div className="flex justify-end px-9 py-3">
        {user.role != "P" && (
          <button
            id="btn_AddNotification"
            onClick={() => {
              setSelected("AddNotification");
            }}
            className="rounded-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6"
          >
            Add Notification
          </button>
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
