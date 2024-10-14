import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import axios from "axios";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";

export const Item = ({ setSelected, setSelectedItem }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [items, setItems] = useState(null);
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
          .get(
            `${serverUrl}/item/view`,

            {
              headers: {
                "x-auth-token": authToken,
                "x-refresh-token": refreshToken,
              },
            },
            {}
          )
          .then((response) => {
            console.log(response);
            setItems(response.data.items);
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
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md px-8 flex-grow h-full">
      <div
        className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        <h1 className="text-2xl font-bold">Items</h1>
        <button
          id="btn_add_item"
          onClick={() => {
            setSelected("AddItem");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <div className="flex flex-wrap place gap-1">
        {items &&
          items.map((item) => (
            <ItemCard
              key={item.item_id} // Assuming each item has a unique `id`
              setSelected={setSelected}
              user={user}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        <div className="flex flex-wrap overflow-y-auto h-auto">
          <div className="flex flex-wrap w-full"></div>
        </div>
      </div>
    </div>
  );
};
