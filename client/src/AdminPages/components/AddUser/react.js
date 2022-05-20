import { useState } from "react";
import { useQueryClient } from "react-query";
import { Button, Modal, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { addUser } from "../../../API/authApi";
import useNotifications from "../../../Shared/Notifications/useNotifications";

export default function AddUser({ page, limit }) {
  const queryClient = useQueryClient();
  const { succesNotification, errorNotification } = useNotifications();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const addProjectToCache = (user) => {
    queryClient.setQueryData(["users", page, limit], (prevData) => {
      prevData.data.users = [...prevData.data.users, user];
      prevData.data.amount = prevData.data.amount + 1;
      return prevData;
    });
  };

  const openModal = () => {
    setUserName("");
    setUserFullname("");
    setUserEmail("");
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await addUser(userName, userFullname, userEmail);
    if (response.status === 200) {
      setVisible(false);
      setConfirmLoading(false);
      succesNotification(
        "User added successfully",
        `An email for the setup procedure has been sent to ${userEmail}`
      );
      addProjectToCache(response.data);
    } else {
      setConfirmLoading(false);
      errorNotification(
        response.data.message,
        `The following error occurred: ${response.data.message}`
      );
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button shape="circle" type="primary" onClick={openModal}>
        <div className="flex flex-row h-full w-full items-center justify-center">
          <UserAddOutlined style={{ fontSize: "20px", fontWeight: "bold" }} />
        </div>
      </Button>
      <Modal
        title="Add a new user"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <Input
            value={userFullname}
            onChange={(e) => setUserFullname(e.target.value)}
            placeholder="Fullname"
          />
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
      </Modal>
    </>
  );
}
