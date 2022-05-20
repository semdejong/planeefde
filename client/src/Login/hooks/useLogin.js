import { useState } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { ExclamationCircleOutlined, LoginOutlined } from "@ant-design/icons";

import { login } from "../../API/authApi";
import { useUserContext } from "../../Context/UserContext";

export default function useLogin() {
  const [loading, setLoading] = useState(false);

  const { setRole } = useUserContext();

  let history = useHistory();

  const performLogin = async (email, password, setLoggedIn) => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.status === 200) {
      openNotification("You have been signed in!", true);
      setRole(result.data.role);
      setLoggedIn(true);
      history.push("/dashboard");
    } else {
      openNotification(result.data.message);
    }
  };

  const openNotification = (description, succes = false) => {
    notification.open({
      message: succes ? "Login succesfull" : "Login has failed",
      description: description,
      icon: succes ? (
        <LoginOutlined />
      ) : (
        <ExclamationCircleOutlined style={{ color: "red" }} />
      ),
    });
  };

  return {
    loading,
    performLogin,
  };
}
