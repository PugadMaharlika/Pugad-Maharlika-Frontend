import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/Theme";
import { AlertsContext } from "../../context/Alerts";
import { SuccessContext } from "../../context/Success";
import { UserContext } from "../../context/User";
import UploadImage from "../../service/UploadImage";
import API from "../../service/API";

export const AddOffer = ({ setSelected }) => {
  const [image, setImage] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("G");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [displayImg, setdisplayImg] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setdisplayImg(imageUrl);
    }
  };

  const handleCreateOffer = async (url) => {
    console.log(url);
    setErrors([]);
    setSuccess(false);

    if (!name || !value || !price || !description) {
      setErrors(["All fields are required..."]);
      return;
    }

    const config = {
      url: `${serverUrl}/offer/addOffer`,
      method: "POST",
      data: {
        url,
        name,
        value,
        price,
        description,
        type,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setSuccess(true);
      setUser(res.data.account);
      setErrors(["Offer added successfully!"]);
      setSelected("Offer");
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  const handleOfferImg = async () => {
    await UploadImage(image, setSuccess, setErrors, handleCreateOffer, user);
  };

  return (
    <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-full px-4 md:px-8 h-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-xl md:text-3xl font-bold">Add Offer</h1>
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Offer");
          }}
          className="hover:text-blue-700 font-bold px-4 rounded"
        >
          <i className="fa-solid fa-circle-chevron-left text-2xl md:text-3xl"></i>
        </button>
      </div>
      <div
        className={`col-span-8 flex flex-col md:flex-row  items-center w-full p-4 md:p-8 text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        {/* Image uploading */}
        <div className="flex flex-col items-center mb-5 md:mb-0 w-full md:w-1/3">
          <div className="relative">
            <img
              src={
                displayImg ||
                "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10639.jpg?w=740"
              }
              alt="Uploaded"
              className="mt-4 w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
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
          <p className="mt-2 text-gray-600 text-sm md:text-base">Click to upload a new image</p>
        </div>

        {/* Input fields */}
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
          />
          <input
            type="number"
            step="1"
            max="9999999"
            placeholder="Value"
            value={value}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 0) {
                setSuccess(true);
                setErrors(["Min of 100"]);
              } else {
                setValue(e.target.value);
              }
            }}
            className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
          />
          <input
            type="number"
            step="1"
            max="9999999"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 0) {
                setSuccess(true);
                setErrors(["Min of 100"]);
              } else {
                setPrice(e.target.value);
              }
            }}
            className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
          >
            <option default value="G">
              Gold
            </option>
            <option value="P">Perlas</option>
          </select>

          <textarea
            placeholder="Details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
          ></textarea>

          <div className="flex w-full justify-end">
            <button
              onClick={() => {
                handleOfferImg();
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 md:px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
