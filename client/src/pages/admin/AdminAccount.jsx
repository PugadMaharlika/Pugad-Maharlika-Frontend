import React, { useState, useEffect, useContext } from "react";
import shane from "../../assets/James-Reid.jpg";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import API from "../../service/API";

export const AdminAccount = ({ setSelected, selectedadmin }) => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  useEffect(() => {
    console.log(selectedadmin);
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
      }
      if (error) {
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };
    handleViewAdmins();
  }, []);

  useEffect(() => {
    const handleEnabler = async () => {
      setErrors([]);
      setSuccess(false);
      const config = {
        url: `${serverUrl}/account/enabler`,
        method: "POST",
        data: { id: selectedadmin.acc_id, status: status },
      };

      const { res, error } = await API(config);
      if (res) {
        setUserAccount(res.data.useraccount);
      }
      if (error) {
        setErrors(error.response.data.errors.map((error) => error.msg));
      }
    };
    handleEnabler();
  }, [status]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleStatus = () => {
    setStatus((prevStatus) => !prevStatus);
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Left Column: Profile Image */}
        <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Account Info</h2>
          <button
            onClick={() => setSelected("Admin")}
            className="absolute top-4 left-4 text-black hover:text-gray-600"
          >
            <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
          </button>

          {/* Image Holder */}
          <div className="mb-4">
            {useraccount && useraccount.acc_profile ? (
              <img
                src={useraccount.acc_profile}
                alt="Selected"
                className="w-full h-auto rounded-lg mb-4"
              />
            ) : (
              <img src={shane} alt="Default" className="w-full h-auto rounded-lg mb-4" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
        </div>

        {/* Middle Column: Username, Email, Wins, Loses */}
        <div className="w-full md:w-1/3 p-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={useraccount && useraccount.acc_username}
              placeholder="Username"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={useraccount && useraccount.acc_email}
              placeholder="Email"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Wins</label>
            <input
              type="text"
              value={useraccount && useraccount.acc_win}
              placeholder="Wins"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Loses</label>
            <input
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
            <label className="block text-gray-700 mb-1">Win Rate</label>
            <input
              type="text"
              value={
                (useraccount &&
                  (useraccount.acc_win / (useraccount.acc_win + useraccount.acc_lose)) * 100) ||
                0
              }
              placeholder="Win Rate"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gold</label>
            <input
              type="text"
              value={useraccount && useraccount.acc_gold}
              placeholder="Gold"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Perlas</label>
            <input
              type="text"
              value={useraccount && useraccount.acc_balance}
              placeholder="Perlas"
              className="w-full p-2 rounded-lg border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Date Created</label>
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

            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
