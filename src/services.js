import axios from "axios";

const API_BASE_URL = "http://localhost:5050";

export const registerUser = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/register`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const loginUser = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/login`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
      return error?.response?.data;
    });
};

export const forgotPassword = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/forgot-password`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
      return error?.response?.data;
    });
};

export const resetPassword = async (payload) => {
  const { id, token, newPassword } = payload;
  return axios
    .post(`${API_BASE_URL}/reset-password/${id}/${atob(token)}`, {
      newPassword,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const logoutUser = async (token) => {
  return axios
    .get(`${API_BASE_URL}/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const updateUser = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/update-user`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const parseFileContent = async (formData) => {
  return axios
    .post(`${API_BASE_URL}/parse-pdf`, formData)
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const saveDocument = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/save-document`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};

export const deleteDocument = async (payload) => {
  return axios
    .post(`${API_BASE_URL}/delete-document`, {
      ...payload,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error::::", error);
    });
};
