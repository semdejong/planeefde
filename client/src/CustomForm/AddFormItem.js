import { useState, useEffect } from "react";
import { Button, Popover, Select, Input, Switch, InputNumber } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  PlusOutlined,
  EditOutlined,
  LineHeightOutlined,
} from "@ant-design/icons";

export default function AddFormItem({
  customFields,
  setCustomFields,
  customField,
  update,
}) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <Popover
      trigger="click"
      placement="bottom"
      arrowPointAtCenter
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={
        <AddFormItemPopOver
          customFields={customFields}
          setCustomFields={setCustomFields}
          customField={customField}
          update={update}
          setVisible={setVisible}
        />
      }
    >
      {!update ? (
        <Button type="primary" shape="circle" size="large">
          <div className="w-full h-full flex flex-row justify-center items-center">
            <PlusOutlined style={{ color: "white", fontSize: "25px" }} />
          </div>
        </Button>
      ) : (
        <EditOutlined />
      )}
    </Popover>
  );
}

function AddFormItemPopOver({
  customFields,
  setCustomFields,
  customField,
  update,
  setVisible,
}) {
  const inputTypes = [
    { value: "textInput", label: "Text Input" },
    { value: "numberInput", label: "Number Input" },
    { value: "selectInput", label: "Select Input" },
    { value: "switchInput", label: "Switch Input" },
    { value: "textAreaInput", label: "Text Area Input" },
    { value: "checkboxInput", label: "Checkbox Input" },
    { value: "radioInput", label: "Radio Input" },
    { value: "whiteSpace", label: "White Space" },
  ];

  const [error, setError] = useState(null);

  const [type, setType] = useState(
    update ? customField.type : inputTypes[0].value
  );
  const [options, setOptions] = useState(update ? customField.options : null);
  const [name, setName] = useState(update ? customField.name : "");
  const [label, setLabel] = useState(update ? customField.label : "");
  const [placeholder, setPlaceholder] = useState(
    update ? customField.placeholder : ""
  );
  const [required, setIsRequired] = useState(
    update ? customField.required : false
  );

  const [height, setHeight] = useState(update ? customField.height : 20);
  const [width, setWidth] = useState(update ? customField.width : 20);

  const [page, setPage] = useState(update ? customField.page : 1);
  const [row, setRow] = useState(update ? customField.row : 1);
  const [col, setCol] = useState(update ? customField.column : 1);
  const [formItemStyle, setFormItemStyle] = useState(
    update && customField.formItemStyle
      ? JSON.stringify(customField.formItemStyle)
      : "{}"
  );
  const [inputStyle, setInputStyle] = useState(
    update && customField.inputStyle
      ? JSON.stringify(customField.inputStyle)
      : "{}"
  );
  const [labelStyle, setLabelStyle] = useState(
    update && customField.labelStyle
      ? JSON.stringify(customField.labelStyle)
      : "{}"
  );

  const addFormItem = () => {
    if (error) return;

    var jsonStrIS = inputStyle.replace(
      /(\w+:)|(\w+ :)/g,
      function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      }
    );
    var jsonStrFS = formItemStyle.replace(
      /(\w+:)|(\w+ :)/g,
      function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      }
    );
    var jsonStrLS = labelStyle.replace(
      /(\w+:)|(\w+ :)/g,
      function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      }
    );

    let newFormItem = {
      type,
      name,
      label,
      placeholder,
      required,
      page,
      row,
      column: col,
      formItemStyle: JSON.parse(jsonStrFS),
      inputStyle: JSON.parse(jsonStrIS),
      labelStyle: JSON.parse(jsonStrLS),
    };
    if (type === "radioInput" || type === "selectInput") {
      newFormItem.options = options;
    }
    if (type === "whiteSpace") {
      newFormItem = {
        name: uuidv4(),
        type,
        required: false,
        height,
        width,
        page,
        row,
        column: col,
      };
    }
    if (update) {
      const updateFormItems = customFields.map((CF) => {
        if (CF.name === customField.name) {
          return newFormItem;
        }
        return CF;
      });
      setCustomFields(updateFormItems);
    } else {
      setCustomFields([...customFields, newFormItem]);
    }
    setVisible(false);
  };

  useEffect(() => {
    let noError = true;

    if (update) {
      if (
        customFields.some(
          (field) =>
            field.name === name &&
            JSON.stringify(field) !== JSON.stringify(customField)
        )
      ) {
        noError = false;
        setError("Name already exists");
      }
    } else {
      if (customFields.some((field) => field.name === name)) {
        noError = false;
        setError("Name already exists");
      }
    }
    if (
      customFields.some(
        (field) =>
          field.page === page &&
          field.column === col &&
          field.row === row &&
          field.name !== name
      )
    ) {
      noError = false;
      setError("There is already an item on this spot.");
    }

    if (noError) {
      setError(null);
    }
  }, [name, row, col]);

  if (type === "whiteSpace") {
    return (
      <div className="flex flex-col space-y-4 w-64">
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex flex-col">
          <p>Type</p>
          <Select onChange={(value) => setType(value)} placeholder="Field type">
            {inputTypes.map((inputType) => {
              return (
                <Select.Option value={inputType.value}>
                  {inputType.label}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p>Height</p>
            <div className="w-12">
              <InputNumber
                value={height}
                onChange={(value) => setHeight(value)}
              ></InputNumber>
            </div>
          </div>
          <div className="flex flex-col">
            <p>Width</p>
            <div className="w-12 mr-10">
              <InputNumber
                value={width}
                onChange={(value) => setWidth(value)}
              ></InputNumber>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p>Page</p>
          <div className="w-12">
            <InputNumber
              value={page}
              onChange={(value) => setPage(value)}
            ></InputNumber>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p>Row</p>
            <div className="w-12">
              <InputNumber
                value={row}
                onChange={(value) => setRow(value)}
              ></InputNumber>
            </div>
          </div>
          <div className="flex flex-col">
            <p>Column</p>
            <div className="w-12 mr-10">
              <InputNumber
                value={col}
                onChange={(value) => setCol(value)}
              ></InputNumber>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end px-4">
          <Button
            type="primary"
            onClick={addFormItem}
            style={{ width: "100%" }}
            disabled={error ? true : false}
          >
            {update ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <p>Type</p>
        <Select onChange={(value) => setType(value)} placeholder="Field type">
          {inputTypes.map((inputType) => {
            return (
              <Select.Option value={inputType.value}>
                {inputType.label}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      {type === "selectInput" || type === "radioInput" ? (
        <div className="flex flex-col">
          <p>Options (comma seperated)</p>
          <Input
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Name"
          ></Input>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col">
        <p>Name</p>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        ></Input>
      </div>
      <div className="flex flex-col ">
        <p>Label</p>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
        ></Input>
      </div>
      <div className="flex flex-col">
        <p>Placeholder</p>
        <Input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Placeholder"
        ></Input>
      </div>
      <div className="flex flex-col">
        <p>Required</p>
        <div className="w-12">
          <Switch
            checked={required}
            onChange={(checked) => setIsRequired(checked)}
          ></Switch>
        </div>
      </div>{" "}
      <div className="flex flex-col">
        <p>Page</p>
        <div className="w-12">
          <InputNumber
            value={page}
            onChange={(value) => setPage(value)}
          ></InputNumber>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>Row</p>
          <div className="w-12">
            <InputNumber
              value={row}
              onChange={(value) => setRow(value)}
            ></InputNumber>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Column</p>
          <div className="w-12 mr-10">
            <InputNumber
              value={col}
              onChange={(value) => setCol(value)}
            ></InputNumber>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-3">
        <div className="flex flex-col">
          <p>Form item style</p>
          <Input
            value={formItemStyle}
            onChange={(e) => setFormItemStyle(e.target.value)}
            placeholder="form style"
          ></Input>
        </div>
        <div className="flex flex-col">
          <p>Label style</p>
          <Input
            value={labelStyle}
            onChange={(e) => setLabelStyle(e.target.value)}
            placeholder="label style"
          ></Input>
        </div>
        <div className="flex flex-col">
          <p>Input style</p>
          <Input
            value={inputStyle}
            onChange={(e) => setInputStyle(e.target.value)}
            placeholder="input style"
          ></Input>
        </div>
      </div>
      <div className="flex flex-row justify-end px-4">
        <Button
          type="primary"
          onClick={addFormItem}
          style={{ width: "100%" }}
          disabled={error ? true : false}
        >
          {update ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  );
}
