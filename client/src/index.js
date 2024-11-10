import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Theme from "./context/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <Theme>
    <App />
  </Theme>,
);
