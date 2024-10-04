import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import axios from "axios";

export const AddItem = ({ setSelected }) => {
  const [image, setImage] = useState(null);
  const [Theme] = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [itemType, setItemType] = useState("S");
  const [itemholder, setItemHolder] = useState("diego silang");
  const [theme] = useContext(ThemeContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const [displayItem, setdisplayItem] = useState("");

  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setdisplayItem(imageUrl);
    }
  };

  const handleItem = () => {
    setErrors([]);
    setSuccess(false);
    if (image == "") {
      setSuccess(false);
      setErrors(["No file selected. Please select an image file"]);
      return;
    }

    // Check file type (case-insensitive)
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(image.type.toLowerCase())) {
      setSuccess(false);
      setErrors(["Invalid file type. Only PNG, JPG, and JPEG are allowed"]);
      return;
    }

    // Check file size (less than or equal to 5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (image.size > maxSize) {
      setSuccess(false);
      setErrors(["File size exceeds 5 MB. Please choose a smaller file."]);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("value", value);
    formData.append("itemType", itemType);
    formData.append("details", details);
    formData.append("itemholder", itemholder);

    axios
      .post(`${serverUrl}/item/add`, formData, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      })
      .then((response) => {
        setSuccess(true);
        setErrors(["Success! item has been added"]);
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
          <h1 className="text-3xl font-bold">Add Item</h1>
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
              {image && <img src={displayItem} alt="Uploaded" className="mt-4" />}
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
              <select value={value} className="w-full border border-gray-300 p-2 rounded-lg mb-4">
                <option value="" disabled selected>
                  Item Type
                </option>
                <option value="S">Skin</option>
              </select>
              <select
                value={value}
                onChange={(e) => setItemHolder(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              >
                <option value="" disabled selected>
                  Item Holder
                </option>
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
                  onClick={() => {
                    handleItem();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
