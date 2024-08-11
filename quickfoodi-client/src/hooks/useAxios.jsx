import axios from "axios";

function useAxios() {
  const axiosPublic = axios.create({
    baseURL: "https://quickfoodiapp.onrender.com",
  });
  return axiosPublic;
}

export default useAxios;
