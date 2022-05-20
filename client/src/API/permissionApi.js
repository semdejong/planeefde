import axios from "axios";

export const getAllPermissions = () => {
  const response = await axios
    .get(`/permissions`)
    .catch((error) => {
      return error.response;
    });

  return response;
};

export const getAllRoles = () => {
  const response = await axios
    .get(`/role`)
    .catch((error) => {
      return error.response;
    });
  return response;
};
