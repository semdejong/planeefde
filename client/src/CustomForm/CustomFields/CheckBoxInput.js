import React, { useEffect } from "react";
import { Checkbox } from "antd";

export default function CheckBoxInput({ field, formData, setFormData }) {
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
        <Checkbox
          checked={formData[field.name] || false}
          onChange={(e) => callback(e.target.checked)}
          placeholder={field.placeholder}
        />
      </div>
    </div>
  );
}
