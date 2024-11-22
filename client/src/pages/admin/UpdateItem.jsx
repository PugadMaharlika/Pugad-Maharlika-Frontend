import React, { useContext, useState, useEffect } from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import axios from "axios";
import UploadImage from "../../service/UploadImage";
import API from "../../service/API";

export const UpdateItem = ({ setSelected, selectedItem }) => {
  const [image, setImage] = useState(null);
  const [displayItem, setDisplayItem] = useState(null); // Update to store the image URL for display
  const [Theme] = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [itemType, setItemType] = useState("S");
  const [itemholder, setItemHolder] = useState("diego silang");
  const [reeleaseItem, setReleaseItem] = useState(false);
  const [theme] = useContext(ThemeContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const [itemId, setItemId] = useState("");
  const [items, setItems] = useState("");
  const [status, setStatus] = useState(false);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDisplayItem(imageUrl); // Update displayItem with new image URL
      setImage(file); // Set image state with selected file
    }
  };

  const handleUpdateItem = async (url) => {
    if (
      name === items.item_name &&
      value === items.item_value &&
      details === items.item_desc &&
      itemType === items.item_type &&
      itemholder === items.item_holder &&
      !image
    ) {
      setSuccess(true);
      setErrors(["Item updated successfully"]);
      return;
    }

    const config = {
      url: `${serverUrl}/item/update`,
      method: "PUT",
      data: {
        id: selectedItem,
        name: name,
        value: value,
        itemType: itemType,
        details: details,
        itemholder: itemholder,
        url: url ? url : items.item_sprite,
        reeleaseItem: reeleaseItem,
      },
    };

    const { res, error } = await API(config);
    if (res) {
      console.log(res);
      setUser(res.data.account);

      setSuccess(true);
      setErrors(["Item updated successfully"]);
    }
    if (error) console.log(error);
  };

  const handleReleaseItem = async (url) => {
    const config = {
      url: `${serverUrl}/item/release`,
      method: "PUT",
      data: {
        id: selectedItem,
        reeleaseItem: reeleaseItem,
      },
    };

    const { res, error } = await API(config);
    if (res) {
      console.log(res);
      setUser(res.data.account);
    }
    if (error) console.log(error);
  };

  const handleItem = async () => {
    if (image) {
      await UploadImage(image, setSuccess, setErrors, handleUpdateItem, user);
    } else {
      handleUpdateItem();
    }
  };

  useEffect(() => {
    handleReleaseItem();
  }, [reeleaseItem]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setErrors([]);
        setSuccess(false);

        const response = await axios.get(
          `${serverUrl}/item/itemdetails?id=${selectedItem}`,
          {
            headers: {
              "x-auth-token": authToken,
              "x-refresh-token": refreshToken,
            },
          }
        );

        setItems(response.data.item);
        setUser(response.data.account);
        setSuccess(true);
        setName(response.data.item.item_name);
        setValue(response.data.item.item_value);
        setItemType(response.data.item.item_type);
        setDetails(response.data.item.item_desc);
        setItemHolder(response.data.item.item_holder);
        setDisplayItem(response.data.item.item_sprite); // Set initial displayItem state with fetched image
        setReleaseItem(response.data.item.item_enabled);
      } catch (error) {
        console.error(error);
        setSuccess(false);
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors.map((err) => err.msg));
        } else {
          setErrors(["An unexpected error occurred."]);
        }
      }
    };

    fetchItems();

    return () => {
      setItems([]); // Cleanup
    };
  }, []);

  const handleToggleStatus = () => {
    setReleaseItem((prevStatus) => !prevStatus);
  };

  return (
    <>
      <div className="flex flex-col col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full gap-5">
        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <h1 className="text-3xl font-bold">Update Item</h1>
          <button
            id="btn_back"
            onClick={() => setSelected("Items")}
            className="rounded-lg px-4"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>
        </div>

        <div
      className={`col-span-8 flex flex-col md:flex-row  items-center w-full p-4 md:p-8 text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
          {/* Image uploading */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="relative">
              <img
                src={
                  displayItem ||
                  "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10639.jpg?w=740"
                }
                alt="Uploaded"
                className="mt-4 w-32 h-32 md:w-36 md:h-36 object-cover rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  handleImageUpload(e);
                }}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="mt-2 text-gray-600 text-sm text-center">
              Click to upload a new image
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              />
              <input
                type="number"
                step="0.01"
                max="99999999999"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              />
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              >
                <option value="S">Skin</option>
              </select>
              <select
                value={itemholder}
                onChange={(e) => setItemHolder(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              >
                <option value="diego silang">Diego Silang</option>
                <option value="gabriela silang">Gabriela Silang</option>
              </select>
              <textarea
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              ></textarea>
              <div className="flex w-full justify-end gap-5">
                <button
                  onClick={() => {
                    handleToggleStatus();
                  }}
                  className={`py-2 px-4 rounded text-white ${
                    reeleaseItem
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                >
                  {reeleaseItem ? "Deactivate" : "Activate"}
                </button>

                <button
                  className="bg-green-500 px-6 py-2 text-white rounded-lg"
                  onClick={handleItem}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateItem;
