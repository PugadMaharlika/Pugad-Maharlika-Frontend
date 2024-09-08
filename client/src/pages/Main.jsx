import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import DrawerButton from "../components/ui/DrawerButton";
import logo from "../assets/logo1.png";
import ConfirmationDialog from "../components/ConfirmationDialog";
import PlayerDashboard from "./user/PlayerDashboard";
import PlayerProfile from "./user/PlayerProfile";

function Main({ theme, toggleTheme }) {
  const [selected, setSelected] = useState("Dashboard");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const handleSelectedButton = (title) => {
    setSelected(title);
  };

  const handleLogout = () => {
    localStorage.setItem("authToken", "");
    localStorage.setItem("refreshToken", "");
    navigate("/");
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) setSideBarOpen(false);
  }, []);

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
      <div className={`flex flex-row w-screen ${theme === "night" ? "bg-space" : "bg-gray-200"}`}>
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
          <div className="relative  flex-2 flex-grow mb-5 flex overflow-auto max-h-full">
            <div className="w-auto m-5 h-auto flex-grow border-solid">
              {/* Content */}
              {selected === "Dashboard" && <PlayerDashboard theme={theme} />}
              {selected === "Profile" && <PlayerProfile theme={theme} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
