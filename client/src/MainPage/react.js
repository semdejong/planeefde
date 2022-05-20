import { useParams } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Header from "./components/Header/react";
import Body from "./components/Body/react";
import useCustomStyle from "./hooks/useCustomStyle";
import useCustomContent from "./hooks/useCustomContent";
import useCustomForm from "../CustomForm/hooks/useCustomForm";

export default function MainPage() {
  const { id } = useParams();

  const {
    customStyle,
    setCustomStyle,
    isUploadingStyle,
    isLoading,
    projectName,
  } = useCustomStyle(id);
  const { customContent, setCustomContent, contentIsLoading } =
    useCustomContent(id);

  const {
    customForm,
    setCustomForm,
    isLoading: formIsLoading,
    leadInfo,
  } = useCustomForm(id);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 100, color: "#D1D5DB" }} spin />
  );

    if(id === 'undefined'){
      return <div>Project does not exists.</div>
    }

  return (
    <div className="-m-10 h-screen w-screen flex flex-col test">
      {isLoading || contentIsLoading || formIsLoading || !leadInfo ? (
        <div className="flex flex-row h-full w-full justify-center items-center">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <>
          {" "}
          <Header
            customStyle={customStyle}
            setCustomStyle={setCustomStyle}
            isUploadingStyle={isUploadingStyle}
            customContent={customContent}
            setCustomContent={setCustomContent}
            customForm={customForm}
            setCustomForm={setCustomForm}
            name={projectName}
          />
          <Body
            customStyle={customStyle}
            customContent={customContent}
            customForm={customForm}
            leadInfo={leadInfo}
          />
        </>
      )}
    </div>
  );
}
