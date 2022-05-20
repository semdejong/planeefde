import axios from "axios";

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
  };

  const response = await axios.post(`/auth/login`, data).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    document.cookie = "isAuth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    let date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = "isAuth=true; " + expires + "; path=/";
  }

  return response;
};

export const addUser = async (username, fullname, email) => {
  const data = {
    username: username,
    fullname: fullname,
    email: email,
  };

  const response = await axios.post(`/auth/register`, data).catch((err) => {
    return err.response;
  });

  return response;
};

export const register = async (username, fullname, email, password) => {
  const data = {
    username: username,
    fullname: fullname,
    email: email,
    password: password,
  };

  const response = await axios.post(`/auth/register`, data).catch((err) => {
    return err.response;
  });

  return response;
};

export const logout = async (redirect) => {
  const response = await axios.get(`/auth/logout`).catch((err) => {
    return err.response;
  });

  if (response.status === 200) {
    console.log("I am gonna eat your cookie");
    delete_cookie("isAuth", "/");
  }

  return response;
};

function delete_cookie(name, path, domain) {
  if (get_cookie(name)) {
    document.cookie =
      name +
      "=" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

function get_cookie(name) {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith(name + "=");
  });
}
