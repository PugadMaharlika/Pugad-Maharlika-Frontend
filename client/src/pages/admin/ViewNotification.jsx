import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";
{
  /*Get Props*/
}
export const ViewNotification = ({
  setSelected,
  notificationselected,
  setNotificationselected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState(null);
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
        url: `${serverUrl}/notification/view-note?note_id=${notificationselected}`,
        method: "GET",
        data: {},
      };

      const { res, error, loading } = await API(config);
      if (res) {
        setIsloading(false);
        setUser(res.data.account);
        setNotification(res.data.notification);
        console.log(res);
      }
      if (error) console.log(error);
    };
    handleViewNotification();
  }, []);

  const handleEditNotification = (note_id) => {
    setSelected("EditNotification");
    setNotificationselected(note_id);
  };

  const handleDeleteNotification = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/notification/delete`,
      method: "PUT",
      data: {
        note_id: notification.note_id,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setIsloading(false);
      console.log(res);
      setSelected("Notification");
      setErrors(["Notification deleted successfully!"]);
    }
    if (error) console.log(error);
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex flex-col items-start justify-start p-2 w-full mx-4">
        <button
          id="btn_back_ViewNotification"
          onClick={() => {
            setSelected("Notification");
          }}
          className="absolute top-0 right-0 m-4 px-4 py-2 rounded hover:text-blue-700"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        <div className="mt-16 text-left">
          <h1 className="text-2xl font-bold">Title</h1>
          <p className="py-4">{notification && notification.note_title}</p>

          <h2 className="text-xl font-bold ">Message</h2>
          <p className="py-4">{notification && notification.note_message}</p>
        </div>
        <div className="flex w-full justify-end">
          {user.role != "P" && (
            <button
              id="btn_EditNotification"
              onClick={() => {
                handleEditNotification(notification.note_id);
              }}
              className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 "
            >
              <i className="fa-solid fa-pen mr-2"></i>
              Edit
            </button>
          )}
          <div className="ml-2">
            <button
              className="hover:bg-red-700   bg-red-500 text-white rounded-lg px-4 py-2 mt-4 "
              onClick={() => {
                handleDeleteNotification();
              }}
            >
              <i className="fa-solid fa-trash mr-2"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
