import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DrawerButton from "../components/ui/DrawerButton";
import logo from "../assets/logo1.png";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PlayerDashboard from "./user/PlayerDashboard";
import PlayerProfile from "./user/PlayerProfile";
import { UserContext } from "../context/User";
import { AlertsContext } from "../context/Alerts";
import { SuccessContext } from "../context/Success";
import Alert from "../components/ui/Alert";
import useAuthCheck from "../hooks/useAuthCheck";
import useInactivityTimeout from "../hooks/useInactivityTimeout ";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Main({ theme, toggleTheme }) {
  useAuthCheck();
  const [selected, setSelected] = useState("Dashboard");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useContext(SuccessContext);
  const [errors, setErrors] = useContext(AlertsContext);
  const authToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const navigate = useNavigate();

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleSelectedButton = (title) => {
    setSelected(title);
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
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setErrors(error.response.data.errors.map((error) => error.msg));
        navigate("/");
      });
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    await handlePutRequest("/auth/logout", {}, "Logout Successful");
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setSideBarOpen(false);
    }
  }, []);

  useInactivityTimeout(handleLogout);

  return (
    <>
      {/* Logout Dialog */}
      <ConfirmationDialog
        theme={theme}
        handleAction={() => {
          handleLogout();
        }}
        id={"logout_dialog"}
        message={"Confirm Logout?"}
        buttonText={"Logout"}
      />
      {/* Main Content */}
      <div className={`flex flex-row w-screen `}>
        {/* Drawer */}
        <div
          className={`relative flex-1 h-svh flex-col bg-base-100 border-r-2 border-transparent text-fantasy  w-full max-w-[20rem] p-2 md:p-4 shadow-xl shadow-blue-gray-900/5 ${
            sideBarOpen ? "flex min-w-[240px]" : "w-20 flex"
          }`}
        >
          <div className="mb-2 px-2 py-4">
            <h5
              className={`flex gap-2 antialiased tracking-normal font-sans text-lg font-semibold leading-snug ${
                theme === "night" ? "text-fantasy " : "text-night "
              }`}
            >
              <img
                className="h-7 w-7 btn-square bg-contain  "
                alt="Pugad Maharlika Icon"
                src={logo}
              />
              {sideBarOpen ? "Pugad Maharlika" : ""}
            </h5>
          </div>
          <nav className="flex flex-col mb-5 gap-1 p-0 ">
            <DrawerButton
              icon={<i className="fa-solid fa-house-chimney"></i>}
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Dashboard"}
              handleSelectedButton={handleSelectedButton}
            />
            <DrawerButton
              icon={<i className="fa-solid fa-sack-dollar pl-0.5 md-pl-0"></i>}
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Offers"}
              handleSelectedButton={handleSelectedButton}
            />
            <DrawerButton
              icon={<i className="fa-solid fa-bell pl-0.5 md-pl-0"></i>}
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Notification"}
              handleSelectedButton={handleSelectedButton}
            />
            <DrawerButton
              icon={<i className="fa-solid fa-file-lines pl-0.5 md-pl-0"></i>}
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Transaction"}
              handleSelectedButton={handleSelectedButton}
            />
            <DrawerButton
              icon={<i className="fa-solid fa-user pl-0.5 md-pl-0"></i>}
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Profile"}
              handleSelectedButton={handleSelectedButton}
            />

            <DrawerButton
              icon={
                theme === "night" ? (
                  <i className="fa-solid fa-cloud-moon"></i>
                ) : (
                  <i className="fa-solid fa-cloud-sun"></i>
                )
              }
              selected={selected}
              theme={theme}
              sideBarOpen={sideBarOpen}
              title={"Theme"}
              handleSelectedButton={() => {
                toggleTheme();
              }}
            />
          </nav>
          <div className="flex-grow"></div>
          <DrawerButton
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
            selected={selected}
            theme={theme}
            sideBarOpen={sideBarOpen}
            title={"Logout"}
            handleSelectedButton={() => {
              document.getElementById("logout_dialog").show();
            }}
          />
        </div>
        {/* NavigationBar */}
        <div className="flex flex-col rounded-lg h-svh w-svw">
          <NavBar theme={theme} toggleTheme={toggleTheme} toggleSideBar={toggleSideBar} />
          <div
            className={`relative  flex-2 flex-grow overflow-auto max-h-full ${
              theme === "night" ? "bg-space" : "bg-gray-200"
            }`}
          >
            <div className={`flex-grow flex justify-center m-3 border-solid`}>
              {/* Content  m-3 md:m-5 */}
              {selected === "Dashboard" && <PlayerDashboard theme={theme} />}
              {selected === "Profile" && <PlayerProfile theme={theme} />}
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default Main;
