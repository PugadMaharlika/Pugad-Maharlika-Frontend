import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";
import perlas from "../../../src/assets/Perlas.png";
import ginto from "../../../src/assets/Icon_Small_WhiteOutline_Coin.png";

export const ViewOffer = ({ setSelected, offerselected, setOfferselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [offer, setOffers] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isloading, setIsloading] = useState(true);

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
        setIsloading(false);
        setUser(res.data.account);
        setOffers(res.data.offerview);
        console.log(res);
      }
      if (error) {
        console.log(error);
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };
    handleViewOffer();
  }, []);

  const handleEditOffer = (ofr_id) => {
    setSelected("UpdateOffer");
    setOfferselected(ofr_id);
  };
  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg shadow-lg  text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex justify-between w-full px-4">
        <button
          onClick={() => {
            setSelected("Offer");
          }}
          className=" hover:text-blue-700  font-bold py-2 px-4 rounded "
        >
          <i class="fa-solid fa-circle-chevron-left  text-3xl"></i>
        </button>
      </div>
      <div className="flex  text-balance mt-5">
        <img src={offer && offer.ofr_sprite} alt="Offer" className="w-1/2 max-h-96 object-cover" />
        <div className="ml-5">
          <h2 className="text-2xl font-bold">{offer && offer.ofr_name}</h2>
          <p className="text-base flex items-center font-thin font-sans text-xl">
            {/* Image aligned to the left and resized */}
            <img
              src={offer && offer.ofr_type === "P" ? perlas : ginto}
              alt="Type of Currency"
              className="w-5 h-5 mr-2" // w-10 h-10 are Tailwind classes for 40px width and height, mr-2 adds a small margin-right
            />
            {offer && offer.ofr_value}
          </p>
          <p className=" mt-2"> ₱ {offer && offer.ofr_price}</p>
          <p className="mt-2">Description: {offer && offer.ofr_desc}</p>
          <p className="mt-2">Status: {offer && offer.ofr_enabled ? "Released" : "Unreleased"}</p>

          <p className="mt-2">
            Date Created: {offer && new Date(offer.date_created).toLocaleString()}
          </p>
          {/* <p className="mt-2">
            Date Updated:
            {offer && offer.date_updated}
          </p> */}
        </div>
      </div>
      <div className="flex w-full justify-end">
        {user.role != "P" && (
          <button
            id="btn_UpdateOffer"
            onClick={() => {
              handleEditOffer(offer.ofr_id);
            }}
            className="hover:bg-green-700   bg-green-500 text-white rounded-lg px-4 py-2 mt-4 "
          >
            <i class="fa-solid fa-pen mr-2"></i>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
