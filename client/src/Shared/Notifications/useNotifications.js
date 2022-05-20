import { notification } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function useNotifications() {
  const succesNotification = (title, message, optionalIcon) => {
    notification.open({
      message: title,
      description: message,
      icon: !optionalIcon ? (
        <CheckCircleOutlined style={{ color: "green" }} />
      ) : (
        <optionalIcon style={{ color: "green" }} />
      ),
    });
  };

  const errorNotification = (title, message, optionalIcon) => {
    notification.open({
      message: title,
      description: message,
      icon: !optionalIcon ? (
        <ExclamationCircleOutlined style={{ color: "red" }} />
      ) : (
        <optionalIcon style={{ color: "red" }} />
      ),
    });
  };

  return {
    succesNotification,
    errorNotification,
  };
}
