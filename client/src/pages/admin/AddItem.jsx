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
      setErrors(["Image uploaded successfully"]);
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
        <div className="flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold">
          <h1 className="text-2xl font-bold">Items</h1>
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
              {image && (
                <img src={displayItem} alt="Uploaded" className="mt-4" />
              )}
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
                value={value}
                className="w-full border border-gray-300 p-2 rounded-lg mb-4"
              >
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
