import Card from "./Card";

export default function Body({
  customStyle,
  customContent,
  customForm,
  leadInfo,
}) {
  return (
    <>
      <div
        className="lg:hidden 2xl:h-full w-full flex flex-col lg:flex-row lg:items-center lg:justify-center"
        style={{
          backgroundImage: "url(" + customContent.backgroundURlMB + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:hidden flex flex-row h-16 w-full shadow-2xl border-b-1 border-t-1 border-gray-600 items-center justify-between p-4">
          <div className="flex flex-row items-center">
            <img src={customContent.firstFeatureImageMB} className="h-6 w-6" />
            <span
              className="text-xs ml-2"
              style={{ color: customContent.bodyTextColorMB }}
            >
              {customContent.firstFeatureHeader}
            </span>
          </div>
          <div className="flex flex-row items-center mr-4">
            <img src={customContent.secondFeatureImageMB} className="h-6 w-6" />
            <span
              className="text-xs ml-2"
              style={{ color: customContent.bodyTextColorMB }}
            >
              {customContent.secondFeatureHeader}
            </span>
          </div>
        </div>

        <Card
          customStyle={customStyle}
          customContent={customContent}
          customForm={customForm}
          leadInfo={leadInfo}
        />
      </div>

      <div
        className="hidden w-full p-12 lg:flex lg:flex-row lg:items-center lg:justify-center"
        style={{
          backgroundImage: "url(" + customContent.backgroundURl + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card
          customStyle={customStyle}
          customContent={customContent}
          customForm={customForm}
          leadInfo={leadInfo}
        />
      </div>
    </>
  );
}
