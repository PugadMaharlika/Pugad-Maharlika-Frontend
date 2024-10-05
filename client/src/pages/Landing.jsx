import { React, useState, useContext, useEffect } from "react";
import NavBar2 from "../components/NavBar2";
import Login from "../components/Login";
import Registration from "../components/Registration";
import ForgotPassword from "../components/ForgotPassword";
import Cookie from "../components/Cookie";
import { AlertsContext } from "../context/Alerts";
import Alert from "../components/ui/Alert";
import logo from "../assets/logo1.png";
import oneal from "../assets/oneal_profile.png";
import louie from "../assets/louie_profile.png";
import charles from "../assets/charles_profile.png";
import shane from "../assets/shane_profile.png";
import diego1 from "../assets/diego1.PNG";
import gabriela1 from "../assets/gabriela1.PNG";
import history from "../assets/history.PNG";
import exploration from "../assets/exploration.PNG";
import fighting from "../assets/fighting.PNG";

function Landing({ theme, toggleTheme, handleCoookie, cookie }) {
  const [errors, setErrors] = useContext(AlertsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <>
      <NavBar2 theme={theme} toggleTheme={toggleTheme} />
      {cookie ? "" : <Cookie handleCoookie={handleCoookie} theme={theme} />}

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
      <ForgotPassword theme={theme} />
      <Login success={success} setSuccess={setSuccess} theme={theme} />
      <Registration theme={theme} />

      {/* HERO SECTION */}
      <section id="home" className="flex w-full flex-col">
        <div className="h-8 "></div>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="flex lg:mt-0 lg:col-span-5 lg:hidden">
            <img src={logo} alt="mockup" />
          </div>
          <div className="mr-auto place-self-center lg:col-span-7 ">
            <h1 className="max-w-2xl mb-4 text-center text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl md:text-left lg:text-left">
              Pugad Maharlika: Mobile 2D Fighting Game of Philippine History, Culture, and Martial
              Arts
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
              Unleash the Warrior Within: Dive into the Rich Tapestry of Philippine Heritage!
            </p>
            <div className="flex ">
              <button className="place-self-center z-1 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 md:text-sm lg:text-xl">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen mr-2"></i>
                  Download &nbsp;&nbsp;
                </span>
              </button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={logo} alt="mockup" />
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <div id="discover" className="flex h-10"></div>
      <section
        className={`  ${theme === "night" ? "text-fantasy bg-fantasy" : "text-night bg-night"}`}
      >
        <p
          className={`flex font-bold justify-center text-center text-2xl pt-10 lg:text-4xl ${
            theme === "night" ? "text-night" : "text-fantasy"
          }`}
        >
          <i className="fa-solid fa-gamepad mt-1"></i>
          &nbsp; Discover
        </p>
        <div className="flex flex-col pt-10 pb-10 md:flex-row lg:col-auto gap-5 px-4 md:px-10 justify-center items-center">
          <div
            className={`block max-w-[18rem] rounded-lg shadow-secondary-1 dark:bg-surface-dark ${
              theme === "night" ? "bg-night" : "bg-fantasy"
            }`}
          >
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-t-lg" src={history} alt="" />
            </div>
            <div className="p-6">
              <p className="text-lg  mb-2  font-bold">History</p>
              <p className="text-base">
                Engage in dynamic 2D combat, showcasing traditional Filipino martial arts and iconic
                fighting styles in thrilling, action-packed battles.
              </p>
            </div>
          </div>
          <div
            className={`block max-w-[18rem] rounded-lg shadow-secondary-1 dark:bg-surface-dark ${
              theme === "night" ? "bg-night" : "bg-fantasy"
            }`}
          >
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-t-lg" src={exploration} alt="" />
            </div>
            <div className="p-6">
              <p className="text-lg mb-2 font-bold">Exploration</p>
              <p className="text-base">
                Discover vibrant and immersive environments reflecting the diverse landscapes of the
                Philippines, each with unique challenges and secrets.
              </p>
            </div>
          </div>
          <div
            className={`block max-w-[18rem] rounded-lg shadow-secondary-1 dark:bg-surface-dark ${
              theme === "night" ? "bg-night" : "bg-fantasy"
            }`}
          >
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img className="rounded-t-lg" src={fighting} alt="" />
            </div>
            <div className="p-6">
              <p className="text-lg  mb-2  font-bold">Fighting</p>
              <p className="text-base">
                Engage in dynamic 2D combat, showcasing traditional Filipino martial arts and iconic
                fighting styles in thrilling, action-packed battles.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div id="about" className="flex"></div>
      {/* About Section */}
      <section className="mt-20">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  sm:text-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold e">About Pugad Maharlika</h2>
            <p className="mb-4">
              PUGAD MAHARLIKA is a mobile 2D Fighting Game about Philippine History, Culture, and
              Martial Arts, aimed at enriching our culture by providing newer ways to learn. It
              helps players engage with Philippine History in an interactive and immersive manner.
            </p>
            <p>
              Join us on a journey that celebrates and deepens your connection with the vibrant
              traditions and heroic tales of the Philippines.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src={diego1} alt="Deigo Silang" />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src={gabriela1}
              alt="Gabriela Silang"
            />
          </div>
        </div>
      </section>
      {/* Team Section */}
      <div id="team" className="flex h-10"></div>
      <section className={theme === "night" ? "bg-fantasy" : "bg-night"}>
        <div
          className={`py-8 px-4 mx-auto max-w-screen-xl lg:py-12 lg:px-6 ${
            theme === "night" ? "text-night" : "text-fantasy"
          }`}
        >
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold ">Meet The Team</h2>
            <p className="font-light lg:mb-16 sm:text-xl">CTU-MAIN BSIT 4-B PowerPuffBoys</p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Oneal */}
            <div className="text-center ">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={oneal} alt="Oneal Avatar" />
              <h3 className="mb-1 text-2xl font-bold tracking-tight">
                <a href="#">Oneal Ryan Torres</a>
              </h3>
              <p>Hacker</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="https://www.facebook.com/onealryan.torres.9">
                    <i className="fa-brands fa-facebook lg:text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/OnealTorres">
                    <i className="fa-brands fa-github lg:text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* Louie */}
            <div className="text-center ">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={louie} alt="Louie Avatar" />
              <h3 className="mb-1 text-2xl font-bold tracking-tight">
                <a href="#">Louie Jay Natividad</a>
              </h3>
              <p>Hustler</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="https://www.facebook.com/onealryan.torres.9">
                    <i className="fa-brands fa-facebook lg:text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/OnealTorres">
                    <i className="fa-brands fa-github lg:text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* Charles */}
            <div className="text-center ">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={charles}
                alt="Charles Avatar"
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight">
                <a href="#">Charles Justine Cabezas</a>
              </h3>
              <p>Hipster</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="https://www.facebook.com/onealryan.torres.9">
                    <i className="fa-brands fa-facebook lg:text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/OnealTorres">
                    <i className="fa-brands fa-github lg:text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* Shane */}
            <div className="text-center ">
              <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={shane} alt="Shane Avatar" />
              <h3 className="mb-1 text-2xl font-bold tracking-tight">
                <a href="#">Shane Audrey Tagpuno</a>
              </h3>
              <p>Hacker</p>
              <ul className="flex justify-center mt-4 space-x-4">
                <li>
                  <a href="https://www.facebook.com/onealryan.torres.9">
                    <i className="fa-brands fa-facebook lg:text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/OnealTorres">
                    <i className="fa-brands fa-github lg:text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer
        className={`rounded-lg shadow ${
          theme === "night" ? "bg-night text-fantasy" : "bg-fantasy text-night"
        }`}
      >
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Pugad Maharlika Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Pugad Maharlika
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Home
                </a>
              </li>
              <li>
                <a href="#discover" className="hover:underline me-4 md:me-6">
                  Discover
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#team" className="hover:underline">
                  Team
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm  sm:text-center ">
            © 2024 PowerPuffBoys . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Landing;
