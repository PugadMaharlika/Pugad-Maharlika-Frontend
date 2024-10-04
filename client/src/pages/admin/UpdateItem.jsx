import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import axios from "axios";

export const UpdateItem = ({ setSelected, item_id }) => {
  const [image, setImage] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [displayItem, setdisplayItem] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [itemType, setItemType] = useState("S");
  const [itemholder, setItemHolder] = useState("diego silang");

  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${serverUrl}/item/${item_id}`, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then((response) => {
        const item = response.data;
        setName(item.name);
        setValue(item.value);
        setDetails(item.details);
        setItemType(item.itemType);
        setItemHolder(item.itemholder);
        setdisplayItem(item.image); // Assuming image is returned as a URL
      })
      .catch((error) => {
        setErrors(["Error fetching item data"]);
        console.error(error);
      });
  }, [item_id, authToken, refreshToken, serverUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setdisplayItem(imageUrl);
      setImage(file);
    }
  };

  const handleItemUpdate = () => {
    setErrors([]);
    setSuccess(false);

    if (image && !["image/png", "image/jpeg", "image/jpg"].includes(image.type.toLowerCase())) {
      setErrors(["Invalid file type. Only PNG, JPG, and JPEG are allowed"]);
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (image && image.size > maxSize) {
      setErrors(["File size exceeds 5 MB. Please choose a smaller file."]);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("value", value);
    formData.append("itemType", itemType);
    formData.append("details", details);
    formData.append("itemholder", itemholder);

    if (image) {
      formData.append("image", image); // Only append image if a new one is selected
    }

    axios
      .put(`${serverUrl}/item/update/${item_id}`, formData, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess(true);
        setErrors(["Success! Item has been updated"]);
        setUser(response.data.account);
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
      });
  };

  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Update Item</h1>
          <button
            id="btn_back"
            onClick={() => {
              setSelected("Items");
            }}
            className="rounded-lg px-4"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>
        </div>

        <div className="flex bg-white items-center justify-center w-full p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-5">
            <div className="flex-1">
              {displayItem && <img src={displayItem} alt="Uploaded" className="mt-4" />}
            </div>
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
              <div className="mb-5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    handleImageUpload(e);
                  }}
                />
              </div>
              <div className="flex w-full justify-end">
                <button
                  className="bg-green-500 px-6 py-2 text-white rounded-lg"
                  onClick={handleItemUpdate}
                >
                  Update
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
