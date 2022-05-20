import React from "react";

export default function RenderPage({
  customForm,
  customStyle,
  currentStep,
  setCurrentStep,
  error,
}) {
  const steps = [];

  for (let i = 0; i < customForm.pages; i++) {
    steps.push(i + 1);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <div className="lg:mt-0 mt-6 flex flex-row items-center justify-center ">
          {steps.map((step) => {
            return (
              <>
                <div
                  className="h-8 w-8 lg:h-10 lg:w-10 rounded-full shadow-lg flex flex-row items-center justify-center border border-gray-400 text-white"
                  style={
                    currentStep === step
                      ? {
                          backgroundColor: customStyle.secondaryColorCard,
                          color: customStyle.primaryColorCard,
                        }
                      : {
                          color: customStyle.secondaryColorCard,
                          backgroundColor: customStyle.primaryColorCard,
                        }
                  }
                >
                  {step}
                </div>
                <div className="h-full flex flex-row items-center justify-center">
                  {steps.length !== step && (
                    <div
                      className="flex flex-row h-1 w-10 items-center"
                      style={
                        currentStep >= step + 1
                          ? { backgroundColor: customStyle.secondaryColorCard }
                          : {}
                      }
                    ></div>
                  )}
                </div>
              </>
            );
          })}{" "}
        </div>
      </div>
      <div className=" flex flex-row justify-center mt-4 ">
        <h1
          className="lg:text-3xl text-xl text-center font-semibold"
          style={{ color: customStyle.accentColor }}
        >
          Vul het formulier in en bekijk wat jij jaarlijks kunt besparen!
        </h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
