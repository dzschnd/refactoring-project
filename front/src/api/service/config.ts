import axios from "axios";

export const axiosAuthorized = axios.create({
  withCredentials: true,
});

export const baseURL = `${process.env.REACT_APP_SERVER_DOMAIN}`;
