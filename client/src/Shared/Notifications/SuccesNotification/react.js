import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function SuccesNotification({ title, message, optionalIcon }) {
  return notification.open({
    message: title,
    description: message,
    icon: !optionalIcon ? (
      <CheckCircleOutlined style={{ color: "green" }} />
    ) : (
      <optionalIcon style={{ color: "green" }} />
    ),
  });
}
