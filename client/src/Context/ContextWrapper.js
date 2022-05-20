import { LoggedInProvider } from "./LoggedInContext";
import { UserContextProvider } from "./UserContext";

import { useLoggedIn } from "./LoggedInContext";

export default function ContextWrapper({ children }) {
  return (
    <LoggedInProvider>
      <RestOfContext>{children}</RestOfContext>
    </LoggedInProvider>
  );
}

function RestOfContext({ children }) {
  const { loggedIn } = useLoggedIn();

  return (
    <UserContextProvider loggedIn={loggedIn}>{children}</UserContextProvider>
  );
}
