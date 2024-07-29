import axios from "axios";

export const jneAxios = (serverToken?: string) => {
  // const clientToken = Cookies.get("kue-ayolinx");
  // const headers = {
  //   Authorization: `Bearer ${serverToken ? serverToken : clientToken}`,
  // };
  const headers = {
    Authorization: `Bearer ${serverToken}`,
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
