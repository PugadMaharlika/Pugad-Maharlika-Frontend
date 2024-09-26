import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";

{
  /*Get Props*/
}
export const EditNotification = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
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
          <i class="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className="flex flex-col  mt-8">
        <h1 className="text-2xl font-bold">Title</h1>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-2"
          placeholder="Enter title..."
        />

        <h1 className="text-2xl font-bold mt-4">Message</h1>
        <textarea
          className="w-full h-24 border border-gray-300 rounded-lg px-2 py-1 mt-2"
          placeholder="Enter message..."
        ></textarea>
        <div className="flex justify-end">
          <button
            id="btn_UpdateNotification"
            onClick={() => {
              setSelected("Notification");
            }}
            className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 max-w-40"
          >
            Update Notification
          </button>
        </div>
      </div>
    </div>
  );
};
