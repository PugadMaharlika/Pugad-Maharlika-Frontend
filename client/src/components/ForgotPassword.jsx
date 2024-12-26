import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AlertsContext } from "../context/Alerts";
import { SuccessContext } from "../context/Success";
import emailjs from "@emailjs/browser";
import Alert from "./ui/Alert";

const serverUrl = process.env.REACT_APP_SERVER_URL;

emailjs.init("7ZnP8XVakorqeHNIy");

function ForgotPassword({ theme }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useContext(AlertsContext);
  const [success, setSuccess] = useContext(SuccessContext);

  useEffect(() => {
    if (sent) {
      setSuccess(false);
      setErrors([]);
      axios
        .get(`${serverUrl}/auth/reset-code?email=${email}`, {})
        .then((response) => {
          var templateParams = {
            recipient: email,
            code: response.data.code,
          };

          emailjs.send("service_fp4kl58", "template_l6cbh1m", templateParams).then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
          setSuccess(true);
          setErrors(["Success! check email for verification"]);
        })
        .catch((error) => {
          console.log(error);
          setSent(false);
          setSuccess(false);
          setErrors(error.response.data.errors.map((error) => error.msg));
        });
    }
  }, [sent]);

  const handleForgotPassword = () => {
    if (!email || !password || !code) {
      setErrors(["Please fill all the fields"]);
      return;
    }
    setSuccess(false);
    setErrors([]);
    axios
      .put(
        `${serverUrl}/auth/reset-password`,
        { email: email, code: code, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSuccess(true);
        setErrors(["Success! password is reset"]);
        document.getElementById("forget_password_modal").close();
      })
      .catch((error) => {
        console.log(error);
        setSent(false);
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
      });
  };

  return (
    <>
      <dialog
        id="forget_password_modal"
        className="modal backdrop-brightness-50 z-30 flex flex-grow w-screen place-self-center fixed  h-screen place-items-center "
      >
        <div
          className={`w-80 max-w-sm justify-center sm:w-full place-self-center px-4 pt-1 pb-4  mx-auto border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 md:pt-4 ${
            theme === "night" ? "bg-night text-white" : "bg-fantasy text-night"
          }`}
        >
          <div className="flex w-full  ">
            <span className="flex-2 w-full "></span>
            <button
              id="forget_password_modal_close"
              onClick={() => document.getElementById("forget_password_modal").close()}
              className="flex-1 hover:underline mt-2  "
            >
              <i className="fa-solid fa-x "></i>
            </button>
          </div>
          <form className="space-y-4" action="#">
            <h5 className="text-xl text-center font-medium ">Forgot Passsword</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                <i className="fa-regular fa-envelope mr-2"></i>
                Email
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  name="forgot_email"
                  id="forgot_email"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-night "
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    setSent(true);
                  }}
                  type="button"
                  className="btn btn-square hover:bg-blue-800 hover:text-white"
                >
                  <i className="fa-regular fa-paper-plane"></i>
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="code" className="block mb-2 text-sm font-medium">
                <i className="fa-regular fa-id-card mr-2"></i>
                Code
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-night "
                placeholder="123abc"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="new_password" className="block mb-2 text-sm font-medium">
                <i className="fa-solid fa-shield-halved mr-2"></i>
                New Password
              </label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-night  "
                placeholder="************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <button
              onClick={handleForgotPassword}
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reset Password
            </button>
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

export default ForgotPassword;
