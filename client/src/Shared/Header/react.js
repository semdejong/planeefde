import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, notification } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { logout } from "../../API/authApi";

import { useLoggedIn } from "../../Context/LoggedInContext";
import AdminSettings from "./AdminSettings";

export default function Header() {
  const { loggedIn, setLoggedIn } = useLoggedIn();
  let history = useHistory();

  const pages = [
    {
      name: "Home",
      link: "/",
      condition: true,
    },
    {
      name: "Login",
      link: "/login",
      condition: !loggedIn,
    },
  ];

  const logUserOut = async () => {
    await logout();
    setLoggedIn(false);
    notification.open({
      message: "Logged out",
      description: "You have succesfully been logged out",
      icon: <LogoutOutlined />,
    });
    history.push("/login");
  };

  return (
    <>
      {loggedIn ? (
        <div className="h-24 w-screen bg-gray-50">
          <div className="w-full h-full flex flex-row items-center justify-between">
            <div className="space-x-20 py-6 px-12">
              {" "}
              {pages.map((page) => {
                if (page.condition) {
                  return (
                    <Link key={page.name} to={page.link}>
                      <Button type="primary" shape="round">
                        {page.name}
                      </Button>
                    </Link>
                  );
                }
              })}
            </div>
            <div className="flex flex-row items-center justify-center space-x-16 py-6 px-12">
              <div>
                <AdminSettings />
              </div>
              <Button type="primary" shape="round" onClick={() => logUserOut()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
