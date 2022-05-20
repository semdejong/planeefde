import { useState } from "react";

import CustomForm from "../../../CustomForm/CustomForm";

export default function Card({
  customStyle,
  customContent,
  customForm,
  leadInfo,
}) {
  const [currentStep, setCurrentStep] = useState(leadInfo.progress + 1);
  const steps = [1, 2, 3, 4];

  return (
    <>
      <div className="lg:hidden flex flex-col py-6 px-4 w-full mt-4">
        <h1
          className="text-2xl font-bold"
          style={{ width: "60%", color: customStyle.bodyTextColorMB }}
        >
          {customContent.cardTitle}
        </h1>
        <br />
        <h2
          className="-mt-3 text-lg"
          style={{ color: customStyle.bodyTextColorMB }}
        >
          {customContent.cardText}
        </h2>

        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: customStyle.primaryColorCard,
            minHeight: "55vh",
          }}
        >
          <div
            className="flex flex-row items-center justify-center w-full bg-red-300 font-semibold p-4"
            style={{
              height: "7%",
              color: customStyle.bodyTextColorMB,
              backgroundColor: customStyle.headerCardColorMB,
            }}
          >
            {customContent.cardHeaderTextMB}
          </div>

          <CustomForm
            customStyle={customStyle}
            customForm={customForm}
            leadInfo={leadInfo}
          />
        </div>
        <div
          className="w-full mt-6 flex flex-row items-center justify-center text-lg"
          style={{ color: customStyle.bodyTextColorMB }}
        >
          {customContent.bodyTextBottomMB}
        </div>
      </div>

      <div
        className="hidden lg:flex flex-col rounded-xl shadow-2xl p-12 mt-12 mb-12 h-full lg:w-1/2 xl:w-6/16 2xl:w-2/7"
        style={{
          minHeight: "67.7vh",

          backgroundColor: customStyle.primaryColorCard,
        }}
      >
        <h1
          className="text-4xl"
          style={{ color: customStyle.secondaryColorCard }}
        >
          <FormatText text={customContent.cardTitle} />
        </h1>
        <h2
          className="text-xl mb-6"
          style={{ color: customStyle.secondaryAccentColor }}
        >
          <FormatText text={customContent.cardText} />
        </h2>
        <CustomForm
          customStyle={customStyle}
          customForm={customForm}
          leadInfo={leadInfo}
        />
      </div>
    </>
  );
}

function FormatText({ text }) {
  const formattedText = text.split("<br>");
  return (
    <>
      {formattedText.map((item, index) => {
        return (
          <>
            {item} {index !== formattedText.length - 1 && <br />}
          </>
        );
      })}
    </>
  );
}
