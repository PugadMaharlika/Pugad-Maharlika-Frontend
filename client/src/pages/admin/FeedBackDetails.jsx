import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";

export const FeedBackDetails = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 flex-grow h-full">
      <div
        className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        <h1 className="text-3xl font-bold">Details</h1>
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Reports");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-md text-lg mt-5">
        <label className="font-bold">Title:</label>
        <span className="text-left ml-16">Title Value</span>

        <label className="font-bold">Username:</label>
        <span className="text-lef ml-10">Username Value</span>

        <label className="font-bold">Type:</label>
        <span className="text-left ml-16">Type Value</span>

        <label className="font-bold">Date Created:</label>
        <span className="text-left ml-16">Date Value</span>

        <label className="font-bold">Description:</label>
        <span className="text-left ml-16">Description Value</span>
      </div>
    </div>
  );
};

export default FeedBackDetails;
