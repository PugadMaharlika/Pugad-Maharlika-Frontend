import React, { useState, useContext } from "react"; // Ensure hooks are imported here
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

  // State hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");

  // Tooltip visibility state
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddAdmin = async () => {
    setErrors([]);
    setSuccess(false);
    const config = {
      url: `${serverUrl}/account/addadmin`,
      method: "POST",
      data: {
        email: email,
        username: username,
        password: password,
        fname: firstName,
        mname: middleInitial,
        lname: lastName,
      },
    };

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmpassword.trim() === "" ||
      firstName.trim() === "" ||
      middleInitial.trim() === "" ||
      lastName.trim() === ""
    ) {
      setErrors(["Please fill in all the fields"]);
      return;
    }

    if (password !== confirmpassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    const { res, error } = await API(config);
    if (res) {
      setSuccess(true);
      setUser(res.data.account);
      const templateParams = {
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
      setErrors(error.response.data.errors.map((error) => error.msg));
    }
  };

  return (
    <div className={`col-span-8 overflow-hidden rounded-lg sm:w-full`}>
      {/* Admin Accounts Title and Add Account Button */}

      <div
        className={`flex w-full flex-col sm:flex-row justify-between items-center rounded-xl h-16 shadow-md  p-4 pl-10 font-bold bg-${theme}`}
      >
        ADD ADMIN
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
        className={`flex flex-col md:flex-row items-center justify-center w-full p-6 mt-4 rounded-lg shadow-lg gap-6 bg-${theme}`}
      >
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-4">Add Admin Account</h2>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* First Name Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Middle Initial Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Middle Initial</label>
            <input
              type="text"
              placeholder="Middle Initial"
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Password Input with Tooltip */}
          <div className="mb-4 relative">
            <label className="block font-bold mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 pr-10"
              />
              <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <i className="fa-solid fa-circle-question"></i>
              </span>
              {/* Tooltip Text */}
              {showTooltip && (
                <div className="absolute right-10 top-0 mt-10 p-2 bg-white border border-gray-300 text-sm text-gray-600 rounded-lg shadow-md w-64">
                  Password must have a special character (! @ # $ % ^ & *) and a
                  number. Minimum of 8 characters.
                </div>
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Add Account Button */}
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
