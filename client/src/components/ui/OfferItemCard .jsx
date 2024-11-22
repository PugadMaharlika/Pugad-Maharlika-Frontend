import React from "react";
import { ThemeContext } from "../../context/Theme";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/User";
import perlas from "../../../src/assets/Perlas.png";
import ginto from "../../../src/assets/Icon_Small_WhiteOutline_Coin.png";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import ConfirmationDialog from "../ConfirmationDialog";
import axios from "axios";
import LoadingSpinner from "../LoadingScreen";
import API from "../../service/API";

export const OfferItemCard = ({ setSelected, offer, setOfferselected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [currentOffer, setCurrentOffer] = useState("");
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef(isProcessing);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    isProcessingRef.current = isProcessing;
  }, [isProcessing]); // Update ref whenever isProcessing changes

  const handlePurchaseOffer = async (offer) => {
    setErrors([]);
    setSuccess(false);
    console.log("Offer: ", offer);

    document.getElementById("loading_diaglog").show();
    const options = {
      method: "POST",
      url: "https://api.paymongo.com/v1/links",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Basic c2tfdGVzdF9KZUVTdjJFemR3SEtOajhZdUxZRkdMUjc6",
      },
      data: {
        data: {
          attributes: {
            amount: parseInt(offer.ofr_price * 100),
            description: offer.ofr_name,
            remarks: "This is for Buying",
          },
        },
      },
    };

    axios
      .request(options)
      .then((res) => {
        const data = res.data.data;
        handlePaymentChecker(data.id);
        window.open(data.attributes.checkout_url, "_blank");
      })
      .catch((err) => console.error(err));
  };

  const handlePaymentChecker = async (id) => {
    setErrors([]);
    setSuccess(false);
    const options = {
      method: "GET",
      url: ` https://api.paymongo.com/v1/links/${id}`, // Replace with the actual link ID
      headers: {
        accept: "application/json",
        authorization: "Basic c2tfdGVzdF9KZUVTdjJFemR3SEtOajhZdUxZRkdMUjc6", // Replace with your actual API key
      },
    };

    // Set an interval to check the payment status every 5 seconds
    const intervalId = setInterval(() => {
      axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          //If Cancel Button is pressed
          if (isProcessingRef.current) {
            clearInterval(intervalId); // Stop the interval if isProcessing is true
            setErrors(["Payment Failed"]);
            return;
          }
          // Example condition: Stop polling if payment is completed or canceled
          if (res.data.data.attributes.status === "unpaid") {
            console.log(`Payment status: ${res.data.data.attributes.status}`);
          }
          // paid
          if (res.data.data.attributes.status === "paid") {
            console.log("Paid Successfuly");
            clearInterval(intervalId); // Stop polling when payment is complete or canceled
            document.getElementById("loading_diaglog").close();
            setErrors(["Payment Successful"]);
            setSuccess(true);
            handlePurchase();
          }
        })
        .catch((error) => {
          console.error(error);
          clearInterval(intervalId); // Stop polling if there's an error
          setErrors(error.response.data.error.map((error) => error.msg));
        });
    }, 5000); // Poll every 5 seconds
  };
  // SETTING THE BOUGHT OFFER TO THE DATABASE
  const handlePurchase = async () => {
    setErrors([]);
    setSuccess(false);

    console.log("DATA: ", offer);
    const config = {
      url: `${serverUrl}/offer/purchaseOffer`,
      method: "PUT",
      data: {
        offer: offer,
      },
    };

    const { res, error } = await API(config);
    if (res) {
      setUser(res.data.account);
      setErrors(["Offer purchased"]);
      setSuccess(true);
    }

    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  return (
    <div
      className={`relative max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden m-4 w-60 h-auto ${
        theme === "night" ? "bg-night text-white" : "bg-fantasy text-black"
      } ${offer.ofr_enabled ? "border-green-500" : "border-red-500"} border-2`}
    >
      <LoadingSpinner
        theme={theme}
        id={"loading_diaglog"}
        message={"Processing Purchase Please Wait..."}
        handleAction={() => {
          setIsProcessing(true);
        }}
      />

      <div className="absolute top-2 right-2">
        {user.role != "P" && (
          <button
            id="btn_update"
            onClick={() => {
              setOfferselected(offer.ofr_id);
              setSelected("UpdateOffer");
            }}
            className=" hover:text-yellow-500 font-bold px-1 rounded"
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
      </div>
      <img
        className="w-full h-52 object-cover"
        src={offer && offer.ofr_sprite}
        alt="card"
      />
      <div className="p-4">
        <h1 className="font-bold text-xl mb-2">{offer.ofr_name}</h1>
        <p className="text-base flex items-center font-medium font-sans text-xl">
          {/* Image aligned to the left and resized */}
          <img
            src={offer.ofr_type === "P" ? perlas : ginto}
            alt="Type of Currency"
            className="w-5 h-5 mr-2" // w-10 h-10 are Tailwind classes for 40px width and height, mr-2 adds a small margin-right
          />
          {offer.ofr_value}
        </p>
        <p className="text-base text-lg">{offer.ofr_desc}</p>

        <p className="text-base pt-3 font-light">₱ {offer.ofr_price}</p>

        <div className="mt-4 flex flex-col sm:flex-row justify-end">
          {user.role === "P" ? (
            <button
              onClick={() => {
                handlePurchaseOffer(offer);
                setCurrentOffer(offer);

                setLoading(true); // Start loading only after the button is clicked
              }}
              className="bg-green-500 px-4 py-2 rounded mr-2 mb-2 sm:mb-0 text-white"
            >
              Buy
            </button>
          ) : (
            <button
              id="btn_offer_details"
              onClick={() => {
                setOfferselected(offer.ofr_id);
                setSelected("ViewOffer");
              }}
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              See Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
