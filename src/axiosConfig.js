import axios from "axios";

const instance = axios.create({
   baseURL: process.env.REACT_APP_SERVER_URL,
});
// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      let token =
         window.localStorage.getItem("persist:auth") &&
         JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(1, -1);
      config.headers = {
         authorization: token ? `Bearer ${token}` : null,
      };
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
instance.interceptors.response.use(
   function (response) {
      return response;
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default instance;
