import { React, useState, useContext } from "react";
import { AlertsContext } from "../context/Alerts";
import { useNavigate } from "react-router-dom";
import { SuccessContext } from "../context/Success";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Login({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useContext(AlertsContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    // form validation
    if (!email.trim() || !password.trim()) {
      setErrors((prevErrors) => [...prevErrors, "Please fill all the fields"]);
      setLoading(false);
      return;
    }

    axios
      .post(
        `${serverUrl}/auth/login`,
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setEmail("");
        setPassword("");
        setErrors([]);
        setSuccess(false);
        setLoading(false);
        document.getElementById("sign_up_modal").close();
        navigate("/dashboard");
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
        id="sign_in_modal"
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
              onClick={() => document.getElementById("sign_in_modal").close()}
              className="flex-1 hover:underline mt-2  "
            >
              <i className="fa-solid fa-x "></i>
            </button>
          </div>
          <form className="space-y-4" action="#">
            <h5 className="text-xl text-center font-medium ">Sign in</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                <i className="fa-regular fa-envelope mr-2"></i>
                Email
              </label>
              <input
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-night "
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium ">
                <i className="fa-solid fa-shield-halved mr-2"></i>
                Password
              </label>
              <div className="flex flex-row gap-5  w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="flex-2 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-night "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-start"></div>
              <a
                onClick={() => {
                  document.getElementById("forgot_password_modal").show();
                  document.getElementById("sign_in_modal").close();
                }}
                className="ms-auto text-sm cursor-pointer text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <button
              onClick={handleLogin}
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign In
            </button>
            <div
              className={`ms-2 text-sm font-medium  ${
                theme === "night" ? "text-gray-500" : "text-gray-900"
              }}`}
            >
              Not registered?{" "}
              <a
                onClick={() => {
                  document.getElementById("sign_in_modal").close();
                  document.getElementById("sign_up_modal").show();
                }}
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Login;
