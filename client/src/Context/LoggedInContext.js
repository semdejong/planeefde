import React, { useContext, useState } from "react";

const LoggedInContext = React.createContext();

export function useLoggedIn() {
  return useContext(LoggedInContext);
}

export function LoggedInProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(document.cookie.includes("isAuth"));

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}
