import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/User";

const ItemCard = ({ setSelected, item, setSelectedItem }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 w-60 h-80 ${
        theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
      }`}
    >
      <div className="absolute top-2 right-2">
        <button
          id="btn_update"
          onClick={() => {
            setSelectedItem(item.item_id);
            setSelected("UpdateItem");
          }}
        >
          <i className="fas fa-edit"></i>
        </button>
      </div>

      <img
        className="w-full h-52 object-cover"
        src={item && item.item_sprite}
        alt="card"
      />
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">{item.name}</h1>
        <p className="text-base">{item.item_desc}</p>
        <div className="mt-4 flex flex-col sm:flex-row">
          {user.role === "P" ? (
            <button className="bg-green-500 px-4 py-2 rounded mr-2 mb-2 sm:mb-0 text-white">
              Buy
            </button>
          ) : (
            <button
              id="btn_item_details"
              onClick={() => {
                setSelectedItem(item.item_id);
                setSelected("ItemDetails");
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

export default ItemCard;
