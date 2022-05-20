import React, { useState } from "react";
import { Divider, Button, Spin } from "antd";

import ImageSetter from "../../ImageSetter";

export default function HeaderAdminSettings({
  customContent,
  setCustomContent,
  isUploadingContent,
}) {
  const [background, setBackGroundImage] = useState(
    customContent.backgroundURl
  );
  const [backgroundMB, setBackGroundImageMB] = useState(
    customContent.backgroundURlMB
  );
  const handleOk = () => {
    setCustomContent({
      ...customContent,
      backgroundURl: background,
      backgroundURlMB: backgroundMB,
    });
  };
  const handleCancel = () => {};

  return (
    <div className="h-full w-full flex flex-col">
      <Divider orientation="left" plain>
        <b className="text-lg">BACKGROUND</b>
      </Divider>
      <ImageSetter
        title="Background"
        imageUrl={background}
        setImageUrl={setBackGroundImage}
        background
      />
      <Divider orientation="left" plain>
        <b className="text-lg">MOBILE</b>
      </Divider>
      <ImageSetter
        title="Background (mobile)"
        imageUrl={backgroundMB}
        setImageUrl={setBackGroundImageMB}
        backgroundMB
      />
      <Divider />
      <div className="flex flex-row w-full items-center justify-end px-4 space-x-3">
        <Button onClick={handleCancel}>Cancel</Button>
        {!isUploadingContent ? (
          <Button type="primary" onClick={handleOk}>
            Toepassen
          </Button>
        ) : (
          <Button type="primary">
            <Spin /> Loading
          </Button>
        )}
      </div>
    </div>
  );
}
