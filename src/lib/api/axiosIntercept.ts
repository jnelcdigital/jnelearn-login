import axios from "axios";
import Cookies from "js-cookie";


export const jneAxios = (serverToken?: string) => {
  const clientToken = Cookies.get("jne-cookie");
  const headers = {
    Authorization: `Bearer ${serverToken ? serverToken : clientToken}`,
  };
  const axiosInterceptor = axios.create({ headers });
  axiosInterceptor.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

  return axiosInterceptor;
};
