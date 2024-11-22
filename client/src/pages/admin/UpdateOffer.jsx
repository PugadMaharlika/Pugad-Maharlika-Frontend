import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";
import UploadImage from "../../service/UploadImage";

export const UpdateOffer = ({ setSelected, offerselected }) => {
  const [image, setImage] = useState(null);
  const [theme] = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDescription] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [displayImg, setdisplayImg] = useState("");
  const [offer, setOffer] = useState(null);
  const [isloading, setIsloading] = useState(true);

  // View the Selected Offer
  useEffect(() => {
    const handleViewOffer = async () => {
      setErrors([]);
      setSuccess(false);

      const config = {
        url: `${serverUrl}/offer/viewOffer?ofr_id=${offerselected}`,
        method: "GET",
        data: {},
      };

      const { res, error, loading } = await API(config);
      if (res) {
        setSuccess(true);
        setIsloading(false);
        setUser(res.data.account);
        setOffer(res.data.offerview);
        setName(res.data.offerview.ofr_name);
        setValue(res.data.offerview.ofr_value);
        setPrice(res.data.offerview.ofr_price);
        setDescription(res.data.offerview.ofr_desc);
        setType(res.data.offerview.ofr_type);
        console.log(res);
      }
      if (error) {
        console.log(error);
        setErrors(["Error fetching data"]);
      }
      console.log("offerselected", offerselected); // in frontend
      console.log("response", res); // in frontend after API call
    };
    handleViewOffer();

    // Optionally return a cleanup function
    return () => {
      setOffer(null); // Example cleanup, adjust as needed
    };
  }, [offerselected]);

  // Unrelease Offer
  const handleUnrelease = async () => {
    setErrors([]);
    setSuccess(false);

    const config = {
      url: `${serverUrl}/offer/unrelease`,
      method: "PUT",
      data: {
        ofr_id: offer.ofr_id,
      },
    };
    console.log("View Offer Enabled: ", offer && offer.ofr_enabled);

    const { res, error, loading } = await API(config);
    if (res) {
      setIsloading(false);
      console.log(res);
      setSelected("Offer");
      setSuccess(true);
      setErrors(["Offer Unreleased successfully!"]);
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  // Release Offer
  const handleRelease = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/offer/release`,
      method: "PUT",
      data: {
        ofr_id: offer.ofr_id,
      },
    };
    console.log("View Offer Enabled: ", offer && offer.ofr_enabled);
    const { res, error, loading } = await API(config);
    if (res) {
      setIsloading(false);
      setSuccess(true);
      console.log(res);
      setSelected("Offer");
      setErrors(["Offer released successfully!"]);
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  // Image Displayer
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setdisplayImg(imageUrl);
    }
  };

  // Update Offer Handler
  const handleUpdateOffer = async (url) => {
    setErrors([]);
    setSuccess(false);

    if (
      name == offer.ofr_name &&
      value == offer.ofr_value &&
      price == offer.ofr_price &&
      desc == offer.ofr_desc &&
      type == offer.ofr_type &&
      !image
    ) {
      setSuccess(true);
      setErrors(["Offer updated"]);
      setSelected("Offer");
      return;
    }

    console.log("DATA: ", name, value, price, desc, type, offerselected);
    const config = {
      url: `${serverUrl}/offer/updateOffer`,
      method: "PUT",
      data: {
        id: offerselected,
        name: name,
        value: value,
        price: price,
        desc: desc,
        type: type,
        url: url ? url : offer.ofr_sprite,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setIsloading(false);
      setUser(res.data.account);
      setErrors(["Offer updated successfully!"]);
      setSuccess(true);
      //setSelected("Offer");
    }

    if (error) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  const handleOfferImg = async () => {
    if (image)
      await UploadImage(image, setSuccess, setErrors, handleUpdateOffer, user);
    else handleUpdateOffer();
  };

  return (
    <>
      <div className="col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Update Offer</h1>
          <button
            id="btn_back"
            onClick={() => {
              setSelected("Offer");
            }}
            className=" hover:text-blue-700 font-bold px-4 rounded"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>
        </div>

        <div
          className={`col-span-8 flex flex-col md:flex-row  items-center w-full p-4 md:p-8 text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
            theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
          }`}
        >
          <div className="flex flex-col items-center mb-5 w-1/3">
            <div className="relative">
              <img
                src={
                  displayImg ||
                  (offer && offer.ofr_sprite) ||
                  "https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10639.jpg?w=740"
                }
                alt="Uploaded"
                className="mt-4 w-40 h-40 object-cover rounded-lg"
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
            <p className="mt-2 text-gray-600">Click to upload a new image</p>
          </div>

          <div className="w-2/3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Value"
              step="1"
              max="9999999"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Price"
              step="1"
              max="9999999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            >
              <option value="G">Ginto</option>
              <option value="P">Perlas</option>
            </select>
            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 border border-gray-300 focus:border-green-500"
            ></textarea>

            <div className="flex w-full justify-end">
              <button
                onClick={() => {
                  handleOfferImg();
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Update
              </button>

              <div className="ml-2">
                <button
                  onClick={() => {
                    {
                      offer && offer.ofr_enabled
                        ? handleUnrelease()
                        : handleRelease();
                    }
                  }}
                  className="hover:bg-red-700   bg-red-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 "
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  {offer && offer.ofr_enabled ? "Unreleased" : "Released"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
