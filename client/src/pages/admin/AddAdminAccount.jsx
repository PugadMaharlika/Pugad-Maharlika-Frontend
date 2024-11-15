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
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg flex shadow-lg relative">
        <button
          onClick={() => {
            setSelected("Admin");
          }}
          className="absolute top-4 left-4 text-black hover:text-gray-600"
        >
          <i className="fa-solid fa-circle-chevron-left text-3xl"></i>
        </button>
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
