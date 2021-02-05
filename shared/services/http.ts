import Axios, { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

export const http = () => {
  const config: AxiosRequestConfig = {};
  config.headers = {
    Authorization: "Bearer " + parseCookies().auth_token,
  };

  const instance = Axios.create(config);

  return instance;
};
