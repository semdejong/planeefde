import { useUserContext } from "../../Context/UserContext";
import { useLoggedIn } from "../../Context/LoggedInContext";

export function Username() {
  const { loggedIn } = useLoggedIn();
  const { username } = useUserContext();
  return <>{loggedIn ? username : ""}</>;
}

export function Fullname() {
  const { loggedIn } = useLoggedIn();
  const { fullname } = useUserContext();
  return <>{loggedIn ? fullname : ""}</>;
}

export function Email() {
  const { loggedIn } = useLoggedIn();
  const { email } = useUserContext();
  return <>{loggedIn ? email : ""}</>;
}

export function Role() {
  const { loggedIn } = useLoggedIn();
  const { role } = useUserContext();
  return <>{loggedIn ? role : ""}</>;
}
