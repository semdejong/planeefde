import { useState } from "react";
import { Divider, Button } from "antd";

import AddFormItem from "./AddFormItem";
import TextSetter from "../MainPage/TextSetter";
import DeleteFormItem from "./DeleteFormItem";

export default function CreateFormMenu({ customForm, setCustomForm }) {
  let ran = 0;

  const [page, setPage] = useState(customForm.pages);
  const [customFields, setCustomFields] = useState(customForm.customFields);

  const handleOk = () => {
    setCustomForm({ pages: page, customFields: customFields });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Divider orientation="left" plain>
        <b className="text-lg">CUSTOM FORM</b>
      </Divider>
      <TextSetter
        title="Amount of pages"
        currentText={page}
        setCurrentText={setPage}
      />

      <Divider orientation="left" plain>
        <b className="text-lg">CUSTOM FORM</b>
      </Divider>
      <div className="flex flex-col w-full">
        {customFields &&
          customFields.map((customField) => {
            ran++;
            return (
              <>
                {" "}
                <Divider orientation="left" plain>
                  <b className="text-lg">
                    Form item {ran}
                    <AddFormItem
                      customFields={customFields}
                      setCustomFields={setCustomFields}
                      customField={customField}
                      update
                    />
                    <DeleteFormItem
                      customFields={customFields}
                      customField={customField}
                      setCustomFields={setCustomFields}
                    />
                  </b>
                </Divider>
                <>
                  {" "}
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="text-lg font-bold">Type</div>
                    <div>{customField.type}</div>
                  </div>
                  {customField.type !== "whiteSpace" ? (
                    <>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Name</div>
                        <div>{customField.name}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Label</div>
                        <div>{customField.label}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Placeholder</div>
                        <div>{customField.placeholder}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Is required</div>
                        <div>{customField.required.toString()}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Page</div>
                        <div>{customField.page}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Row</div>
                        <div>{customField.row}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Column</div>
                        <div>{customField.column}</div>
                      </div>{" "}
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Height</div>
                        <div>{customField.height}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Width</div>
                        <div>{customField.width}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Page</div>
                        <div>{customField.page}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Row</div>
                        <div>{customField.row}</div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="text-lg font-bold">Column</div>
                        <div>{customField.column}</div>
                      </div>
                    </>
                  )}
                </>
              </>
            );
          })}
      </div>
      <div className="flex flex-col items-end w-full justify-center p-4 space-y-4">
        <AddFormItem
          customFields={customFields}
          setCustomFields={setCustomFields}
        />

        <Button type="primary" onClick={handleOk}>
          Toepassen
        </Button>
      </div>
    </div>
  );
}
