import React, { useState } from "react";
import { Divider, Button, Spin } from "antd";

import ImageSetter from "../../ImageSetter";
import TextSetter from "../../TextSetter";

export default function MainAdminSettings({
  customContent,
  setCustomContent,
  isUploadingContent,
}) {
  const [cardTitle, setCardTitle] = useState(customContent.cardTitle);
  const [cardText, setCardText] = useState(customContent.cardText);
  const [cardHeaderTextMB, setCardHeaderText] = useState(
    customContent.cardHeaderTextMB
  );
  const [bodyTextBottomMB, setBodyTextBottomMB] = useState(
    customContent.bodyTextBottomMB
  );
  const handleOk = () => {
    setCustomContent({
      ...customContent,
      cardTitle,
      cardText,
      cardHeaderTextMB,
      bodyTextBottomMB,
    });
  };
  const handleCancel = () => {};

  return (
    <div className="h-full w-full flex flex-col">
      <Divider orientation="left" plain>
        <b className="text-lg">CONTENT</b>
      </Divider>
      <TextSetter
        title="Card Title"
        currentText={cardTitle}
        setCurrentText={setCardTitle}
      />
      <TextSetter
        title="Card Text"
        currentText={cardText}
        setCurrentText={setCardText}
      />
      <Divider orientation="left" plain>
        <b className="text-lg">MOBILE</b>
      </Divider>
      <TextSetter
        title="Card Header Text (mobile)"
        currentText={cardHeaderTextMB}
        setCurrentText={setCardHeaderText}
      />
      <TextSetter
        title="Body Text bottom (mobile)"
        currentText={bodyTextBottomMB}
        setCurrentText={setBodyTextBottomMB}
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
