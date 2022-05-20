import { useState } from "react";

import CustomFields from "./CustomFields/CustomFields";
import RenderPage from "./RenderPage";
import SubmitPage from "./SubmitPage";
import { updateLead } from "../API/leadApi";

export default function CustomForm({ customStyle, customForm, leadInfo }) {
  const [currentStep, setCurrentStep] = useState(leadInfo.progress + 1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldsForPage = customForm.customFields
    .filter((field) => field.page === currentStep)
    .sort((a, b) => a.row - b.row);

  const fieldNames = [];

  const fieldsArray = [];

  for (const field of fieldsForPage) {
    const newArr = [];

    if (!fieldNames.includes(field.name)) {
      fieldNames.push(field.name);
      newArr.push(field);
    }

    for (const z in fieldsForPage) {
      if (fieldsForPage[z].row === field.row) {
        if (!fieldNames.includes(fieldsForPage[z].name)) {
          fieldNames.push(fieldsForPage[z].name);
          newArr.push(fieldsForPage[z]);
        }
      }
    }

    fieldsArray.push(newArr);
  }

  const nextPage = () => {
    setCurrentStep(currentStep + 1);
  };

  const completePage = async () => {
    let isError = false;
    setError(null);
    fieldsForPage.forEach((field) => {
      if (field.required && !formData[field.name]) {
        setError(`${field.label} is verplicht`);
        isError = true;
        return;
      }
      if (
        (field.type === "checkboxInput" || field.type === "switchInput") &&
        !formData[field.name]
      ) {
        setError(`${field.label} is verplicht`);
        isError = true;
        return;
      }
    });

    if (isError) return;
    setIsSubmitting(true);
    const response = await updateLead(leadInfo._id, formData, currentStep);

    setIsSubmitting(false);
    if (response.status === 200) {
      nextPage();
    }
  };

  if (customForm.pages < currentStep) {
    return (
      <>
        <RenderPage
          customForm={customForm}
          customStyle={customStyle}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          error={error}
        />
        Bedankt voor het invullen, een medewerker neemt zo spoedig mogelijk
        contact met u op.
        <SubmitPage
          customStyle={customStyle}
          completePage={completePage}
          isSubmitting={isSubmitting}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          maxSteps={customForm.pages}
        />
      </>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between lg:p-0 p-4">
      <div>
        <RenderPage
          customForm={customForm}
          customStyle={customStyle}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          error={error}
        />
        {fieldsArray.map((fieldArray, index) => {
          return (
            <>
              {fieldsArray.length > 0 && (
                <div className="flex flex-row items-center mt-3">
                  {fieldArray
                    .sort((a, b) => a.column - b.column)
                    .map((field) => {
                      return (
                        <CustomFields
                          key={field.name}
                          field={field}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      );
                    })}
                </div>
              )}
            </>
          );
        })}
      </div>

      <SubmitPage
        customStyle={customStyle}
        completePage={completePage}
        isSubmitting={isSubmitting}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        maxSteps={customForm.pages}
      />
    </div>
  );
}
