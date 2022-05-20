import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteFormItem({
  customFields,
  setCustomFields,
  customField,
}) {
  const handleDelete = () => {
    const newFields = customFields.filter(
      (field) => field.name !== customField.name
    );
    setCustomFields(newFields);
  };

  const showConfirm = () => {
    Modal.confirm({
      title: "Are you sure to delete this field?",
      icon: <DeleteOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete();
      },
      onCancel() {},
    });
  };

  return <DeleteOutlined onClick={showConfirm} />;
}
