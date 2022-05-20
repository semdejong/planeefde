import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getARandomProject } from "../API/projectApi";

export default function Hub() {
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(null);
  const localStorageProject = localStorage.getItem("localStorageProject");

  useEffect(() => {
    const getProject = async () => {
      setIsLoading(true);
      const project = await getARandomProject();
      setIsLoading(false);
      setProject(project.data.projectID);
    };

    getProject();
  }, []);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 100, color: "#D1D5DB" }} spin />
  );

  if (isLoading || project === null) {
    return (
      <div className="w-full h-full flex flex-row justify-center items-center">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (localStorageProject) {
    return <Redirect to={`/${localStorageProject}`} />;
  } else {
    console.log(project);
    return <Redirect to={`/${project}`} />;
  }
}
