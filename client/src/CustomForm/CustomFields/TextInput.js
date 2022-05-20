import React from "react";
import { Input } from "antd";

export default function TextInput({ field, formData, setFormData }) {
  const callback = (newvalue) => {
    setFormData({ ...formData, [field.name]: newvalue });
  };

  return (
    <div style={{ ...field.formItemStyle } || {}}>
      <p
        className="text-base font-semibold"
        style={{ ...field.labelStyle } || {}}
      >
        {field.label} {field.required && "*"}
      </p>
      <div>
        <Input
          value={formData[field.name]}
          onChange={(e) => callback(e.target.value)}
          placeholder={field.placeholder}
          style={{ ...field.inputStyle } || {}}
        />
      </div>
    </div>
  );
}
