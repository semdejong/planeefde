import React from "react";
import { Radio } from "antd";

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
        <Radio.Group
          onChange={(e) => callback(e.target.value)}
          placeholder={field.placeholder}
        >
          {options.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
