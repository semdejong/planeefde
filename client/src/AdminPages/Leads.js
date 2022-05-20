import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Spin, Table } from "antd";

import { getLeads } from "../API/leadApi";
import { RoleRendering } from "../Shared/ConditionalRendering/react";
import NoAcces from "../NoAcces/react";
import { getProjects } from "../API/projectApi";

export default function Leads() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimt] = useState(10);
  const query = { project: id };
  const { data, isLoading, refetch } = useQuery(
    ["leads" + id, page, limit, query],
    () => getLeads(page, limit, query)
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
          <LeadsTable
            tableData={data.data.leads || {}}
            changePagination={changePagination}
            amountOfItems={data.data.amount || 0}
            page={page}
            limit={limit}
            id={id}
          />
        </>
      )}
    </RoleRendering>
  );
}

function LeadsTable({
  tableData,
  changePagination,
  page,
  limit,
  amountOfItems,
  id,
}) {
  const query = id ? { _id: id } : {};
  //Load in the columns
  const { data, isLoading, refetch } = useQuery(
    ["projects", page, limit, query],
    () => getProjects(page, limit, query)
  );

  console.log(999, data);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      width: 100,
      fixed: "left",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      width: 100,
      fixed: "left",
      filters: data
        ? data.data.projects.map((project) => ({
            text: project.name,
            value: project._id,
          })) || []
        : [],
      onFilter: (value, record) => record.project === value,
      render: (text) => <Link to={`/${text}`}>{text}</Link>,
    },
    {
      title: "Ip Adress",
      dataIndex: "IPAdress",
      key: "IPAdress",
      width: 100,
      fixed: "left",
    },
  ];

  const dataSource = tableData.map((lead) => {
    console.log(lead, 9239, { ...lead, ...lead.data });
    return { ...lead, ...lead.data };
  });

  if (!isLoading) {
    data.data.projects.map((project) => {
      project.customFields.map((field) => {
        columns.push({
          title: field.name,
          dataIndex: field.name,
          key: field.name,
        });
      });
    });
  }

  columns.push({
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 100,
    fixed: "right",
  });

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={(obj) => obj._id}
            pagination={{
              total: amountOfItems,
              current: page,
              pageSize: limit,
            }}
            scroll={{ x: 1300, y: 500 }}
            onChange={changePagination}
          ></Table>
        </>
      )}
    </>
  );
}
