import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Button } from "antd";
import {
  SettingOutlined,
  UserOutlined,
  LockOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";

import { RoleRendering } from "../ConditionalRendering/react";

export default function AdminSettings() {
  const [hovering, setHovering] = useState(false);

  return (
    <RoleRendering role={"admin"}>
      <Popover
        placement="bottom"
        title={"Admin settings"}
        content={<PopOverBody />}
        trigger="click"
      >
        <SettingOutlined
          spin={hovering}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{ fontSize: "25px" }}
        />
      </Popover>
    </RoleRendering>
  );
}

function PopOverBody() {
  const adminMenu = [
    {
      name: "Users",
      icon: <UserOutlined />,
      link: "/admin/users",
    },
    {
      name: "Projects",
      icon: <FolderOpenOutlined />,
      link: "/admin/projects",
    },
    {
      name: "Leads",
      icon: <FileOutlined />,
      link: "/admin/leads",
    },
    {
      name: "Roles & Permissions",
      icon: <LockOutlined />,
      link: "/admin/perms",
    },
  ];

  return (
    <div className="flex flex-col space-y-2">
      {adminMenu.map((adminPage) => {
        return (
          <Link key={adminPage.link} to={adminPage.link}>
            <Button block>
              <div className="flex flex-row items-center justify-center space-x-2">
                <div className="flex flex-row items-center">
                  {adminPage.icon}
                </div>
                <div>{adminPage.name}</div>
              </div>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
