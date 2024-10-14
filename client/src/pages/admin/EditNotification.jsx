import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";

export const EditNotification = ({
  setSelected,
  notificationselected,
  setNotificationselected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [notification, setNotification] = useState(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [title, setTitle] = useState("");
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
        const notif = res.data.notification;
        setTitle(notif.note_title);
        setMessage(notif.note_message);
      }
      if (error) console.log(error);
    };
    handleViewNotification();
  }, []);

  const handleUpdateNotification = async () => {
    setErrors([]);
    setSuccess(false);
    setSelected("Notification");
    if (!message || !title) {
      setSuccess(false);
      setErrors(["Fill up all the fields!"]);
    }

    const config = {
      url: `${serverUrl}/notification/notification-edit`,
      method: "POST",
      data: {
        note_id: notification.note_id,
        title: title,
        message: message,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setIsloading(false);
      setUser(res.data.account);
      setNotification(res.data.notification);
      setErrors(["Notification updated successfully!"]);
      setSuccess(true);
    }

    if (error) console.log(error);
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Update Notification</h1>
        <button
          id="btn_back_EditNotification"
          onClick={() => {
            setSelected("Notification");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className="flex flex-col  mt-8">
        <h1 className="text-2xl font-bold">Title</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-2"
          placeholder="Title"
        />

        <h1 className="text-2xl font-bold mt-4">Message</h1>
        <textarea
          className="w-full h-24 border border-gray-300 rounded-lg px-2 py-1 mt-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message" // Display notification message initially
        ></textarea>

        <div className="flex justify-end">
          <button
            id="btn_UpdateNotification"
            onClick={handleUpdateNotification}
            className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 max-w-40"
          >
            Update Notification
          </button>
        </div>
      </div>
    </div>
  );
};
