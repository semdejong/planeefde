import { Input, Button } from "antd";

export default function StepOne({ setStep, email }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-64 h-64 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-gray-800 font-semibold text-5xl">Setup</h1>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <Input disabled placeholder="email" value={email} />
          <Button className="w-full" type="primary" onClick={setStep}>
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
