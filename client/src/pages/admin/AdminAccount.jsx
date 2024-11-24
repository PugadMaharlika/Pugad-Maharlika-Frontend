import React, { useState, useEffect, useContext } from "react";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import { ThemeContext } from "../../context/Theme";
import logo from "../../assets/logo1.png";
import API from "../../service/API";

export const AdminAccount = ({ setSelected, selectedadmin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [status, setStatus] = useState(selectedadmin.acc_enabled);
  const [wins, setWins] = useState("");
  const [loses, setLoses] = useState("");
  const [gold, setGold] = useState("");
  const [perlas, setPerlas] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [useraccount, setUserAccount] = useState({});
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    handleViewAdmins();
  }, []);

  const handleViewAdmins = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/account/view`,
      method: "POST",
      data: { id: selectedadmin.acc_id },
    };

    const { res, error } = await API(config);
    if (res) {
      setUserAccount(res.data.useraccount);
      setUsername(res.data.useraccount.acc_username);
      setEmail(res.data.useraccount.acc_email);
      setDateCreated(res.data.useraccount.date_created);
      setWins(res.data.useraccount.acc_win);
      setLoses(res.data.useraccount.acc_lose);
      setGold(res.data.useraccount.acc_gold);
      setPerlas(res.data.useraccount.acc_balance);
    }
    if (error) {
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  useEffect(() => {
    const handleEnabler = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/account/enabler`,
        method: "POST",
        data: { id: selectedadmin.acc_id, status: status, type: "A" },
      };

      const { res, error } = await API(config);
      if (res) {
        handleViewAdmins();
      }
      if (error) {
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };
    handleEnabler();
  }, [status]);

  const handleUpdateAdmin = async () => {
    setErrors([]);
    setSuccess(false);
    if (!gold || !perlas) {
    } else if (gold.length > 9 || perlas.length > 9 || gold < 0 || perlas < 0) {
      setSuccess(false);
      setErrors(["Please enter a valid amount!"]);
      return;
    }

    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/account/update`,
      method: "PUT",
      data: {
        id: selectedadmin.acc_id,
        gold: gold ? gold : 0,
        perlas: perlas ? perlas : 0,
        type: "A",
      },
    };

    const { res, error } = await API(config);
    if (res) {
      setSuccess(true);
      setErrors(["Updated successfully!"]);
    }
    if (error) {
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  const handleToggleStatus = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  const handleNumberChange = (callBack, number) => {
    const cleanedNumber = number.replace(/^0+/, "");
    callBack(cleanedNumber);
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Admin Account</h1>
        <button
          id="btn_back_AddNotification"
          onClick={() => setSelected("Admin")}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>
      <div className="max-w-6xl w-full p-8 rounded-lg flex flex-col md:flex-row">
        {/* Left Column: Profile Image */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          {/* Image Holder */}
          <div className="mb-4">
            {useraccount && useraccount.acc_profile ? (
              <img
                src={useraccount.acc_profile}
                alt="Selected"
                className="w-full h-auto rounded-lg mb-4"
              />
            ) : (
              <img src={logo} alt="Default" className="w-full h-auto rounded-lg mb-4" />
            )}
          </div>
        </div>

        {/* Middle Column: Username, Email, Wins, Loses */}
        <div className="w-full md:w-1/3 p-4">
          <div className="mb-4">
            <label className="block  mb-1">Name</label>
            <input
              disabled
              type="text"
              value={
                useraccount &&
                useraccount.acc_fname + " " + useraccount.acc_mname + " " + useraccount.acc_lname
              }
              placeholder="Username"
              className="w-full p-2 rounded-lg border"
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-1">Username</label>
            <input
              disabled
              type="text"
              value={useraccount && useraccount.acc_username}
              placeholder="Username"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block    mb-1">Email</label>
            <input
              disabled
              type="email"
              value={useraccount && useraccount.acc_email}
              placeholder="Email"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block    mb-1">Wins</label>
            <input
              disabled
              type="text"
              value={useraccount && useraccount.acc_win}
              placeholder="Wins"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block    mb-1">Loses</label>
            <input
              disabled
              type="text"
              value={useraccount && useraccount.acc_lose}
              placeholder="Loses"
              className="w-full p-2 rounded-lg border"
            />
          </div>
        </div>

        {/* Right Column: Win Rate, Gold, Perlas, Date Created, and Buttons */}
        <div className="w-full md:w-1/3 p-4">
          <div className="mb-4">
            <label className="block    mb-1">Win Rate</label>
            <input
              disabled
              type="text"
              value={
                (useraccount &&
                  Math.trunc(
                    (useraccount.acc_win / (useraccount.acc_win + useraccount.acc_lose)) * 100
                  )) ||
                0
              }
              placeholder="Win Rate"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Gold</label>
            <input
              type="number"
              value={gold}
              onChange={(e) => handleNumberChange(setGold, e.target.value)}
              placeholder="Gold"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Perlas</label>
            <input
              type="number"
              value={perlas}
              onChange={(e) => handleNumberChange(setPerlas, e.target.value)}
              placeholder="Perlas"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block    mb-1">Date Created</label>
            <input
              disabled
              type="text"
              value={
                useraccount && useraccount.date_created
                  ? new Date(useraccount.date_created).toLocaleString()
                  : ""
              }
              className="w-full p-2 rounded-lg border"
            />
          </div>

          {/* Toggle Status and Save Button */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={() => {
                handleToggleStatus();
              }}
              className={`py-2 px-4 rounded text-white ${
                status ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {status ? "Deactivate" : "Activate"}
            </button>

            <button
              onClick={handleUpdateAdmin}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
