import React from "react";
import { ThemeContext } from "../../context/Theme";
import logo from "../../../src/assets/logo1.png";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const ItemCard = ({ setSelected, name, details, image }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useContext(AlertsContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [user] = useContext(UserContext);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  // Fetch items from the database when component mounts
  useEffect((id) => {
    setLoading(true);
    axios
      .get(`${serverUrl}/admin/item/${id}`, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then((response) => {
        setItems(response.data.items);
        setItems(response.data); // Assume response contains the list of items
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrors(["Failed to fetch items."]);
        setLoading(false);
      });
  }, [authToken, refreshToken, serverUrl, setErrors]);

  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 min-w-55 ${
        theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
      }`}
    >
      <div className="absolute top-2 right-2">
        <button
          id="btn_update"
          onClick={() => {
            setSelected("UpdateItem");
          }}
        >
          <i className="fas fa-edit"></i>
        </button>
      </div>

      <img className="w-full h-auto" src={logo} alt="card" />
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">Skin Name</h1>
        <p className="text-base">Skin Details</p>
        <div className="mt-4 flex flex-col sm:flex-row">
          {user.role === "P" ? (
            <button className="bg-green-500 px-4 py-2 rounded mr-2 mb-2 sm:mb-0 text-white">
              Buy
            </button>
          ) : (
            <button
              id="btn_item_details"
              onClick={() => {
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
