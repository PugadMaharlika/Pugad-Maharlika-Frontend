import { React, useEffect, useState } from "react";
import logo from "../assets/logo1.png";

function NavBar2({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed navbar z-30 bg-base-100 ${scrolled ? "border-b-2 border-gray-200" : ""}`}
    >
      <div className="flex-1 navbar-start">
        <a className="btn btn-ghost lg:text-xl sm:text-md">
          <img className="h-7 w-7 bg-contain  " src={logo} />
          Pugad Maharlika
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#discover">Discover</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#team">Team</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 gap-3 navbar-end">
        <button onClick={toggleTheme} className="btn btn-square btn-outline">
          {theme === "night" ? (
            <i className="fa-regular fa-moon"></i>
          ) : (
            <i className="fa-regular fa-sun"></i>
          )}
        </button>
        <button
          onClick={() => document.getElementById("sign_in_modal").show()}
          className="btn btn-outline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default NavBar2;
