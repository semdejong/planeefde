import axios from "axios";

export const createLead = async (id) => {
  const response = await axios.post(`/lead`, { project: id }).catch((err) => {
    return err.response;
  });

  return response;
};

export const getLeadProgress = async (id) => {
  const response = await axios.get(`/lead/progress/${id}`).catch((err) => {
    return err.response;
  });

  return response;
};

export const updateLead = async (id, data, pageCompleted) => {
  const obj = {
    pageCompleted: pageCompleted,
    data: data,
  };

  const response = await axios.post(`/lead/update/${id}`, obj).catch((err) => {
    return err.response;
  });

  return response;
};

export const getLeads = async (page, limit, query) => {
  const obj = {
    query: query,
  };

  const response = await axios
    .post(`/lead/getlead?page=${page}&limit=${limit}`, obj ? obj : {})
    .catch((err) => {
      return err.response;
    });

  return response;
};
