import React from "react";
import { Spin } from "antd";
import {
  LoadingOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { RoleRendering } from "../Shared/ConditionalRendering/react";

export default function SubmitPage({
  customStyle,
  completePage,
  isSubmitting,
  currentStep,
  setCurrentStep,
  maxSteps,
}) {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 25, color: "#D1D5DB" }} spin />
  );

  const upperPage = () => {
    if (currentStep <= maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const lowerPage = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="w-full flex flex-row justify-center mb-4 mt-4 space-x-4">
      <RoleRendering role="admin">
        <button
          className="px-10 py-5 rounded-lg text-lg font-semibold shadow-xl"
          style={{
            backgroundColor: customStyle.secondaryColorCard,
            color: customStyle.primaryColorCard,
          }}
          onClick={lowerPage}
        >
          <LeftCircleOutlined style={{ fontSize: "30px" }} />
        </button>
      </RoleRendering>
      {currentStep <= maxSteps && (
        <button
          className="px-20 py-5 rounded-lg text-lg font-semibold shadow-xl"
          onClick={completePage}
          style={{
            backgroundColor: customStyle.secondaryColorCard,
            color: customStyle.primaryColorCard,
          }}
        >
          <div className="space-x-4">
            {isSubmitting && <Spin indicator={antIcon} />} Volgende stap
          </div>
        </button>
      )}

      <RoleRendering role="admin">
        <button
          className="px-10 py-5 rounded-lg text-lg font-semibold shadow-xl"
          style={{
            backgroundColor: customStyle.secondaryColorCard,
            color: customStyle.primaryColorCard,
          }}
          onClick={upperPage}
        >
          <RightCircleOutlined style={{ fontSize: "30px" }} />
        </button>
      </RoleRendering>
    </div>
  );
}
