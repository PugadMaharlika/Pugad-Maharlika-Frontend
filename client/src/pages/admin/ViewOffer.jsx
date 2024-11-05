import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";
import perlas from "../../../src/assets/Perlas.png";

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
      if (error) console.log(error);
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
        <img
          src={offer && offer.ofr_sprite}
          alt="Offer"
          className="w-1/2 max-h-96 object-cover"
        />
        <div className="ml-5">
          <h2 className="text-2xl font-bold">{offer && offer.ofr_name}</h2>
          <p className=" text-xs mt-2">
            {" "}
            <img src={perlas} alt="Perlas" className="w-5 h-5 mr-2" />
            {offer && offer.ofr_value}
          </p>
          <p className=" mt-2"> ₱ {offer && offer.ofr_price}</p>
          <p className="mt-2">Description: {offer && offer.ofr_desc}</p>
          <p className="mt-2">
            Status: {offer && offer.ofr_enabled ? "Released" : "Unreleased"}
          </p>

          <p className="mt-2">
            Date Created: {offer && offer.offer_date_created}
          </p>
          <p className="mt-2">
            Date Updated:
            {offer && offer.offer_date_updated}
          </p>
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
