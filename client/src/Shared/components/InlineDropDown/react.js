import { useState } from "react";
import { Select } from "antd";

export default function InlineDropDown({
  value,
  id,
  updateValue,
  valueProperty,
  loadOptions,
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {!isEditing ? (
        <div onClick={() => setIsEditing(true)}>{value}</div>
      ) : (
        <Select
          autoFocus
          defaultOpen
          defaultValue={value}
          onBlur={() => setIsEditing(false)}
        >
          {loadOptions().map((option) => {
            return <Select.Option key={option} value={option} />;
          })}
        </Select>
      )}
    </>
  );
}
