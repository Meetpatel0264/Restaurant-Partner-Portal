import axios from "axios";

const api = axios.create({
  baseURL:
    "https://zomato-clone-api-5e4m.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "persist:root"
        )
      )?.auth;

    const parsedUser =
      user
        ? JSON.parse(user)
        : null;

    const token =
      parsedUser?.user?.token;

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  (error) => {

    const message =
      error.response?.data
        ?.message ||
      "Something went wrong";

    if (
      error.response?.status ===
      401
    ) {

      localStorage.removeItem(
        "persist:root"
      );

      window.location.href = "/";
    }

    return Promise.reject(
      new Error(message)
    );
  }
);

export default api;