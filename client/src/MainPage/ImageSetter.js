import React, { useState } from "react";
import { Upload } from "antd";
import axios from "axios";

import ImgCrop from "antd-img-crop";

export default function ImageSetter({
  title,
  imageUrl,
  setImageUrl,
  background,
  backgroundMB,
}) {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: imageUrl,
    },
  ]);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file.file);
    await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "/image",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        file.onSuccess(file.file);
        setImageUrl(process.env.REACT_APP_API_URL + response.data.file);
      })
      .catch((err) => {
        const error = new Error(err.response.data.message);
        file.onError({ event: error });
      });
    return true;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className="flex flex-row justify-between items-center px-4 py-2">
      <div>
        <b>{title}</b>
      </div>
      <div className="flex flex-row items-center justify-centers">
        <ImgCrop
          rotate
          quality={1}
          aspect={background ? 2.11 : backgroundMB ? 0.4 : 1}
          minZoom={background ? -5 : backgroundMB ? -2 : 1}
        >
          <Upload
            accept="image/*"
            customRequest={(options) => {
              uploadFile(options);
            }}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
}
