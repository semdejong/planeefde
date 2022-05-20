import React from "react";
import NumberInput from "./NumberInput";
import SwitchInput from "./SwitchInput";
import CheckBoxInput from "./CheckBoxInput";
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import RadioInput from "./RadioInput";

import TextInput from "./TextInput";
import WhiteSpace from "./WhiteSpace";

export default function CustomFields({ field, formData, setFormData }) {
  console.log(field);
  return (
    <div className="flex flex-col">
      {field.type === "textInput" && (
        <TextInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "numberInput" && (
        <NumberInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "switchInput" && (
        <SwitchInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "checkboxInput" && (
        <CheckBoxInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "textAreaInput" && (
        <TextAreaInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "selectInput" && (
        <SelectInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "radioInput" && (
        <RadioInput
          field={field}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {field.type === "whiteSpace" && <WhiteSpace field={field} />}
    </div>
  );
}
