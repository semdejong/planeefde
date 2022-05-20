import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { useUserContext } from "../../Context/UserContext";
import { uploadContent, getContent } from "../../API/customPageApi";

export default function useCustomContent(id) {
  const { data, isLoading, error } = useQuery(["customContent", id], () =>
    getContent(id)
  );

  const customContentObj = {
    logo: "https://www.myfinance.nl/wp-content/uploads/2018/09/logo-placeholder.png",
    rating: "9",
    reviews: "758",
    feedbackLogo:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/feedbackcompany-logo.svg",
    firstFeatureImage:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/icon-euro.svg",
    firstFeatureImageMB:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/icon-euro2.svg",
    firstFeatureHeader: "Bespaar maandelijks",
    firstFeatureText: "op je energie",
    secondFeatureImage:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/icon-people.svg",
    secondFeatureImageMB:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/people-icon.svg",
    secondFeatureHeader: "Volledig onafhankelijk",
    secondFeatureText: "Alles draait om jou",
    thirdFeatureImage:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/icon-weighing.svg",
    thirdFeatureHeader: "Milluebewust wonen",
    thirdFeatureText: "je woning verduurzamen",
    cardTitle: "Doe nu de gratis woningscan!",
    cardText:
      "Slechts een beperkte groep komt in aanmerking voor de gratis en vrijblijvende verduurzamingscheck, geheel op maat!",
    backgroundURl:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/banner1.jpg",
    backgroundURlMB:
      "https://verduurzamen.vollediggroen.nl/wp-content/uploads/2020/12/banner1-mb.jpg",
    cardHeaderTextMB: "Gratis check t.w.v. €299,-",
    bodyTextBottomMB: "Bespaar tot wel €3.030 per jaar!",
  };

  const { role } = useUserContext();

  const [isUploadingStyle, setIsUploadingStyle] = useState(false);
  const [customContent, setCustomContent] = useState(customContentObj);

  useEffect(() => {
    async function writeStyleToServer() {
      if (
        role === "admin" &&
        !isLoading &&
        customContent !== customContentObj
      ) {
        setIsUploadingStyle(true);
        const response = await uploadContent(id, {
          customContent: customContent,
        });
        setIsUploadingStyle(false);
      }
    }

    writeStyleToServer();
  }, [customContent]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        setCustomContent(data.data);
      }
    }
  }, [data]);
  return {
    customContent,
    setCustomContent,
    contentIsLoading: isLoading,
  };
}
