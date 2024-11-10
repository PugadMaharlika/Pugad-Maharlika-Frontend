import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";
import { OfferItemCard } from "../../components/ui/OfferItemCard ";

export const Offer = ({ setSelected, setOfferselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [offers, setOffers] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const handleOffer = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/offer/displayOffer`,
        method: "GET",
        data: {},
      };

      const { res, error, loading } = await API(config);
      if (res) {
        setIsloading(false);
        setUser(res.data.account);
        setOffers(res.data.offers);
      }
      if (error) {
        console.log(error);
        setErrors([error.response.data.errors.map((error) => error.msg)]);
      }
    };
    handleOffer();
  }, []);
  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs sm:text-sm md:text-md w-full sm:w-full px-4 sm:px-6 md:px-8`}
    >
      <div
        className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        <h1 className="text-2xl font-bold">Offer</h1>
        {user.role !== "P" && (
          <button
            id="btn_ViewOffer"
            onClick={() => {
              setSelected("AddOffer");
            }}
            className="hover:bg-green-700 bg-green-500 text-white rounded-lg px-4 py-2 text-sm md:text-md"
          >
            Add Offer
          </button>
        )}
      </div>

      {/* Responsive ItemCard Section */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start w-full mt-4">
        <div className="flex flex-wrap w-full">
          {offers &&
            offers.map((offer) => (
              <OfferItemCard
                key={offer.ofr_id}
                setSelected={setSelected}
                user={user}
                offer={offer}
                setOfferselected={setOfferselected}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
