import { Rate } from "antd";
import {
  EyeOutlined,
  EuroCircleOutlined,
  TeamOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import AdminSettings from "./AdminSettings";

export default function Header({
  customStyle,
  setCustomStyle,
  isUploadingStyle,
  customContent,
  setCustomContent,
  customForm,
  setCustomForm,
  name,
}) {
  const headerIcons = [
    {
      image: customContent.firstFeatureImage,
      Title: <FormatText text={customContent.firstFeatureHeader} />,
      description: <FormatText text={customContent.firstFeatureText} />,
    },
    {
      image: customContent.secondFeatureImage,
      Title: <FormatText text={customContent.secondFeatureText} />,
      description: <FormatText text={customContent.secondFeatureText} />,
    },
    {
      image: customContent.thirdFeatureImage,
      Title: <FormatText text={customContent.thirdFeatureHeader} />,
      description: <FormatText text={customContent.thirdFeatureText} />,
    },
  ];

  const displayData = {
    ...customContent,
  };

  return (
    <>
      <div
        className="flex flex-row lg:hidden items-center justify-between h-24 w-full"
        style={{ backgroundColor: customStyle.primaryColorHeader }}
      >
        <div className="px-4">
          <img className="max-h-16" src={displayData.logo}></img>
        </div>

        <div className="w-2/5">
          <div className="flex flex-row items-center w-full">
            <div className="flex flex-row items-center w-1/4 ">
              <Rate
                allowHalf
                disabled
                value={displayData.rating / 2}
                className="w-1/2"
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              />
            </div>
          </div>
          <p
            className=" flex flex-row items-center"
            style={{ color: customStyle.secondaryAccentColor }}
          >
            <EyeOutlined
              style={{
                marginRight: "15px",
                color: customStyle.secondaryAccentColor,
              }}
            />{" "}
            <FormatText text={displayData.reviews} />
            reviews
          </p>
        </div>
      </div>

      <div
        className="hidden w-full py-4 lg:flex flex-row items-center justify-center shadow-xl"
        style={{ backgroundColor: customStyle.primaryColorHeader }}
      >
        <div className="px-12">
          <img className="max-h-16" src={displayData.logo}></img>
        </div>
        <div className="">
          <div className="flex flex-row items-center">
            <Rate
              allowHalf
              disabled
              value={displayData.rating / 2}
              className="custom-star-css"
            />
            <p
              className="pt-5 ml-3"
              style={{
                color: customStyle.secondaryAccentColor,
                display: "inline",
              }}
            >
              <FormatText text={displayData.rating} />
              /10
            </p>
          </div>
          <p
            className="-mt-2 flex flex-row items-center"
            style={{ color: customStyle.secondaryAccentColor }}
          >
            <EyeOutlined
              style={{
                marginRight: "15px",
                color: customStyle.secondaryAccentColor,
              }}
            />{" "}
            <FormatText text={displayData.reviews} />
            reviews
          </p>
        </div>
        <div className="px-6">
          <img
            src={displayData.feedbackLogo}
            alt=""
            style={{ width: "115px" }}
          ></img>
        </div>
        {headerIcons.map((icon) => {
          return (
            <div className="px-8 flex flex-row items-center space-x-4">
              <img src={icon.image} className="h-8 w-8" />
              <div
                className="flex flex-col justify-center"
                style={{ color: customStyle.secondaryAccentColor }}
              >
                <div className="text-base">{icon.Title}</div>
                <div>{icon.description}</div>
              </div>
            </div>
          );
        })}
        <AdminSettings
          setCustomStyle={setCustomStyle}
          customStyle={customStyle}
          isUploadingStyle={isUploadingStyle}
          customContent={customContent}
          setCustomContent={setCustomContent}
          customForm={customForm}
          setCustomForm={setCustomForm}
          name={name}
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
