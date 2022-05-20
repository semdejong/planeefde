import React from "react";
import { Input } from "antd";

export default function TextInput({ field, formData, setFormData }) {
  const callback = (newvalue) => {
    setFormData({ ...formData, [field.name]: newvalue });
  };

  return (
    <div>
      <p className="text-base font-semibold">
        {field.label} {field.required && "*"}
      </p>
      <div className="w-1/2">
        <Input.TextArea
          rows={4}
          value={formData[field.name]}
          onChange={(e) => callback(e.target.value)}
          placeholder={field.placeholder}
        />
      </div>
    </div>
  );
}
