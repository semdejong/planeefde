import axios from "axios";

export const uploadStyle = async (id, style) => {
  const response = await axios
    .patch(`/project/style/${id}`, style)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getStyle = async (id) => {
  const response = await axios.get(`/project/style/${id}`).catch((err) => {
    return err.response;
  });

  return response;
};

export const uploadContent = async (id, content) => {
  const response = await axios
    .patch(`/project/content/${id}`, content)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getContent = async (id) => {
  const response = await axios.get(`/project/content/${id}`).catch((err) => {
    return err.response;
  });

  return response;
};

export const uploadForm = async (id, form) => {
  const response = await axios
    .patch(`/project/form/${id}`, form)
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getForm = async (id) => {
  const response = await axios.get(`/project/form/${id}`).catch((err) => {
    return err.response;
  });

  return response;
};
