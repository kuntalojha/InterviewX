import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  //by adding this field browser will send cookies to backend everytime we make a request
  withCredentials: true,
});

export default axiosIntance;
