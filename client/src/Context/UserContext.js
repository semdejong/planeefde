import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";

import { getMe } from "../API/userApi";
import { useLoggedIn } from "./LoggedInContext";

const UserContext = React.createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ loggedIn, children }) {
  const { data, isLoading, refetch } = useQuery("getMe", getMe);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn, data]);

  const getUser = async () => {
    if (!isLoading) {
      if (data.status === 200) {
        setUsername(data.data.username);
        setFullname(data.data.fullname);
        setEmail(data.data.email);
        setRole(data.data.role);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        username,
        fullname,
        email,
        role,
        setUsername,
        setFullname,
        setEmail,
        setRole,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
