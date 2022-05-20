import { useState } from "react";
import { useQuery } from "react-query";
import { useTransition, animated } from "react-spring";
import { Button, Collapse, Tabs, Spin } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import Permissions from "./Permissions";
import { useLoggedIn } from "../../Context/LoggedInContext";
import { ping } from "../../API/testApi";

export default function SidePanel() {
  const [sidePanel, setSidePanel] = useState(false);
  const { loggedIn } = useLoggedIn();
  const transition = useTransition(sidePanel, {
    from: { x: 100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 100, opacity: 0 },
  });

  return (
    <>
      {loggedIn ? (
        <>
          {transition((style, item) =>
            sidePanel && item ? (
              <animated.div
                className="w-1/2 bg-gray-200 h-full shadow-xl flex flex-col p-4"
                style={style}
              >
                <SidePanelOpen setSidePanel={setSidePanel} />
              </animated.div>
            ) : (
              ""
            )
          )}

          {!sidePanel && <SidePanelClosed setSidePanel={setSidePanel} />}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

function SidePanelOpen({ setSidePanel }) {
  return (
    <>
      <div className="h-24 w-full justify-between flex flex-row">
        <h1 className="text-gray-800 font-semibold text-xl">Side Panel</h1>
        <Button shape="circle" size="large" onClick={() => setSidePanel(false)}>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <MenuUnfoldOutlined />
          </div>
        </Button>
      </div>
      <div>
        <Collapse>
          <Collapse.Panel header="Test API" key="1">
            <Tabs
              defaultActiveKey="1"
              tabPosition={"left"}
              style={{ height: 220 }}
            >
              <Tabs.TabPane tab={"ping"} key={1}>
                <PongTab />
              </Tabs.TabPane>
            </Tabs>
          </Collapse.Panel>
        </Collapse>
        <Permissions />
      </div>
    </>
  );
}

function SidePanelClosed({ setSidePanel }) {
  return (
    <Button
      className="mt-4 mr-4 shadow-2xl"
      onClick={() => setSidePanel(true)}
      shape="circle"
      size="large"
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <MenuFoldOutlined />
      </div>
    </Button>
  );
}

function PongTab() {
  const { data, isLoading, refetch } = useQuery("ping", ping, {
    refetchOnWindowFocus: true,
    enabled: false,
  });

  const fetchAPI = async () => {
    refetch();
  };

  return (
    <div className="w-full h-64 flex flex-row items-center justify-between">
      <div className="h-full w-1/2 border-r border-2xl flex flex-col items-center justify-center">
        <Button onClick={fetchAPI} type="primary">
          Fetch
        </Button>
      </div>
      <div className="h-full w-1/2  flex flex-col items-center justify-center">
        {isLoading ? <Spin /> : ""}
        {data ? data.message : "no results"}
      </div>
    </div>
  );
}
