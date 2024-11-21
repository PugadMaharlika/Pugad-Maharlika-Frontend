import { React, useEffect, useState, useContext } from "react";
import oneal from "../assets/oneal_profile.png";
import logo from "../assets/logo1.png";
import { UserContext } from "../context/User";

function NavBar({ theme, toggleTheme, setSelected, toggleSideBar }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) setSideBarOpen(false);
  }, []);

  return (
    <div className="h-auto w-full flex-2 flex flex-row z-20  shadow-lg py-3 bg-base-100  ">
      <div className="flex-1 navbar-start">
        <button
          onClick={() => {
            toggleSideBar();
            setSideBarOpen(!sideBarOpen);
          }}
          className="ml-2 btn bg-transparent border-none  "
        >
          {sideBarOpen ? (
            <i className="fa-solid fa-angle-left"></i>
          ) : (
            <i className="fa-solid fa-angle-right"></i>
          )}
        </button>
      </div>
      <div className="navbar-center flex-1 hidden lg:flex lg:gap-10"></div>
      <div className="flex-1 flex gap-5 justify-end mr-2">
        <div className=" items-center hidden pt-2 md:pt-0 justify-center font-bold md:flex">
          {user && user.username}
        </div>
        {user && user.profile ? (
          <img
            onClick={() => {
              setSelected("Profile");
            }}
            className="rounded-full btn btn-circle object-cover border-inherit mr-2"
            src={user && user.profile}
            alt="mockup"
          />
        ) : (
          <img
            onClick={() => {
              setSelected("Profile");
            }}
            className="rounded-full btn btn-circle border-inherit mr-2"
            src={logo}
            alt="mockup"
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
