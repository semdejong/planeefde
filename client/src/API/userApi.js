import axios from "axios";

export const getMe = async () => {
  const response = await axios.get(`/user/0`).catch((err) => {
    return err.response;
  });

  return response;
};

export const getUsers = async (page, limit) => {
  const response = await axios
    .get(`/user?page=${page}&limit=${limit}`)
    .catch((err) => {
      return err.response;
    });
  return response;
};

export const updateUser = async (user) => {
  const response = await axios.patch(`/user/${user.id}`, user).catch((err) => {
    return err.response;
  });

  return response;
};

export const getSetup = async (setupToken) => {
  const response = await axios.get(`/setup/${setupToken}`).catch((err) => {
    return err.response;
  });

  return response;
};

export const setPassword = async (setupToken, password) => {
  const response = await axios
    .post(`/setup/${setupToken}`, { password })
    .catch((err) => {
      return err.response;
    });

  return response;
};
