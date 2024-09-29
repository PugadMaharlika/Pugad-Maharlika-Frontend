import React, { useContext } from "react";
import Theme, { ThemeContext } from "../../context/Theme";
import logo from "../../../src/assets/logo1.png";

export const ViewOffer = ({ setSelected, user }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex justify-between w-full px-4">
        <button
          onClick={() => {
            setSelected("Offer");
          }}
          className=" hover:text-blue-700  font-bold py-2 px-4 rounded "
        >
          <i class="fa-solid fa-circle-chevron-left  text-3xl"></i>
        </button>
      </div>
      <div className="flex  text-balance mt-5">
        <img src={logo} alt="Item" className="w-1/2" />
        <div className="ml-5">
          <h2 className="text-2xl font-bold">Item Title</h2>
          <p className=" text-xs mt-2">Value: 3000</p>
          <p className=" mt-2">Price: 2000</p>
          <p className="mt-2">
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
          <p className=" mt-2">Status: Released</p>
          <p className="mt-2">Date Created: 01/01/2024</p>
          <p className="mt-2">Date Updated: 01/02/2024</p>
        </div>
      </div>
      <div className="flex w-full justify-end">
        {user.role != "P" && (
          <button
            id="btn_UpdateOffer"
            onClick={() => {
              setSelected("UpdateOffer");
            }}
            className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 "
          >
            <i class="fa-solid fa-pen mr-2"></i>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
