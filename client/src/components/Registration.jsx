import React, { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import Alert from "./ui/Alert";
import { AlertsContext } from "../context/Alerts";
import { SuccessContext } from "../context/Success";

const serverUrl = process.env.REACT_APP_SERVER_URL;

emailjs.init("7ZnP8XVakorqeHNIy");

function Registration({ theme }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);

  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrors([]);

    // form validation
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrors((prevErrors) => [...prevErrors, "Please fill all the fields"]);
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setErrors((prevErrors) => [...prevErrors, "Passwords do not match"]);
      setLoading(false);
      return;
    }

    axios
      .post(
        `${serverUrl}/auth/register`,
        { username: username, email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        var templateParams = {
          username: username,
          siteURL: response.data.url,
          id: response.data.id,
          recipient: email,
        };

        emailjs
          .send("service_fp4kl58", "template_2rt35su", templateParams)
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
              console.log("FAILED...", error);
            },
          );

        setSuccess(true);
        setErrors(["Success! check email for verification"]);
        setLoading(false);
        document.getElementById("sign_up_modal").close();
      })
      .catch((error) => {
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
        setLoading(false);
      });
  };

  return (
    <>
      <dialog
        id="sign_up_modal"
        className="modal backdrop-brightness-50 z-30 flex flex-grow place-self-center w-screen fixed h-screen place-items-center"
      >
        <div
          className={` w-80 max-w-sm justify-center sm:w-full place-self-center px-4 pt-1 pb-4 mx-auto border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 md:pt-4 ${
            theme === "night" ? "bg-night" : "bg-fantasy text-night"
          }`}
        >
          <div className="flex w-full">
            <span className="flex-2 w-full "></span>
            <button
              id="btn_sign_up_modal_close"
              onClick={() => document.getElementById("sign_up_modal").close()}
              className="flex-1 hover:underline mt-2"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <form className="space-y-4">
            <h5 className="text-xl text-center font-medium">Sign Up</h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                <i className="fa-regular fa-user mr-2"></i>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="reg_username"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="gabrielaxdeigo24"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                <i className="fa-regular fa-envelope mr-2"></i>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="reg_email"
                className="bg-gray-50 border text-night border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                <i className="fa-solid fa-shield-halved mr-2"></i>
                Password
              </label>
              <div className="flex flex-row gap-5 w-full">
                <input
                  type="password"
                  name="password"
                  id="reg_password"
                  placeholder="••••••••"
                  className="flex-2 bg-gray-50 border border-gray-300 text-night text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm"
                className="block mb-2 text-sm font-medium"
              >
                <i className="fa-solid fa-shield-halved mr-2"></i>
                Confirm Password
              </label>
              <div className="flex flex-row gap-2 w-full">
                <input
                  type="password"
                  name="confirm"
                  id="reg_confirm"
                  placeholder="••••••••"
                  className="flex-2 bg-gray-50 border border-gray-300 text-night text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleRegistration}
              type="button"
              className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <span className="loading w-4 mr-2 loading-spinner"></span>
              ) : (
                ""
              )}
              Create Account
            </button>
            <div
              className={`ms-2 text-sm font-medium ${
                theme === "night" ? "text-white" : "text-night"
              }`}
            >
              Already have an account?{" "}
              <a
                onClick={() => {
                  document.getElementById("sign_in_modal").show();
                  document.getElementById("sign_up_modal").close();
                }}
                className="text-blue-700 hover:underline cursor-pointer dark:text-blue-500"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </dialog>
      {/* Alert container */}
      <div className="fixed z-40 bottom-5 right-2 md:right-3 lg:right-5">
        <div className="flex flex-col gap-3 justify-items-end justify-end items-end p-5">
          {errors.length > 0
            ? errors.map((error, index) => (
                <Alert
                  key={index}
                  success={success}
                  index={index}
                  error={error}
                  errors={errors}
                  setErrors={setErrors}
                  theme={theme}
                />
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default Registration;
