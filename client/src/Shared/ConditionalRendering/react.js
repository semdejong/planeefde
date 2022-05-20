import React from "react";
import { useLoggedIn } from "../../Context/LoggedInContext";
import { useUserContext } from "../../Context/UserContext";

export function SessionRendering({ children }) {
  const { loggedIn } = useLoggedIn();

  return loggedIn ? children : <></>;
}

export function NoSessionRendering({ children }) {
  const { loggedIn } = useLoggedIn();

  return !loggedIn ? children : <></>;
}

export function RoleRendering({ role: userRole, whenNot, children }) {
  const { role } = useUserContext();
  return (
    <SessionRendering>
      {role === userRole ? children : whenNot || <></>}
    </SessionRendering>
  );
}
