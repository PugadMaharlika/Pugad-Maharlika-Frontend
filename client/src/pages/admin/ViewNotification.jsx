import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

{
  /*Get Props*/
}
export const ViewNotification = ({ setSelected, user }) => {
  const [theme, setTheme] = useContext(ThemeContext);

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
          className="absolute top-0 right-0 m-4 px-4 py-2 rounded-lg"
        >
          <i class="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>

        <div className="mt-16 text-left">
          <h1 className="text-2xl font-bold">Title</h1>
          <p className="py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <h2 className="text-xl font-bold ">Message</h2>
          <p className="py-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>
        <div className="flex w-full justify-end">
          {user.role != "P" && (
            <button
              id="btn_EditNotification"
              onClick={() => {
                setSelected("EditNotification");
              }}
              className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 "
            >
              <i class="fa-solid fa-pen mr-2"></i>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
