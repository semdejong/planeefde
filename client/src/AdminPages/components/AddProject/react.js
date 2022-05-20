import { useState } from "react";
import { useQueryClient } from "react-query";
import { Button, Modal, Input, Switch } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";

import { addProject } from "../../../API/projectApi";
import useNotifications from "../../../Shared/Notifications/useNotifications";

export default function AddProject({ page, limit }) {
  const queryClient = useQueryClient();
  const { succesNotification, errorNotification } = useNotifications();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);

  const addProjectToCache = (project) => {
    queryClient.setQueryData(["projects", page, limit], (prevData) => {
      prevData.data.projects = [...prevData.data.projects, project];
      prevData.data.amount = prevData.data.amount + 1;
      return prevData;
    });
  };

  const openModal = () => {
    setName("");
    setDescription("");
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await addProject({
      name: name,
      description: description,
      recommended: isRecommended,
    });
    if (response.status === 200) {
      setVisible(false);
      setConfirmLoading(false);
      succesNotification(
        "Project added successfully",
        `Project ${name} has been successfully added to your project list`
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
          <FolderAddOutlined style={{ fontSize: "20px", fontWeight: "bold" }} />
        </div>
      </Button>
      <Modal
        title="Add a new project"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
          <br />
          <div className="flex flex-col w-full">
            <span>Recommended?</span>
            <div>
              <Switch
                checked={isRecommended}
                onChange={() => setIsRecommended(!isRecommended)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
