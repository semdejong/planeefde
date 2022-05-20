import React, { useState } from "react";
import { Divider, Button, Spin } from "antd";

import ImageSetter from "../../ImageSetter";
import TextSetter from "../../TextSetter";

export default function HeaderAdminSettings({
  customContent,
  setCustomContent,
  isUploadingContent,
}) {
  const [logo, setLogo] = useState(customContent.logo);
  const [feedbackLogo, setFeedbackLogo] = useState(customContent.feedbackLogo);
  const [rating, setRating] = useState(customContent.rating);
  const [reviews, setReviews] = useState(customContent.reviews);
  const [firstFeatureImage, setFirstFeatureImage] = useState(
    customContent.firstFeatureImage
  );
  const [firstFeatureImageMB, setFirstFeatureImageMB] = useState(
    customContent.firstFeatureImageMB
  );
  const [secondFeatureImage, setSecondFeatureImage] = useState(
    customContent.secondFeatureImage
  );
  const [secondFeatureImageMB, setSecondFeatureImageMB] = useState(
    customContent.secondFeatureImageMB
  );
  const [thirdFeatureImage, setThirdFeatureImage] = useState(
    customContent.thirdFeatureImage
  );
  const [firstFeatureHeader, setFirstFeatureHeader] = useState(
    customContent.firstFeatureHeader
  );
  const [secondFeatureHeader, setSecondFeatureHeader] = useState(
    customContent.secondFeatureHeader
  );
  const [thirdFeatureHeader, setThirdFeatureHeader] = useState(
    customContent.thirdFeatureHeader
  );
  const [firstFeatureText, setFirstFeatureText] = useState(
    customContent.firstFeatureText
  );
  const [secondFeatureText, setSecondFeatureText] = useState(
    customContent.secondFeatureText
  );
  const [thirdFeatureText, setThirdFeatureText] = useState(
    customContent.thirdFeatureText
  );
  const handleOk = () => {
    setCustomContent({
      ...customContent,
      logo,
      feedbackLogo,
      rating,
      reviews,
      firstFeatureImage,
      secondFeatureImage,
      thirdFeatureImage,
      firstFeatureHeader,
      secondFeatureHeader,
      thirdFeatureHeader,
      firstFeatureText,
      secondFeatureText,
      thirdFeatureText,
      firstFeatureImageMB,
      secondFeatureImageMB,
    });
  };
  const handleCancel = () => {};

  return (
    <div className="h-full w-full flex flex-col">
      <Divider orientation="left" plain>
        <b className="text-lg">CONTENT</b>
      </Divider>
      <ImageSetter title="Logo" imageUrl={logo} setImageUrl={setLogo} />
      <ImageSetter
        title="Feedback Logo"
        imageUrl={feedbackLogo}
        setImageUrl={setFeedbackLogo}
      />
      <TextSetter
        title="Rating"
        currentText={rating}
        setCurrentText={setRating}
      />
      <TextSetter
        title="Reviews"
        currentText={reviews}
        setCurrentText={setReviews}
      />
      <ImageSetter
        title="First Feature Image"
        imageUrl={firstFeatureImage}
        setImageUrl={setFirstFeatureImage}
      />
      <TextSetter
        title="First Feature Header"
        currentText={firstFeatureHeader}
        setCurrentText={setFirstFeatureHeader}
      />
      <TextSetter
        title="First Feature Text"
        currentText={firstFeatureText}
        setCurrentText={setFirstFeatureText}
      />
      <ImageSetter
        title="Second Feature Image"
        imageUrl={secondFeatureImage}
        setImageUrl={setSecondFeatureImage}
      />
      <TextSetter
        title="Second Feature Header"
        currentText={secondFeatureHeader}
        setCurrentText={setSecondFeatureHeader}
      />
      <TextSetter
        title="Second Feature Text"
        currentText={secondFeatureText}
        setCurrentText={setSecondFeatureText}
      />
      <ImageSetter
        title="Third Feature Image"
        imageUrl={thirdFeatureImage}
        setImageUrl={setThirdFeatureImage}
      />
      <TextSetter
        title="Third Feature Header"
        currentText={thirdFeatureHeader}
        setCurrentText={setThirdFeatureHeader}
      />
      <TextSetter
        title="Third Feature Text"
        currentText={thirdFeatureText}
        setCurrentText={setThirdFeatureText}
      />
      <Divider orientation="left" plain>
        <b className="text-lg">MOBILE</b>
      </Divider>
      <ImageSetter
        title="First Feature Image (mobile)"
        imageUrl={firstFeatureImageMB}
        setImageUrl={setFirstFeatureImageMB}
      />
      <ImageSetter
        title="Second Feature Image (mobile)"
        imageUrl={secondFeatureImageMB}
        setImageUrl={setSecondFeatureImageMB}
      />

      <Divider />
      <div className="flex flex-row w-full items-center justify-end px-4 space-x-3">
        <Button onClick={handleCancel}>Cancel</Button>
        {!isUploadingContent ? (
          <Button type="primary" onClick={handleOk}>
            Toepassen
          </Button>
        ) : (
          <Button type="primary">
            <Spin /> Loading
          </Button>
        )}
      </div>
    </div>
  );
}
