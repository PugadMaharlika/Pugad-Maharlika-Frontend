import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

const NotificationTable = ({
  setSelected,
  notifications,
  setNotificationselected,
}) => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleviewnotification = (note_id) => {
    setSelected("ViewNotification");
    setNotificationselected(note_id);
  };

  return (
    <div className="p-6 w-full">
      {" "}
      <div className="flex justify-center ">
        <div className="w-full max-h-80 overflow-y-auto">
          <table className="table-auto w-full mt-8 text-center  ">
            <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {notifications &&
                notifications.map((notification) => (
                  <tr key={notification.ntf_id}>
                    <td className="px-4 py-2 justify-center">
                      <button
                        id="btn_Notification_action"
                        onClick={() => {
                          handleviewnotification(notification.note_id);
                        }}
                        className="hover:text-blue-700  font-bold py-2 px-4 rounded"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </td>
                    <td className="px-4 py-2">{notification.note_title}</td>
                    <td className="px-4 py-2">
                      {notification.note_type == "G" ? "Global" : "Player"}
                    </td>
                    <td className="px-4 py-2">
                      {notification.note_date_created}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default NotificationTable;
