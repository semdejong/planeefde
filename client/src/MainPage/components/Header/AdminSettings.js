import React, { useState } from "react";
import { Modal, Tabs } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import ColorAdminSettings from "./ColorAdminSettings";
import HeaderAdminSettings from "./HeaderAdminSettings";
import MainAdminSettings from "./MainAdminSettings";
import BackgroundAdminSettings from "./BackgroundAdminSettings";
import CreateFormMenu from "../../../CustomForm/CreateFormMenu";
import { RoleRendering } from "../../../Shared/ConditionalRendering/react";

export default function AdminSettings({
  customStyle,
  setCustomStyle,
  isUploadingStyle,
  customContent,
  setCustomContent,
  customForm,
  setCustomForm,
  name,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <RoleRendering role="admin">
      <div onClick={() => setVisible(true)} style={{ cursor: "pointer" }}>
        <SettingOutlined style={{ fontSize: "25px" }} />
      </div>

      <Modal
        title={"Page settings - " + name}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <div className="flex flex-col space-y-4">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="General" key="1">
              This will be the general settings page
            </Tabs.TabPane>
            <Tabs.TabPane tab="Global Style" key="2">
              <ColorAdminSettings
                setVisible={setVisible}
                customStyle={customStyle}
                setCustomStyle={setCustomStyle}
                isUploadingStyle={isUploadingStyle}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Header" key="3">
              <HeaderAdminSettings
                customContent={customContent}
                setCustomContent={setCustomContent}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Main" key="4">
              <MainAdminSettings
                customContent={customContent}
                setCustomContent={setCustomContent}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Background" key="5">
              <BackgroundAdminSettings
                customContent={customContent}
                setCustomContent={setCustomContent}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Form" key="6">
              <CreateFormMenu
                customForm={customForm}
                setCustomForm={setCustomForm}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </RoleRendering>
  );
}
