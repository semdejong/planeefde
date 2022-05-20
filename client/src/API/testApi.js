import axios from "axios";

export const ping = async () => {
  const response = await axios
    .get(`/ping`)
    .then((response) => {
      return response;
    })
    .catch((err) => {});

  return response.data;
};
