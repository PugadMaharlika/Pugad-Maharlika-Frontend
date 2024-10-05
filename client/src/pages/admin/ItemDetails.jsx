import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";

export const ItemDetails = ({ setSelected, id, selectedItem }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [items, setItems] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setErrors([]);
        setSuccess(false);

        const response = await axios.get(
          `${serverUrl}/item/itemdetails`,
          {
            headers: {
              "x-auth-token": authToken,
              "x-refresh-token": refreshToken,
            },
          },
          { id: selectedItem }
        );
        setItems(response.data.items);
        setUser(response.data.account);
        setSuccess(true); // Set success only if the request succeeds
      } catch (error) {
        console.error(error);
        setSuccess(false);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors.map((err) => err.msg));
        } else {
          setErrors(["An unexpected error occurred."]); // Generic fallback
        }
      }
    };

    fetchItems();

    // Optionally return a cleanup function
    return () => {
      setItems([]); // Example cleanup, adjust as needed
    };
  }, []); // Dependencies to rerun effect only when these values change

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 sm:w-full h-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Item Details</h1>
        <button
          id="btn_back_item_details"
          onClick={() => {
            setSelected("Item");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-contain m-2"
              src={items}
              alt="Product"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {items.name}
            </div>
            <p className="mt-2 text-gray-600">Product Description</p>
            <p className="mt-2 text-gray-600">{selectedItem.details}</p>
            <div className="mt-4">
              <span className="text-gray-600">Price: 250</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Status: Released</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Date Created: 2022-01-01</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Date Updated: 2022-01-15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
