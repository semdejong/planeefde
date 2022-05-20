import { useState } from "react";
import { Input, Button } from "antd";

export default function StepTwo({ setPassword, isLoadingPost }) {
  const [password, setPasswordLocal] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async () => {
    await setPassword(password);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-64 h-64 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-gray-800 font-semibold text-5xl">Setup</h1>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <Input.Password
            placeholder="password"
            value={password}
            onChange={(e) => setPasswordLocal(e.target.value)}
          />
          <Input.Password
            placeholder="repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {!isLoadingPost ? (
            <Button className="w-full" type="primary" onClick={handleSubmit}>
              Setup
            </Button>
          ) : (
            <Button className="w-full" type="primary" loading>
              Loading
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
