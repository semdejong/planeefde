import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { getSetup, setPassword } from "../API/userApi";

export default function Setup() {
  const [step, setStep] = useState(1);
  const [loadingPost, setLoadingPost] = useState(false);
  let { id } = useParams();

  const { data, isLoading } = useQuery(["users", id], () => getSetup(id));

  const handleSetPassword = async (password) => {
    setLoadingPost(true);
    await setPassword(id, password);
    setLoadingPost(false);
  };

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          {data.data.email ? (
            <>
              {step === 1 ? (
                <StepOne setStep={setStep} email={data.data.email} />
              ) : (
                <StepTwo
                  setPassword={handleSetPassword}
                  isLoadingPost={loadingPost}
                />
              )}
            </>
          ) : (
            <div className="h-full w-full flex flex-col justify-center items-center">
              <h1 className="text-5xl font-bold">Setup token not found</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
