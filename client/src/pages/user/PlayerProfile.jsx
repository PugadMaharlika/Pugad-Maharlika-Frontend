import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertsContext } from "../../context/Alerts";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import axios from "axios";
import useAuthCheck from "../../hooks/useAuthCheck";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const PlayerProfile = ({ theme }) => {
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const [user, setUser] = useContext(UserContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();
  //useAuthCheck();

  const handleProfile = () => {
    setErrors([]);
    setSuccess(false);
    if (profile == "") {
      setSuccess(false);
      setErrors(["No file selected. Please select an image file"]);
      return;
    }

    // Check file type (case-insensitive)
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(profile.type.toLowerCase())) {
      setSuccess(false);
      setErrors(["Invalid file type. Only PNG, JPG, and JPEG are allowed"]);
      return;
    }

    // Check file size (less than or equal to 5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (profile.size > maxSize) {
      setSuccess(false);
      setErrors(["File size exceeds 5 MB. Please choose a smaller file."]);
      return;
    }
    const formData = new FormData();
    formData.append("profile", profile);
    axios
      .put(`${serverUrl}/profile/update-profile`, formData, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then((response) => {
        setSuccess(true);
        setErrors(["Success! profile picture has been changed"]);
        setUser(response.data.account);
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
      });
  };
  const handlePutRequest = async (route, data, success) => {
    axios
      .put(`${serverUrl}${route}`, data, {
        headers: {
          "x-auth-token": authToken,
          "x-refresh-token": refreshToken,
        },
      })
      .then((response) => {
        setSuccess(true);
        setErrors([success]);
        setUser(response.data.account);
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
        return false;
      });
  };

  const handleUsername = async () => {
    if (!username) {
      setSuccess(false);
      setErrors(["No username entered"]);
      return;
    }
    await handlePutRequest(
      "/profile/update-username",
      { username: username },
      "Success! username has been changed"
    );
  };

  const handlePassword = async () => {
    if (!password || !newpassword) {
      setSuccess(false);
      setErrors(["Current or new password is not filled"]);
      return;
    }
    await handlePutRequest(
      "/profile/update-password",
      { currentpassword: password, newpassword: newpassword },
      "Success! password has been changed"
    );
  };

  const handleDisable = async () => {
    await handlePutRequest("/profile/disable-account", {}, "Success! account is now disabled");

    localStorage.setItem("user", null);
    localStorage.setItem("authToken", null);
    localStorage.setItem("refreshToken", null);
    navigate("/");
  };

  return (
    <>
      {/* Logout Dialog */}
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          handleDisable();
        }}
        id={"disable_account_dialog"}
        message={"Are you sure you want to DISABLE your account?"}
        buttonText={"Confirm"}
        is_danger={true}
      />
      <div
        className={`col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full ${
          theme === "night" ? "bg-night text-white " : "bg-fantasy text-black"
        }`}
      >
        <div className="pt-4">
          <h1 className="py-2   font-semibold">Account Profile</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2   font-semibold">Profile Picture</p>
        <div className="flex flex-col md:flex-row sm:items-left sm:justify-between">
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
          <button
            onClick={() => {
              handleProfile();
            }}
            className="inline-flex   font-semibold text-blue-600 hover:underline decoration-2"
          >
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2   font-semibold">Username</p>
        <div className="flex flex-col md:flex-row md:items-center gap-1 sm:justify-between">
          <p className="">
            Your username is <strong>{user.username}</strong>
          </p>
          <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
            <input
              type="text"
              id="username"
              className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={user.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            onClick={handleUsername}
            className="inline-flex   font-semibold text-blue-600 hover:underline decoration-2"
          >
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2   font-semibold">Email Address</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="">
            Your email address is <strong>{user.email}</strong>
          </p>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2   font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label htmlFor="login-password">
              <span className="  ">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="current-login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>
            <label htmlFor="login-password">
              <span className=" ">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="new-login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="***********"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={handlePassword}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Save Password
        </button>
        <hr className="mt-4 mb-8" />

        <div className="mb-10">
          <p className="py-2   font-semibold">Disable Account</p>
          <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">
            Please confirm that you want to disable this account, as it will be permanently deleted
            and the associated email address will no longer be available for creating a new account.
          </p>

          <button
            onClick={() => {
              document.getElementById("disable_account_dialog").show();
            }}
            className="ml-auto mt-5 w-16 h-8 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Disable
          </button>
        </div>
      </div>
    </>
  );
};

export default PlayerProfile;
