import React from "react";
import { useQueryClient } from "react-query";
import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { deleteProject } from "../../../API/projectApi";
import useNotifications from "../../../Shared/Notifications/useNotifications";

export default function DeleteProject({ projectId, page, limit }) {
  let queryClient = useQueryClient();
  const { succesNotification, errorNotification } = useNotifications();

  const removeProjectFromCache = () => {
    queryClient.setQueryData(["projects", page, limit], (prevData) => {
      prevData.data.projects = prevData.data.projects.filter(
        (project) => project._id !== projectId
      );
      prevData.data.amount = prevData.data.amount - 1;
      return prevData;
    });
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure to delete this project?",
      icon: <DeleteOutlined />,
      content: `Are you sure you want to delete project ${projectId}, this action can not be undone.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          deleteProject(projectId);
          removeProjectFromCache();
          succesNotification(
            "Project deleted successfully",
            `Project ${projectId} has been successfully deleted!`
          );
          resolve();
        }).catch(() =>
          errorNotification(
            "Error deleting project",
            `Project ${projectId} could not be deleted!`
          )
        );
      },
      onCancel() {},
    });
  };

  return <DeleteOutlined onClick={showConfirm} />;
}
