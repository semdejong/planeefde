import { useState } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { ExclamationCircleOutlined, LoginOutlined } from "@ant-design/icons";

import { register } from "../../API/authApi";

export default function useRegister() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const performRegister = async (
    fullname,
    username,
    email,
    password,
    repeatPassword
  ) => {
    if (password === repeatPassword) {
      setLoading(true);
      const response = await register(username, fullname, email, password);
      setLoading(false);
      if (response.status === 200) {
        openNotification(`A verify email has been sent to ${email}`, true);
        history.push("/login");
      } else {
        openNotification(response.data.message);
      }
      return;
    }
    openNotification("Passwords dont match");
  };

  const openNotification = (description, succes = false) => {
    notification.open({
      message: succes ? "Signup succesfull" : "Signup has failed",
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
    performRegister,
  };
}
