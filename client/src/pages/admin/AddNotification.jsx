import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/Theme";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const AddNotification = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  // Toggle Dropdown Menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle Form Submission
  const handleCreateNotification = () => {
    setErrors([]);
    setSuccess(false);

    // Validation
    if (!title || !message || !type) {
      setErrors(["All fields are required."]);
      return;
    }

    // API Request
    const notificationData = { title, message, type };
    axios
      .post(`${serverUrl}/notification/addnotification`, notificationData, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then(() => {
        setSuccess(true);
        setErrors(["Notification created successfully"]);
        setSelected("Notification");
      })
      .catch((error) => {
        setSuccess(false);

        setErrors(error.response.data.errors.map((err) => err.msg));
        console.log(errors);
      });
  };

  return (
    <div
      className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full py-10 ${
        theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
      }`}
    >
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Add Notification</h1>
        <button
          id="btn_back_AddNotification"
          onClick={() => setSelected("Notification")}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>

      <div className="flex flex-col mt-8">
        <h1 className="text-2xl font-bold">Title</h1>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-2"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h1 className="text-2xl font-bold mt-4">Message</h1>
        <textarea
          className="w-full h-24 border border-gray-300 rounded-lg px-2 py-1 mt-2"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <h1 className="text-2xl font-bold mt-4">Type</h1>

        {/* Dropdown Menu */}
        <div className="relative inline-block text-left mt-4">
          <div>
            <button
              type="button"
              className="inline-flex justify-start  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-haspopup="true"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleDropdown}
            >
              {type || "Select Type"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-.7.3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => {
                    setType("Global");
                    setIsOpen(false);
                  }}
                >
                  Global
                </button>
                <button
                  className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => {
                    setType("Player");
                    setIsOpen(false);
                  }}
                >
                  Player
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add Notification Button */}
        <div className="flex justify-end">
          <button
            id="btn_createnotification"
            onClick={handleCreateNotification}
            className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4"
          >
            Create Notification
          </button>
        </div>
      </div>
    </div>
  );
};
