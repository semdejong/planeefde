import React from "react";

export default function WhiteSpace({ field }) {
  return (
    <div
      style={{ height: `${field.height}px`, width: `${field.width}px` }}
    ></div>
  );
}
