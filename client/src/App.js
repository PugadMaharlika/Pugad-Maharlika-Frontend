import React, { useState, useEffect, useContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Alerts from "./context/Alerts";
import Success from "./context/Success";
import User from "./context/User";
import Main from "./pages/Main";
import SalesAndRevenueChart from "./pages/admin/SalesAndRevenueChart";
import UserLogsChart from "./pages/admin/UserLogsChart";

import { ThemeContext } from "./context/Theme";

function App() {
  const [cookie, setCookie] = useState(localStorage.getItem("cookie"));
  const [theme, setTheme] = useContext(ThemeContext);

  const handleCoookie = () => {
    setCookie("allowed");
    localStorage.setItem("cookie", "allowed");
  };

  const toggleTheme = () => {
    setTheme(theme === "night" ? "fantasy" : "night");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    if (cookie === "allowed") localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <User>
        <Alerts>
          <Success>
            <Routes>
              <Route
                index
                element={
                  <Landing
                    path="/"
                    cookie={cookie}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    handleCoookie={handleCoookie}
                  />
                }
              />
              <Route path="/app" element={<Main theme={theme} toggleTheme={toggleTheme} />} />
              {/* Add new route for SalesAndRevenueChart */}
              <Route path="/sales-revenue-chart" element={<SalesAndRevenueChart theme={theme} />} />
              {/* Add new route for UserLogsChart */}
              <Route path="/user-logs-chart" element={<UserLogsChart theme={theme} />} />
            </Routes>
          </Success>
        </Alerts>
      </User>
    </BrowserRouter>
  );
}

export default App;
