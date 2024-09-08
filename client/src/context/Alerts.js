import React, { createContext, useState } from "react";

export const AlertsContext = createContext();

function Alerts({ children }) {
  const [errors, setErrors] = useState([]);
  return <AlertsContext.Provider value={[errors, setErrors]}>{children}</AlertsContext.Provider>;
}

export default Alerts;
