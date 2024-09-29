import React from "react";
import { ThemeContext } from "../../context/Theme";
import logo from "../../../src/assets/logo1.png";
import { useContext, useState } from "react";
import { ViewOffer } from "../../pages/admin/ViewOffer";

export const OfferItemCard = ({ setSelected, user, offer_data }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 min-w-55 ${
        theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
      }`}
    >
      <div className="absolute top-2 right-2">
        {user.role != "P" && (
          <button
            id="btn_update"
            onClick={() => {
              setSelected("UpdateOffer");
            }}
            className=" hover:text-yellow-500 font-bold px-4 rounded"
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
      </div>

      <img className="w-full h-auto" src={logo} alt="card" />
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">{offer_data.name}</h1>
        <p className="text-base">{offer_data.description}</p>
        <div className="mt-4 flex flex-col sm:flex-row">
          {user.role === "P" ? (
            <button className="bg-green-500 px-4 py-2 rounded mr-2 mb-2 sm:mb-0 text-white">
              Buy
            </button>
          ) : (
            <button
              id="btn_item_details"
              onClick={() => {
                setSelected("ViewOffer");
              }}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              See Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
