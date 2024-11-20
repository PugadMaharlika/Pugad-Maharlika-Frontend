import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import { UserContext } from "../../context/User";
import { SuccessContext } from "../../context/Success";
import { AlertsContext } from "../../context/Alerts";
import API from "../../service/API";
import emailjs from "@emailjs/browser";

export const AddAdminAccount = ({ setSelected }) => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [Theme] = useContext(ThemeContext);

  const handleAddAdmin = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/account/addadmin`,
      method: "POST",
      data: { email: email, username: username, password: password },
    };
    if (
      username.trim() == "" ||
      email.trim() == "" ||
      password.trim() == "" ||
      confirmpassword.trim() == ""
    ) {
      setErrors(["Please fill in all the fields"]);
      return;
    }
    if (password != confirmpassword) {
      setErrors(["Passwords Does NOT match"]);
      return;
    }

    const { res, error } = await API(config);
    if (res) {
      setSuccess(true);
      setUser(res.data.account);
      var templateParams = {
        username: username,
        siteURL: res.data.url,
        id: res.data.id,
        recipient: email,
      };

      emailjs.send("service_fp4kl58", "template_2rt35su", templateParams).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
      setErrors(["Created Successfully, Check Email for Activation"]);
    }
    if (error) {
      console.log(error);
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  return (
    <div className="flex flex-col col-span-8 overflow-hidden rounded-lg text-xs md:text-md w-64 px-8 sm:w-full h-full gap-5">
      <div
        className={`flex w-full rounded-xl h-16 shadow-md bg-fantasy p-4 pl-4 justify-between py-4 font-bold bg-${Theme}`}
      >
        <h1 className="text-2xl font-bold">Add Admin</h1>
        <button
          id="btn_back"
          onClick={() => {
            setSelected("Admin");
          }}
          className="rounded-lg px-4"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
      </div>
      <div
        className={`flex flex-col md:flex-row items-center justify-center w-full p-6 rounded-lg shadow-lg gap-6 bg-${Theme}`}
      >
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Add Admin Account</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border border-gray-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded-lg border border-gray-300"
          />
          <div className="flex justify-between">
            <button
              className="rounded-lg bg-green-500 text-white px-4 py-2 hover:bg-green-600"
              onClick={() => {
                handleAddAdmin();
              }}
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
