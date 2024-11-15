import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/User";
import axios from "axios";
import API from "../../service/API";

const ItemCard = ({ setSelected, item, setSelectedItem }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 w-60 h-80 bg-${theme}`}
    >
      <div className="absolute top-2 right-2">
        {user.role == "P" ? (
          <button
            style={{ display: "none" }}
            id="btn_update"
            onClick={() => {
              setSelectedItem(item.item_id);
              setSelected("UpdateItem");
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        ) : (
          <button
            id="btn_update"
            onClick={() => {
              setSelectedItem(item.item_id);
              setSelected("UpdateItem");
            }}
            className=" hover:text-yellow-500 font-bold px-1 rounded"
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
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
