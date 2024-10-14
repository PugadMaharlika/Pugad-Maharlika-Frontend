import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/Theme";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import axios from "axios";
import API from "../../service/API";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const AddNotification = ({ setSelected }) => {
  const [theme] = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  // Toggle Dropdown Menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle Form Submission
  const handleCreateNotification = async () => {
    setErrors([]);
    setSuccess(false);

    // Validation
    if (!title || !message) {
      setErrors(["All fields are required."]);
      return;
    }

    // API Request
    const config = {
      url: `${serverUrl}/notification/addnotification`,
      method: "POST",
      data: {
        title: title,
        message: message,
      },
    };

    const { res, error, loading } = await API(config);
    if (res) {
      setSuccess(true);
      setErrors(["Notification added successfully!"]);
    }
    if (error) console.log(error);
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