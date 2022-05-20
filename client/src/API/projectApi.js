import axios from "axios";

export const getProjects = async (page, limit, query) => {
  const obj = {
    query: query,
  };

  const response = await axios
    .post(`/project/getProjects?page=${page}&limit=${limit}`, obj ? obj : {})
    .catch((err) => {
      return err.response;
    });
  return response;
};

export const addProject = async (project) => {
  const response = await axios.post(`/project`, project).catch((err) => {
    return err.response;
  });
  return response;
};

export const getProject = async (project) => {
  const response = await axios
    .get(`/project/getProject/${project}`)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const updateProject = async (project) => {
  const response = await axios
    .patch(`/project/${project.id}`, project)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const deleteProject = async (projectID) => {
  const response = await axios.delete(`/project/${projectID}`).catch((err) => {
    return err.response;
  });

  return response;
};

export const getARandomProject = async () => {
  const response = await axios
    .get(`/project/randomRecommended`)
    .catch((err) => {
      return err.response;
    });

  return response;
};
