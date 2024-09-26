import NotificationTable from "../../components/ui/NotificationTable";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

{
  /*Get Props*/
}
export const Notification = ({ setSelected, user }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full `}
    >
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
      <NotificationTable setSelected={setSelected} />
    </div>
  );
};
