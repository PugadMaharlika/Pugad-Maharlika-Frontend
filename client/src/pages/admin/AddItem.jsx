import React from "react";
import ItemCard from "../../components/ui/ItemCard";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState } from "react";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import UploadImage from "../../service/UploadImage";
import axios from "axios";
import API from "../../service/API";

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

  const handleInsertItem = async (url) => {
    const config = {
      url: `${serverUrl}/item/add`,
      method: "POST",
      data: {
        url: url,
        name: name,
        value: value,
        itemType: itemType,
        details: details,
        itemholder: itemholder,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setUser(res.data.account);
      setSuccess(true);
      setErrors(["Item uploaded successfully"]);
      setSelected("Items");
    }
    if (error) console.log(error);
  };

  const handleItem = async () => {
    console.log(image);
    await UploadImage(image, setSuccess, setErrors, handleInsertItem, user);
  };

  return (
    <>
      <div className="flex flex-col col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full gap-5">
        <div
          className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold bg-${Theme}`}
        >
          <h1 className="text-2xl font-bold">Add Item</h1>
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

          {/* Form fields */}
          <div className="flex flex-col w-full md:w-2/3 space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-5/6 border border-gray-300 p-3 rounded-lg mx-auto"
            />
            <input
              type="number"
              step="0.01"
              max="99999999999"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-5/6 border border-gray-300 p-3 rounded-lg mx-auto"
            />
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-5/6 border border-gray-300 p-3 rounded-lg mx-auto"
            >
              <option value="" disabled>
                Item Type
              </option>
              <option value="S">Skin</option>
            </select>
            <select
              value={itemholder}
              onChange={(e) => setItemHolder(e.target.value)}
              className="w-5/6 border border-gray-300 p-3 rounded-lg mx-auto"
            >
              <option value="" disabled>
                Item Holder
              </option>
              <option value="diego silang">Diego Silang</option>
              <option value="gabriela silang">Gabriela Silang</option>
            </select>
            <textarea
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-5/6 border border-gray-300 p-3 rounded-lg mx-auto"
            ></textarea>
            <div className="flex justify-end w-5/6 mx-auto">
              <button
                className="bg-green-500 px-6 py-2 text-white rounded-lg"
                onClick={handleItem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
