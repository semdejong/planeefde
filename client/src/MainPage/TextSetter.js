import { Input } from "antd";

export default function TextSetter({ title, currentText, setCurrentText }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <div>
          <b>{title}</b>
        </div>
        <div className="flex flex-row items-center justify-centers">
          <Input
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
