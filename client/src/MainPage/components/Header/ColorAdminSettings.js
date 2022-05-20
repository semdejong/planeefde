import React, { useState } from "react";
import { Divider, Button, Spin } from "antd";
import ColorSetter from "../../ColorSetter";

export default function ColorAdminSettings({
  setVisible,
  customStyle,
  setCustomStyle,
  isUploadingStyle,
}) {
  const [primaryColorHeader, setPrimaryColorHeader] = useState(
    customStyle.primaryColorHeader
  );
  const [secondaryColorHeader, setSecondaryColorHeader] = useState(
    customStyle.secondaryColorHeader
  );
  const [primaryColorCard, setPrimaryColorCard] = useState(
    customStyle.primaryColorCard
  );
  const [secondaryColorCard, setSecondaryColorCard] = useState(
    customStyle.secondaryColorCard
  );
  const [accentColor, setAccentColor] = useState(customStyle.accentColor);
  const [secondaryAccentColor, setSecondaryAccentColor] = useState(
    customStyle.secondaryAccentColor
  );
  const [headerCardColorMB, setHeaderCardColorMB] = useState(
    customStyle.headerCardColorMB
  );
  const [bodyTextColorMB, setBodyTextColorMB] = useState(
    customStyle.bodyTextColorMB
  );

  const handleOk = () => {
    setCustomStyle({
      primaryColorHeader: primaryColorHeader,
      secondaryColorHeader: secondaryColorHeader,
      primaryColorCard: primaryColorCard,
      secondaryColorCard: secondaryColorCard,
      accentColor: accentColor,
      secondaryAccentColor: secondaryAccentColor,
      headerCardColorMB: headerCardColorMB,
      bodyTextColorMB: bodyTextColorMB,
    });
  };

  const handleCancel = () => {
    setPrimaryColorHeader(customStyle.primaryColorHeader);
    setSecondaryColorHeader(customStyle.secondaryColorHeader);
    setPrimaryColorCard(customStyle.primaryColorCard);
    setSecondaryColorCard(customStyle.secondaryColorCard);
    setAccentColor(customStyle.accentColor);
    setSecondaryAccentColor(customStyle.secondaryAccentColor);
    setHeaderCardColorMB(customStyle.headerCardColorMb);
    setBodyTextColorMB(customStyle.bodyTextColorMB);
    setVisible(false);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Divider orientation="left" plain>
        <b className="text-lg">COLORS</b>
      </Divider>

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Primary Color Header"
        currentColor={primaryColorHeader}
        setColor={setPrimaryColorHeader}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Secondary Color Header"
        currentColor={secondaryColorHeader}
        setColor={setSecondaryColorHeader}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Primary Color Card"
        currentColor={primaryColorCard}
        setColor={setPrimaryColorCard}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Secondary Color Card"
        currentColor={secondaryColorCard}
        setColor={setSecondaryColorCard}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Accent Color"
        currentColor={accentColor}
        setColor={setAccentColor}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Secondary Accent Color"
        currentColor={secondaryAccentColor}
        setColor={setSecondaryAccentColor}
      />
      <Divider orientation="left" plain>
        <b className="text-lg">MOBILE</b>
      </Divider>
      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Card Header Color (mobile)"
        currentColor={headerCardColorMB}
        setColor={setHeaderCardColorMB}
      />

      {/* NEWWWW LINEEEEEE */}
      <ColorSetter
        title="Body text color (mobile)"
        currentColor={bodyTextColorMB}
        setColor={setBodyTextColorMB}
      />
      <Divider />
      <div className="flex flex-row w-full items-center justify-end px-4 space-x-3">
        <Button onClick={handleCancel}>Cancel</Button>
        {!isUploadingStyle ? (
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
