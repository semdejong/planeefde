import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Spin, Table, Tooltip, Switch } from "antd";
import { FileOutlined } from "@ant-design/icons";

import AddProject from "./components/AddProject/react";
import { RoleRendering } from "../Shared/ConditionalRendering/react";
import NoAcces from "../NoAcces/react";
import { getProjects, updateProject } from "../API/projectApi";
import useNotifications from "../Shared/Notifications/useNotifications";
import InlineEditor from "../Shared/components/InlineEditor/react";
import DeleteProject from "./components/DeleteProject/react";

export default function Project() {
  const [page, setPage] = useState(1);
  const [limit, setLimt] = useState(10);
  const query = {};
  const { data, isLoading, refetch } = useQuery(
    ["projects", page, limit, query],
    () => getProjects(page, limit, query)
  );

  const changePagination = (pagination) => {
    setPage(pagination.current);
    setLimt(pagination.pageSize);
    refetch();
  };

  return (
    <RoleRendering role="admin" whenNot={<NoAcces />}>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <AddProject page={page} limit={limit} />
          <br />
          <br />
          <ProjectTable
            data={data.data.projects || {}}
            changePagination={changePagination}
            amountOfItems={data.data.amount || 0}
            page={page}
            limit={limit}
          />
        </>
      )}
    </RoleRendering>
  );
}

function ProjectTable({ data, changePagination, page, limit, amountOfItems }) {
  const queryClient = useQueryClient();
  const { succesNotification } = useNotifications();

  const updateProjects = async (id, updatedValue, updateProperty) => {
    const response = await updateProject({
      id: id,
      [updateProperty]: updatedValue,
    });
    if (response.status === 200) {
      queryClient.setQueryData(["projects", page, limit], (prevData) => {
        const newData = prevData.data.projects.map((project) => {
          if (project._id === id) {
            project[updateProperty] = response.data[updateProperty];
          }
          return project;
        });

        prevData.data.projects = newData;

        return prevData;
      });
      succesNotification(
        "Project has been updated",
        `Project ${id}'s ${updateProperty} has been set to ${response.data[updateProperty]}`
      );
    }
    return response;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Link to={`/${text}`}>{text}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <InlineEditor
          id={record._id}
          value={text}
          updateValue={updateProjects}
          updateProperty="name"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <InlineEditor
          id={record._id}
          value={text}
          updateValue={updateProjects}
          updateProperty="fullname"
        />
      ),
    },
    {
      title: "Recommended",
      dataIndex: "recommended",
      key: "recommended",
      render: (text, record) => <Switch checked={record.recommended} />,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex flex-row items-center space-x-4">
            <div>
              <Tooltip title="View leads" placement="top">
                <DeleteProject
                  projectId={record._id}
                  page={page}
                  limit={limit}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip title="View leads" placement="top">
                <Link to={`/admin/leads/${record._id}`}>
                  <FileOutlined />
                </Link>
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(obj) => obj._id}
      pagination={{ total: amountOfItems, current: page, pageSize: limit }}
      onChange={changePagination}
      scroll={{ x: 1300 }}
    ></Table>
  );
}
