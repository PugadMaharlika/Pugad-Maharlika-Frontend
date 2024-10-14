import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { OfferItemCard } from "../../components/ui/OfferItemCard ";

export const Offer = ({ setSelected, user }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  var offer_data = {
    name: "House of Pearls",
    value: "3000",
    description: "Get 675 Bonus Pearls",
    price: "2,000",
  };
  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs sm:text-sm md:text-md w-full sm:w-full px-4 sm:px-6 md:px-8`}
    >
      <div className="flex justify-end w-full mt-2 sm:mt-4">
        {user.role !== "P" && (
          <button
            id="btn_ViewOffer"
            onClick={() => {
              setSelected("AddOffer");
            }}
            className="hover:bg-green-700 bg-green-500 text-white rounded-lg px-4 py-2 text-sm md:text-md"
          >
            <i className="fa-solid fa-pen mr-2"></i>
            Add New Offer
          </button>
        )}
      </div>

      {/* Responsive ItemCard Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start w-full mt-4">
        <div className="flex flex-wrap w-full">
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
          <OfferItemCard
            setSelected={setSelected}
            user={user}
            offer_data={offer_data}
          />
        </div>
      </div>
    </div>
  );
};
