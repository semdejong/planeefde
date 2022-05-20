import { Collapse, Tabs, Button } from "antd";
import { RoleRendering } from "../ConditionalRendering/react";

import { useUserContext } from "../../Context/UserContext";
import { Username, Fullname, Email, Role } from "../UserDetails";

export default function Permissions() {
  const { refetch } = useUserContext();

  return (
    <RoleRendering role="admin">
      <Collapse>
        <Collapse.Panel header="User information" key="1">
          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: 220 }}
          >
            <Tabs.TabPane tab={"User details"} key={1}>
              Username: <Username />
              <br />
              Fullname: <Fullname />
              <br />
              Email: <Email />
            </Tabs.TabPane>
            <Tabs.TabPane tab={"Role"} key={2}>
              Role: <Role />
            </Tabs.TabPane>
            <Tabs.TabPane tab={"Permissions"} key={3}>
              Nice
            </Tabs.TabPane>
            <Tabs.TabPane tab={"Refetch"} key={4}>
              <Button type="primary" shape="round" onClick={refetch}>
                Refetch
              </Button>
            </Tabs.TabPane>
          </Tabs>
        </Collapse.Panel>
      </Collapse>
    </RoleRendering>
  );
}
