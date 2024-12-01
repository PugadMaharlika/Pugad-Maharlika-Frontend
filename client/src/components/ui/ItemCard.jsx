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
      className={`relative max-w-xs shadow-lg rounded-lg overflow-hidden m-4 w-60 h-auto bg-${theme} ${
        item.item_enabled ? "border-green-500" : "border-red-500"
      } border-2`}
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
          <div className="tooltip text-white tooltip-bottom" data-tip="Edit">
            <button
              id="btn_update"
              onClick={() => {
                setSelectedItem(item.item_id);
                setSelected("UpdateItem");
              }}
              className={`btn btn-square opacity-60 hover:opacity-100 font-bold px-1 rounded`}
            >
              <i className="fa-solid fa-file-pen"></i>
            </button>
          </div>
        )}
      </div>

      <img
        className="w-full h-52 object-cover"
        src={item && item.item_sprite}
        alt="card"
      />
      <div className="p-4">
        <h1 className={"font-bold text-xl mb-2"}>{item.item_name}</h1>
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
