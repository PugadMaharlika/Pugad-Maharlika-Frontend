import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function User({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

export default User;
