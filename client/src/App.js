import React, { useState, useEffect, useContext } from "react";
import { Router, Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Alerts from "./context/Alerts";
import Success from "./context/Success";
import Main from "./pages/Main";
import { ThemeContext } from "./context/Theme";
function App() {
  const savedTheme = localStorage.getItem("theme");
  const [cookie, setCookie] = useState(localStorage.getItem("cookie"));
  const [theme, setTheme] = useContext(ThemeContext);
  const handleCoookie = () => {
    setCookie("allowed");
    localStorage.setItem("cookie", "allowed");
  };
  const toggleTheme = () => {
    setTheme(theme === "night" ? "fantasy" : "night");
    console.log("test");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    if (cookie === "allowed") localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Alerts>
        <Success>
          <Routes>
            <Route
              index
              element={
                <Landing
                  cookie={cookie}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  handleCoookie={handleCoookie}
                />
              }
            />
            <Route path="/dashboard" element={<Main theme={theme} toggleTheme={toggleTheme} />} />
          </Routes>
        </Success>
      </Alerts>
    </BrowserRouter>
  );
}

export default App;
