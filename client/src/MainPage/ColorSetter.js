import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Input } from "antd";

export default function ColorSetter({ title, currentColor, setColor }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div className="flex flex-row justify-between items-center px-4 py-2">
      <div>
        <b>{title}</b>
      </div>
      <div className="flex flex-row items-center justify-centers">
        <Input
          value={currentColor}
          onChange={(e) => setColor(e.target.value)}
        />
        <div>
          <div
            className="h-6 w-8 border-2 border-gray-500 ml-4 rounded"
            style={{ backgroundColor: currentColor, cursor: "pointer" }}
            onClick={handleClick}
          ></div>
          {displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={handleClose} />
              <SketchPicker
                color={currentColor}
                onChange={(color) => setColor(color.hex)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
