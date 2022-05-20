import React, { useEffect } from "react";
import { Switch } from "antd";

export default function SwitchInput({ field, formData, setFormData }) {
  const callback = (newvalue) => {
    setFormData({ ...formData, [field.name]: newvalue });
  };

  useEffect(() => {
    if (!formData.hasOwnProperty(field.name)) {
      setFormData({ ...formData, [field.name]: false });
    }
  }, []);

  return (
    <div>
      <p className="text-base font-semibold">
        {field.label} {field.required && "*"}
      </p>
      <div className="w-1/2">
        <Switch
          checked={formData[field.name]}
          onChange={(value) => callback(value)}
          placeholder={field.placeholder}
        />
      </div>
    </div>
  );
}
