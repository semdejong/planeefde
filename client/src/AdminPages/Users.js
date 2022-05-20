import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Spin, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import AddUser from "./components/AddUser/react";
import { RoleRendering } from "../Shared/ConditionalRendering/react";
import NoAcces from "../NoAcces/react";
import { getUsers, updateUser } from "../API/userApi";
import InlineEditor from "../Shared/components/InlineEditor/react";
import InlineDropDown from "../Shared/components/InlineDropDown/react";
import useNotifications from "../Shared/Notifications/useNotifications";

export default function Users() {
  const [page, setPage] = useState(1);
  const [limit, setLimt] = useState(10);
  const { data, isLoading, refetch } = useQuery(["users", page, limit], () =>
    getUsers(page, limit)
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
          <AddUser page={page} limit={limit} />
          <br />
          <br />
          <UserTable
            data={data.data.users || {}}
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

function UserTable({ data, changePagination, page, limit, amountOfItems }) {
  const queryClient = useQueryClient();
  const { succesNotification } = useNotifications();

  const updateUsers = async (id, updatedValue, updateProperty) => {
    const response = await updateUser({
      id: id,
      [updateProperty]: updatedValue,
    });
    if (response.status === 200) {
      queryClient.setQueryData(["users", page, limit], (prevData) => {
        const newData = prevData.data.users.map((user) => {
          if (user._id === id) {
            user[updateProperty] = response.data[updateProperty];
          }
          return user;
        });

        prevData.data.users = newData;

        return prevData;
      });
      succesNotification(
        "User has been updated",
        `User ${id}'s ${updateProperty} has been set to ${response.data[updateProperty]}`
      );
    }
    return response;
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <InlineEditor
          id={record._id}
          value={text}
          updateValue={updateUsers}
          updateProperty="username"
        />
      ),
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (text, record) => (
        <InlineEditor
          id={record._id}
          value={text}
          updateValue={updateUsers}
          updateProperty="fullname"
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => (
        <InlineEditor
          id={record._id}
          value={text}
          updateValue={updateUsers}
          updateProperty="email"
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <InlineDropDown
          id={record._id}
          value={text}
          updateValue={updateUsers}
          updateProperty="role"
        />
      ),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <div className="flex flex-row h-full w-full items-center justify-center">
          {record.isActive ? (
            <CheckCircleOutlined style={{ fontSize: "25px", color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ fontSize: "25px", color: "red" }} />
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(obj) => obj.id}
      pagination={{ total: amountOfItems, current: page, pageSize: limit }}
      scroll={{ x: 1300 }}
      onChange={changePagination}
    />
  );
}
