import axios from "axios";

function useAxios() {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:3001",
  });
  return axiosPublic;
}

export default useAxios;
