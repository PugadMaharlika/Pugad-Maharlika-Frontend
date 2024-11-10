import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/User";
import perlas from "../../../src/assets/Perlas.png";

export const OfferItemCard = ({ setSelected, offer, setOfferselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);

  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 w-60 h-auto ${
        theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
      }`}
    >
      <div className="absolute top-2 right-2">
        {user.role != "P" && (
          <button
            id="btn_update"
            onClick={() => {
              setOfferselected(offer.ofr_id);
              setSelected("UpdateOffer");
            }}
            className=" hover:text-yellow-500 font-bold px-1 rounded"
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
      </div>

      <img
        className="w-full h-52 object-cover"
        src={offer && offer.ofr_sprite}
        alt="card"
      />
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">{offer.ofr_name}</h1>
        <p className="text-base flex items-center font-medium font-sans text-xl">
          {/* Image aligned to the left and resized */}
          <img
            src={perlas}
            alt="Perlas"
            className="w-5 h-5 mr-2" // w-10 h-10 are Tailwind classes for 40px width and height, mr-2 adds a small margin-right
          />
          {offer.ofr_value}
        </p>
        <p className="text-base text-lg">{offer.ofr_desc}</p>

        <p className="text-base pt-3 font-light">₱ {offer.ofr_price}</p>

        <div className="mt-4 flex flex-col sm:flex-row justify-end">
          {user.role === "P" ? (
            <button className="bg-green-500 px-4 py-2 rounded mr-2 mb-2 sm:mb-0 text-white">
              Buy
            </button>
          ) : (
            <button
              id="btn_offer_details"
              onClick={() => {
                setOfferselected(offer.ofr_id);
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
