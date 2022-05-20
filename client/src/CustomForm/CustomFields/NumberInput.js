import React from "react";
import { InputNumber } from "antd";

export default function NumberInput({ field, formData, setFormData }) {
  const callback = (newvalue) => {
    setFormData({ ...formData, [field.name]: newvalue });
  };

  return (
    <div>
      <p className="text-base font-semibold">
        {field.label} {field.required && "*"}
      </p>
      <div className="w-1/2">
        <InputNumber
          value={formData[field.name]}
          onChange={(value) => callback(value)}
          placeholder={field.placeholder}
        />
      </div>
    </div>
  );
}
