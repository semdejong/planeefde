import { useState } from "react";
import { Input, Spin } from "antd";

export default function InlineEditor({
  value,
  id,
  updateValue,
  updateProperty,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const [isFetching, setIsFetching] = useState(false);

  const handleBlur = async () => {
    setIsEditing(false);
    setIsFetching(true);
    await updateValue(id, text, updateProperty);
    setIsFetching(false);
  };

  return (
    <>
      {!isFetching ? (
        <>
          {!isEditing ? (
            <div onClick={() => setIsEditing(true)}>{text}</div>
          ) : (
            <Input
              autoFocus
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
            />
          )}{" "}
        </>
      ) : (
        <Spin />
      )}
    </>
  );
}
