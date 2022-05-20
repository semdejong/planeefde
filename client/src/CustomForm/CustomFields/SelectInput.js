import React from "react";
import { Select } from "antd";

export default function SwitchInput({ field, formData, setFormData }) {
  const callback = (newvalue) => {
    setFormData({ ...formData, [field.name]: newvalue });
  };

  const options = field.options.split(",");

  return (
    <div>
      <p className="text-base font-semibold">
        {field.label} {field.required && "*"}
      </p>
      <div className="w-1/2">
        <Select
          onChange={(value) => callback(value)}
          placeholder={field.placeholder}
        >
          {options.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
}
