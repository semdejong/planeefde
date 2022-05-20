import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { uploadStyle, getStyle } from "../../API/customPageApi";
import { getProject } from "../../API/projectApi";
import { useUserContext } from "../../Context/UserContext";

export default function useCustomStyle(id) {
  const { data, isLoading, error } = useQuery(["customStyle", id], () =>
    getStyle(id)
  );

  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useQuery(["projectData", id], () => {
    getProject(id);
  });

  const { role } = useUserContext();

  const customStyleObj = {
    primaryColorHeader: "" || "#fff",
    secondaryColorHeader: "" || "#1890ff",
    primaryColorCard: "" || "#fff",
    secondaryColorCard: "" || "#1890ff",
    // fontFamily: "" || "Roboto, sans-serif",
    accentColor: "" || "#000",
    secondaryAccentColor: "" || "#374151",
    headerCardColorMB: "" || "#6EC1E4",
    bodyTextColorMB: "" || "#fff",
  };

  const [customStyle, setCustomStyle] = useState(customStyleObj);
  const [isUploadingStyle, setIsUploadingStyle] = useState(false);
  const [projectDataState, setProjectData] = useState();

  useEffect(() => {
    async function writeStyleToServer() {
      if (role === "admin" && !isLoading && customStyle !== customStyleObj) {
        setIsUploadingStyle(true);
        const response = await uploadStyle(id, { customStyle: customStyle });
        setIsUploadingStyle(false);
      }
    }

    writeStyleToServer();
  }, [customStyle]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        setCustomStyle(data.data);
      }
    }
  }, [data]);

  useEffect(() => {
    if (projectData) {
      setProjectData(projectData);
    }
  }, [projectData]);

  return {
    customStyle,
    setCustomStyle,
    isUploadingStyle,
    isLoading,
    projectName: projectDataState?.data?.project.name || "",
  };
}
