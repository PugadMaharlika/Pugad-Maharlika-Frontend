import React, { createContext, useState } from "react";

export const SuccessContext = createContext();

function Success({ children }) {
  const [success, setSuccess] = useState(false);
  return (
    <SuccessContext.Provider value={[success, setSuccess]}>
      {children}
    </SuccessContext.Provider>
  );
}

export default Success;
