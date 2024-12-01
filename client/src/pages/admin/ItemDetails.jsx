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

        await axios
          .get(`${serverUrl}/item/itemdetails?id=${selectedItem}`, {
            headers: {
              "x-auth-token": authToken,
              "x-refresh-token": refreshToken,
            },
          })
          .then((response) => {
            console.log(response);
            setItems(response.data.item);
            setUser(response.data.account);
            setSuccess(true); // Set success only if the request succeeds
          });
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
    <div className="flex flex-col col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 sm:w-full h-full gap-5">
      <div
        className={`flex w-full rounded-xl h-16 shadow-md p-4 pl-4 justify-between py-4 font-bold bg-${theme}`}
      >
        <h1 className="text-3xl font-bold">Item Details</h1>
        <button
          id="btn_back_item_details"
          onClick={() => {
            setSelected("Items");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className={`mx-auto rounded-xl shadow-md overflow-hidden w-full bg-${theme}`}>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-contain m-2"
              src={items && items.item_sprite}
              alt="Product"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {items && items.item_name}
            </div>
            <p className="mt-2 text-gray-600">Product Description: {items && items.item_desc}</p>
            <div className="mt-4">
              <span className="text-gray-600">Price: {items && items.item_value}</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">
                Status: {items && items.item_enabled ? "Released" : "Unreleased"}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">
                Date Created: {items && new Date(items.date_created).toLocaleString()}
              </span>
            </div>
            {/* <div className="mt-4">
              <span className="text-gray-600">
                Date Updated: {items && items.date_updated}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
