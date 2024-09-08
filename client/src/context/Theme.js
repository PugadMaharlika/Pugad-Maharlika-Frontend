import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

function Theme({ children }) {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme ? savedTheme : "fantasy");
  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
}

export default Theme;
